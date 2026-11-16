import { expect, test } from '@playwright/test';
function luminance(hex: string) {
  const c = hex.match(/[a-f\d]{2}/gi)!.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
}
for (const [direction, primary, ice, surfaces] of [
  ['a', '#285b65', '#b8dfe5', ['#f8fafc', '#edf2f6', '#eef3f6', '#ffffff']],
  ['b', '#4c4e85', '#c8cef3', ['#fafbff', '#f0f2fa', '#eef0f9', '#d3d9f0', '#dce2f6', '#ffffff']],
  ['c', '#34465a', '#ced8e2', ['#ffffff', '#f1f4f6']],
] as const) {
  test(`direction ${direction} AA palette contrast`, () => {
    const pairs = [['#ffffff', primary], [ice, '#10151f'], ['#b8c4d4', '#10151f'], ...surfaces.map(s => [primary, s])];
    if (direction === 'b') pairs.push(['#595b8d', '#dce2f6']); // lightest text stop on darkest hero glow
    for (const [foreground, background] of pairs) {
      const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
      expect((values[0] + .05) / (values[1] + .05), `${foreground} on ${background}`).toBeGreaterThanOrEqual(4.5);
    }
  });
}
