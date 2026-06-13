import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// env 미설정 시에도 빌드는 되도록 lazy 처리
// 실제 호출 시점에 throw — 개발 단계에서 명확히 인지 가능
export const supabase = url && anonKey
  ? createClient(url, anonKey)
  : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase 클라이언트가 초기화되지 않았습니다. .env에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 설정해주세요."
    );
  }
  return supabase;
}
