"use client";

import { Component, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fallback statique si WebGL indisponible : un dégradé graphite/encre premium (DA froide),
 * pas le néon d'origine. Sert aussi de secours en cas d'erreur de rendu.
 */
export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background: "radial-gradient(120% 120% at 30% 20%, #22262b 0%, #0b0b0d 62%)" }}
    />
  );
}

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}
interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
