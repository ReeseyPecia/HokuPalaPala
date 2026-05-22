/**
 * Hōkū Palapala — constellation stick figures for the sky dome (500×500 viewport).
 * Drawn when Show Layer = "Constellation Lines".
 */
const CONSTELLATION_STARS = {
  gemini: {
    label: 'Gemini',
    color: '#ffd890',
    months: [10, 11, 0, 1, 2, 3],
    points: [
      { x: 148, y: 162 },
      { x: 155, y: 175 }
    ],
    lines: [[0, 1]]
  },
  canis_major: {
    label: 'Canis Major',
    color: '#aad4ff',
    months: [11, 0, 1, 2, 3],
    points: [{ x: 130, y: 300 }],
    lines: []
  },
  canis_minor: {
    label: 'Canis Minor',
    color: '#ffe8a0',
    months: [11, 0, 1, 2, 3],
    points: [{ x: 170, y: 255 }],
    lines: []
  },
  orion: {
    label: 'Orion',
    color: '#c8d8f8',
    months: [11, 0, 1, 2, 3, 4],
    points: [
      { x: 200, y: 280 },
      { x: 215, y: 295 },
      { x: 230, y: 310 },
      { x: 245, y: 295 },
      { x: 260, y: 280 },
      { x: 230, y: 325 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]]
  },
  taurus: {
    label: 'Taurus',
    color: '#b0c8f8',
    months: [10, 11, 0, 1],
    points: [
      { x: 185, y: 215 },
      { x: 200, y: 200 },
      { x: 175, y: 195 }
    ],
    lines: [[0, 1], [0, 2], [1, 2]]
  },
  auriga: {
    label: 'Auriga',
    color: '#fff0a0',
    months: [10, 11, 0, 1, 2],
    points: [
      { x: 210, y: 128 },
      { x: 195, y: 115 },
      { x: 225, y: 118 },
      { x: 218, y: 140 }
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3]]
  },
  bootes: {
    label: 'Boötes',
    color: '#f4a050',
    months: [3, 4, 5, 6, 7, 8, 9],
    points: [
      { x: 250, y: 155 },
      { x: 235, y: 140 },
      { x: 265, y: 138 },
      { x: 248, y: 175 }
    ],
    lines: [[0, 1], [0, 2], [0, 3]]
  },
  ursa_major: {
    label: 'Ursa Major',
    color: '#c0d8f8',
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    points: [
      { x: 175, y: 90 },
      { x: 158, y: 102 },
      { x: 142, y: 118 },
      { x: 148, y: 138 },
      { x: 168, y: 128 },
      { x: 188, y: 108 },
      { x: 198, y: 92 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  ursa_minor: {
    label: 'Ursa Minor',
    color: '#c8e0ff',
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    points: [
      { x: 250, y: 48 },
      { x: 238, y: 58 },
      { x: 262, y: 62 },
      { x: 255, y: 72 }
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3]]
  },
  summer_triangle: {
    label: 'Summer Triangle',
    color: '#d0eeff',
    months: [4, 5, 6, 7, 8, 9, 10],
    points: [
      { x: 340, y: 120 },
      { x: 370, y: 200 },
      { x: 320, y: 95 }
    ],
    lines: [[0, 1], [1, 2], [2, 0]]
  },
  scorpius: {
    label: 'Scorpius',
    color: '#f06868',
    months: [4, 5, 6, 7, 8],
    points: [
      { x: 355, y: 355 },
      { x: 340, y: 365 },
      { x: 360, y: 380 },
      { x: 350, y: 395 },
      { x: 330, y: 385 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  virgo: {
    label: 'Virgo',
    color: '#b8d8ff',
    months: [2, 3, 4, 5, 6],
    points: [
      { x: 295, y: 295 },
      { x: 280, y: 310 },
      { x: 305, y: 318 }
    ],
    lines: [[0, 1], [1, 2]]
  },
  corvus: {
    label: 'Corvus',
    color: '#c8b8e8',
    months: [2, 3, 4, 5],
    points: [
      { x: 270, y: 340 },
      { x: 258, y: 352 },
      { x: 282, y: 355 },
      { x: 275, y: 328 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]]
  },
  crux: {
    label: 'Southern Cross',
    color: '#c0f0e0',
    months: [2, 3, 4, 5, 6],
    points: [
      { x: 295, y: 405 },
      { x: 300, y: 418 },
      { x: 305, y: 425 }
    ],
    lines: [[0, 1], [1, 2]]
  },
  centaurus: {
    label: 'Centaurus',
    color: '#ffe8b0',
    months: [2, 3, 4, 5, 6],
    points: [
      { x: 315, y: 440 },
      { x: 300, y: 418 }
    ],
    lines: [[0, 1]]
  },
  pleiades: {
    label: 'Pleiades',
    color: '#b0c8f8',
    months: [9, 10, 11, 0, 1],
    points: [{ x: 185, y: 215 }],
    lines: []
  },
  piscis_austrinus: {
    label: 'Piscis Austrinus',
    color: '#a8d0ff',
    months: [7, 8, 9, 10],
    points: [{ x: 330, y: 410 }],
    lines: []
  },
  carina: {
    label: 'Carina',
    color: '#ffe0a8',
    months: [0, 1, 2, 3, 4, 5, 6],
    points: [{ x: 270, y: 450 }],
    lines: []
  }
};

function constellationStroke(color, alpha) {
  if (!color || color[0] !== '#') return `rgba(232,184,75,${alpha})`;
  const h = color.length === 4
    ? color.slice(1).split('').map(c => c + c).join('')
    : color.slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function renderConstellations(svg, currentMonth, CX, CY, R) {
  const layer = document.getElementById('sky-layer')?.value;
  if (layer !== 'constellations') return;

  const mkEl = (tag) => document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(CONSTELLATION_STARS).forEach(key => {
    const c = CONSTELLATION_STARS[key];
    if (!c.months.includes(currentMonth)) return;

    const pts = c.points.filter(p => {
      const dx = p.x - CX;
      const dy = p.y - CY;
      return Math.sqrt(dx * dx + dy * dy) <= R - 5;
    });
    if (!pts.length) return;

    const stroke = constellationStroke(c.color, 0.2);

    (c.lines || []).forEach(([i, j]) => {
      const a = c.points[i];
      const b = c.points[j];
      if (!a || !b) return;
      const line = mkEl('line');
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
      line.setAttribute('stroke', stroke);
      line.setAttribute('stroke-width', '0.75');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('fill', 'none');
      line.setAttribute('clip-path', 'url(#dc)');
      line.setAttribute('pointer-events', 'none');
      svg.appendChild(line);
    });

    const cx = c.points.reduce((s, p) => s + p.x, 0) / c.points.length;
    const cy = c.points.reduce((s, p) => s + p.y, 0) / c.points.length;
    const label = mkEl('text');
    label.setAttribute('class', 'constellation-label');
    label.setAttribute('x', cx);
    label.setAttribute('y', cy);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('clip-path', 'url(#dc)');
    label.setAttribute('pointer-events', 'none');
    label.textContent = c.label;
    svg.appendChild(label);
  });
}
