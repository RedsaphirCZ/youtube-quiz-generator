export const concealments = ['none', 'horizontal', 'vertical', 'diagonal', 'strips', 'windows'];

// Normalised visible areas, so the same concealment works at every screen size.
export function visibleAreas(style, seed = 0) {
  const side = Math.abs(seed) % 2;
  if (style === 'horizontal') return [{ x: 0, y: side / 2, w: 1, h: .5 }];
  if (style === 'vertical') return [{ x: side / 2, y: 0, w: .5, h: 1 }];
  if (style === 'diagonal') return [{ points: side ? [[0, 0], [1, 0], [1, 1]] : [[0, 0], [0, 1], [1, 1]] }];
  if (style === 'strips') return [0, 1, 2, 3].map(i => ({ x: 0, y: (i * 2 + side) / 8, w: 1, h: 1 / 8 }));
  if (style === 'windows') return Array.from({ length: 16 }, (_, i) => ({ x: (i % 4) / 4, y: Math.floor(i / 4) / 4, w: .25, h: .25 }))
    .filter((_, i) => ((i % 4) + Math.floor(i / 4)) % 2 === side);
  return [{ x: 0, y: 0, w: 1, h: 1 }];
}

export function pickConcealment(style, seed) {
  return style === 'random' ? concealments[1 + Math.abs(seed) % (concealments.length - 1)] : style;
}
