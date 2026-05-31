export function trackAndOpen(url: string, itemName: string): void {
  console.info(`[coupang_click] ${itemName}`);
  window.open(url, '_blank', 'noopener,noreferrer');
}
