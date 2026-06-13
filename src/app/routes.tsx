import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";

// 라우트 단위 코드 스플리팅
// - Home은 첫 페이지라 번들에 포함
// - 나머지는 lazy load
// - Contact는 진입 시점에만 Supabase 클라이언트 초기화
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
const About    = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const Contact  = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));
const Terms    = lazy(() => import("./components/Terms").then((m) => ({ default: m.Terms })));
const Privacy  = lazy(() => import("./components/Privacy").then((m) => ({ default: m.Privacy })));
const NotFound = lazy(() => import("./components/NotFound").then((m) => ({ default: m.NotFound })));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff00] animate-pulse" />
    </div>
  );
}

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "services", element: <Lazy><Services /></Lazy> },
      { path: "about",    element: <Lazy><About /></Lazy> },
      { path: "contact",  element: <Lazy><Contact /></Lazy> },
      { path: "terms",    element: <Lazy><Terms /></Lazy> },
      { path: "privacy",  element: <Lazy><Privacy /></Lazy> },
      { path: "*",        element: <Lazy><NotFound /></Lazy> },
    ],
  },
]);
