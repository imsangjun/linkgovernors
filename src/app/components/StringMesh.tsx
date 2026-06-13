import { useEffect, useRef } from "react";

/**
 * StringMesh — Verlet 적분 기반 천 시뮬레이션 애니메이션
 *
 * 원본: Liam Egan (https://codepen.io/shubniggurath/pen/ZYpjorm)
 * 라이선스: MIT (Copyright (c) 2026 Liam Egan)
 *
 * LinkPresso 적응:
 * - 외부 CodePen 의존성을 내부 헬퍼로 인라인
 * - 다크 톤(검정 배경, 흰 문자, #00ff00 액센트)으로 색상 조정
 * - 문자 풀을 SEO 도메인 어휘로 교체
 * - 모바일 그리드 해상도 자동 다운스케일
 * - prefers-reduced-motion 시 정적 fallback
 * - React 라이프사이클에 맞춰 리스너/RAF 정리
 */

// SEO 도메인 어휘 — 캔버스에 흩뿌려질 문자 풀
const CHAR_POOL =
  "SEO LINK DOMAIN RANK CRAWL INDEX AUTHORITY BACKLINK QUERY SERP " +
  "CANONICAL SCHEMA SITEMAP ROBOTS META TITLE ANCHOR REFERRAL " +
  "TOPIC CLUSTER E-E-A-T PAGERANK GOOGLE BING SEARCH ORGANIC " +
  "KEYWORD INTENT VOLUME COMPETITION RELEVANCE TRUST SIGNAL";

