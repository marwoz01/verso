export const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_MEDIA).matches;
}
