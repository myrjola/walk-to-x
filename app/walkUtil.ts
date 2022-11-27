export function metersToScreenPx(meters: number): number {
  return meters / 100;
}

export function metersToPx(meters: number): string {
  return metersToScreenPx(meters) + "px";
}