export function StringMesh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 접근성: 모션 줄이기 선호 시 애니메이션 스킵
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      renderStaticFallback(container);
      return;
    }

    const cleanup = runSimulation(container);
    return cleanup;
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden border-b border-[#262626] bg-[#0a0a0a]"
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[420px] md:h-[560px]"
        style={{ touchAction: "none" }}
      />
      {/* 상단/하단 페이드 — 캔버스가 섹션 경계에서 자연스럽게 녹아들도록 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* 캡션 — 무엇을 보고 있는지 살짝 알려줌 */}
      <div className="pointer-events-none absolute left-5 md:left-8 bottom-6 md:bottom-8 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00]" />
        <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.12em] text-[#8e8e8e]">
          링크 그래프 시뮬레이션 — 마우스로 끌어보세요
        </span>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────
   정적 fallback (reduced motion 사용자용)
─────────────────────────────────────────────────── */
function renderStaticFallback(container: HTMLElement) {
  const canvas = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 1;
  const w = container.clientWidth;
  const h = container.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  // 단순 그리드 점만 표시 (애니메이션 없음)
  const cols = Math.floor(w / 32);
  const rows = Math.floor(h / 32);
  const cellW = w / cols;
  const cellH = h / rows;
  ctx.fillStyle = "#3a3a3a";
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.arc(i * cellW, j * cellH, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/* ───────────────────────────────────────────────────
   인라인 헬퍼 — 원본의 외부 의존성 대체
─────────────────────────────────────────────────── */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function getPointID(row: number, col: number, gridH: number): number {
  return col * gridH + row;
}

/* ───────────────────────────────────────────────────
   Vec2 — 간단한 2D 벡터 (원본 클래스의 필요 부분만)
─────────────────────────────────────────────────── */
class Vec2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  reset(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  zero() {
    this.x = 0;
    this.y = 0;
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  subtractNew(v: Vec2) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  add(v: Vec2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  get lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  get length() {
    return Math.hypot(this.x, this.y);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
}

/* ───────────────────────────────────────────────────
   Particle (질량점) — Verlet 적분
─────────────────────────────────────────────────── */
interface ParticleOpts {
  x: number;
  y: number;
  pinned: boolean;
  id: number;
  char: string;
}

class Particle {
  pos: Vec2;
  oldPos: Vec2;
  velocity: Vec2;
  acceleration: Vec2;
  gravityVec: Vec2;
  pinned: boolean;
  id: number;
  char: string;
  originalPinnedState = false;
  downConstraint: Constraint | null = null;

  constructor({ x, y, pinned, id, char }: ParticleOpts) {
    this.pos = new Vec2(x, y);
    this.oldPos = new Vec2(x, y);
    this.velocity = new Vec2();
    this.acceleration = new Vec2();
    this.gravityVec = new Vec2();
    this.pinned = pinned;
    this.id = id;
    this.char = char;
  }

  update(delta: number, gravity: number, damping: number) {
    if (this.pinned) {
      this.acceleration.zero();
      return;
    }
    this.velocity.reset(
      (this.pos.x - this.oldPos.x) * damping,
      (this.pos.y - this.oldPos.y) * damping
    );
    this.oldPos.reset(this.pos.x, this.pos.y);

    const dd = delta * delta;
    if (dd > 0) {
      this.gravityVec.reset(0, gravity / dd);
      this.acceleration.add(this.gravityVec);
    }

    this.pos.x += this.velocity.x + this.acceleration.x * dd;
    this.pos.y += this.velocity.y + this.acceleration.y * dd;
    this.acceleration.zero();
  }

  applyForce(v: Vec2) {
    this.acceleration.add(v);
  }
}

/* ───────────────────────────────────────────────────
   Constraint (제약) — 스프링처럼 두 점의 거리를 제한
─────────────────────────────────────────────────── */
interface ConstraintOpts {
  p1: Particle;
  p2: Particle;
  length: number;
  compressFactor: number;
  stretchFactor: number;
  isSpacer?: boolean;
}

class Constraint {
  p1: Particle;
  p2: Particle;
  length: number;
  minLength: number;
  maxLength: number;

  constructor({ p1, p2, length, compressFactor, stretchFactor }: ConstraintOpts) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = length;
    this.minLength = length * compressFactor;
    this.maxLength = length * stretchFactor;
  }

  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const distance = Math.hypot(dx, dy);
    if (distance === 0) return;

    let targetLength = this.length;
    if (distance < this.minLength) targetLength = this.minLength;
    else if (distance > this.maxLength) targetLength = this.maxLength;
    else return;

    const difference = targetLength - distance;
    const percent = difference / distance / 2;
    const offsetX = dx * percent;
    const offsetY = dy * percent;

    if (!this.p1.pinned) {
      this.p1.pos.x -= offsetX;
      this.p1.pos.y -= offsetY;
    }
    if (!this.p2.pinned) {
      this.p2.pos.x += offsetX;
      this.p2.pos.y += offsetY;
    }
  }
}

/* ───────────────────────────────────────────────────
   시뮬레이션 메인 루프
─────────────────────────────────────────────────── */
function runSimulation(container: HTMLElement): () => void {
  const canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2); // dpr 2로 캡 (성능)

  // 그리드 해상도 — 화면 크기에 따라 자동 조정 (모바일에서 부담 줄임)
  const isMobile = window.innerWidth < 768;
  const gridW = isMobile ? 20 : 32;
  const gridH = isMobile ? 18 : 24;

  const gravity = 0.18;
  const damping = 0.99;
  const iterationsPerFrame = isMobile ? 3 : 5;
  const compressFactor = 0.02;
  const stretchFactor = 1.1;
  const mouseSize = 5000;
  const mouseStrength = 4;

  let cw = container.clientWidth;
  let ch = container.clientHeight;
  let awidth = Math.min(cw - 40, isMobile ? cw - 20 : 720);
  let aheight = ch - 40;
  let cellWidth = awidth / (gridW - 1);
  let cellHeight = aheight / (gridH - 1);

  function setupCanvas() {
    cw = container.clientWidth;
    ch = container.clientHeight;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    ctx!.setTransform(1, 0, 0, 1, 0, 0);
    ctx!.scale(dpr, dpr);

    awidth = Math.min(cw - 40, isMobile ? cw - 20 : 720);
    aheight = ch - 40;
    cellWidth = awidth / (gridW - 1);
    cellHeight = aheight / (gridH - 1);
  }
  setupCanvas();

  // 문자 캔버스 캐싱 — 매 프레임 텍스트 렌더링하면 느려서 미리 비트맵으로
  const fontSize = Math.max(10, cellHeight * 0.85);
  const charCanvases: Record<string, HTMLCanvasElement> = {};
  const uniqueChars = new Set(CHAR_POOL.replace(/\s/g, ""));
  for (const ch of uniqueChars) {
    const off = document.createElement("canvas");
    const size = Math.ceil(fontSize * 1.4);
    off.width = size * dpr;
    off.height = size * dpr;
    const octx = off.getContext("2d")!;
    octx.scale(dpr, dpr);
    octx.font = `500 ${fontSize}px ui-monospace, "SF Mono", "JetBrains Mono", monospace`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "#c8c8c8"; // 본문 회색 톤
    octx.fillText(ch, size / 2, size / 2);
    charCanvases[ch] = off;
    // 일부 문자는 액센트 색상 변형도 만들어둠 (희소하게 사용)
  }

  // 액센트 색 문자 (전체 점 중 ~2%만 #00ff00) — 시각적 액센트
  const accentChars: Record<string, HTMLCanvasElement> = {};
  for (const ch of uniqueChars) {
    const off = document.createElement("canvas");
    const size = Math.ceil(fontSize * 1.4);
    off.width = size * dpr;
    off.height = size * dpr;
    const octx = off.getContext("2d")!;
    octx.scale(dpr, dpr);
    octx.font = `600 ${fontSize}px ui-monospace, "SF Mono", "JetBrains Mono", monospace`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "#00ff00";
    octx.fillText(ch, size / 2, size / 2);
    accentChars[ch] = off;
  }

  // 파티클·제약 구축
  const particles: Particle[] = [];
  const constraints: Constraint[] = [];
  const charsNoSpace = CHAR_POOL.replace(/\s/g, "");

  for (let i = 0; i < gridW; i++) {
    for (let j = 0; j < gridH; j++) {
      const x = i * cellWidth;
      const y = j * cellHeight;
      const id = getPointID(j, i, gridH);
      const pinned = j === 0; // 최상단 줄은 고정 (천이 매달려 있는 느낌)
      const charIndex = (i + j * gridW) % charsNoSpace.length;
      const char = charsNoSpace[charIndex];
      particles.push(new Particle({ x, y, pinned, id, char }));
    }
  }

  for (let i = 0; i < gridW; i++) {
    for (let j = 0; j < gridH; j++) {
      const id = getPointID(j, i, gridH);
      const p = particles[id];
      if (j < gridH - 1) {
        const bottomP = particles[getPointID(j + 1, i, gridH)];
        const c = new Constraint({
          p1: p,
          p2: bottomP,
          length: cellHeight,
          compressFactor,
          stretchFactor,
        });
        constraints.push(c);
        p.downConstraint = c;
      }
      if (i < gridW - 1) {
        const rightP = particles[getPointID(j, i + 1, gridH)];
        const hc = new Constraint({
          p1: p,
          p2: rightP,
          length: cellWidth,
          compressFactor: 0.6,
          stretchFactor: 4,
          isSpacer: true,
        });
        constraints.push(hc);
      }
    }
  }

  // 액센트 ID 셋 (전체의 ~2%만)
  const accentIds = new Set<number>();
  const accentCount = Math.floor(particles.length * 0.02);
  for (let i = 0; i < accentCount; i++) {
    accentIds.add(Math.floor(Math.random() * particles.length));
  }

  // 마우스 입력
  const mousePos = new Vec2(-9999, -9999);
  let grabbedParticle: Particle | null = null;
  const grabRadius = 20;

  function onPointerDown(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left - cw / 2 + awidth / 2;
    mousePos.y = e.clientY - rect.top - ch / 2 + aheight / 2;
    for (const p of particles) {
      if (mousePos.subtractNew(p.pos).length < grabRadius) {
        grabbedParticle = p;
        grabbedParticle.originalPinnedState = grabbedParticle.pinned;
        grabbedParticle.pinned = true;
        break;
      }
    }
  }
  function onPointerUp() {
    if (grabbedParticle) {
      grabbedParticle.pinned = grabbedParticle.originalPinnedState;
      grabbedParticle = null;
    }
  }
  function onPointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    // 포인터가 캔버스 밖에 있으면 무시 (전역 listener는 페이지 전체에서 발생)
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      mousePos.x = -9999;
      mousePos.y = -9999;
      return;
    }
    mousePos.x = e.clientX - rect.left - cw / 2 + awidth / 2;
    mousePos.y = e.clientY - rect.top - ch / 2 + aheight / 2;

    if (grabbedParticle) {
      grabbedParticle.pos.reset(mousePos.x, mousePos.y);
      grabbedParticle.oldPos.reset(mousePos.x, mousePos.y);
    }
    for (const p of particles) {
      const diff = mousePos.subtractNew(p.pos);
      const ls = diff.lengthSquared;
      if (ls < mouseSize) {
        const a = diff.angle - Math.PI;
        const strength = (smoothstep(mouseSize, -2000, ls) * mouseStrength) / 300;
        p.applyForce(new Vec2(Math.cos(a) * strength, Math.sin(a) * strength));
      }
    }
  }

  // 리스너는 캔버스에만 — 전역 document 오염 방지
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointermove", onPointerMove);

  // resize 처리
  let resizeTimer: number | undefined;
  function onResize() {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      setupCanvas();
    }, 150);
  }
  window.addEventListener("resize", onResize);

  // 루프
  let rafID = 0;
  let lastDelta = 0;

  function drawFrame() {
    ctx!.clearRect(0, 0, cw, ch);

    // 캔버스 좌표 오프셋 — 그리드를 가로 중앙, 세로 살짝 위로
    const offsetX = cw / 2 - awidth / 2;
    const offsetY = ch / 2 - aheight / 2 - 20;

    particles.forEach((p) => {
      if (!p.char) return;
      const isAccent = accentIds.has(p.id);
      const img = isAccent ? accentChars[p.char] : charCanvases[p.char];
      if (!img) return;

      // 각 문자는 자기 아래 제약의 각도로 회전 — 천이 출렁이는 느낌의 핵심
      let cos = 1;
      let sin = 0;
      if (p.downConstraint) {
        const dx = p.downConstraint.p2.pos.x - p.downConstraint.p1.pos.x;
        const dy = p.downConstraint.p2.pos.y - p.downConstraint.p1.pos.y;
        const angle = Math.atan2(dy, dx) - Math.PI / 2;
        cos = Math.cos(angle);
        sin = Math.sin(angle);
      }

      const drawSize = img.width / dpr;
      const half = drawSize / 2;
      ctx!.setTransform(
        cos * dpr,
        sin * dpr,
        -sin * dpr,
        cos * dpr,
        (p.pos.x + offsetX) * dpr,
        (p.pos.y + offsetY) * dpr
      );
      ctx!.drawImage(img, -half * dpr, -half * dpr, drawSize * dpr, drawSize * dpr);
    });
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function loop(delta: number) {
    rafID = requestAnimationFrame(loop);
    const d = delta - lastDelta;
    lastDelta = delta;

    particles.forEach((p) => p.update(d, gravity, damping));
    for (let i = 0; i < iterationsPerFrame; i++) {
      for (let j = 0; j < constraints.length; j++) constraints[j].solve();
    }
    drawFrame();
  }
  rafID = requestAnimationFrame(loop);

  // cleanup — React unmount 시 호출
  return () => {
    cancelAnimationFrame(rafID);
    canvas.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);
    if (resizeTimer) window.clearTimeout(resizeTimer);
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}
