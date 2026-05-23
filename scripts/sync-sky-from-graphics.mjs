#!/usr/bin/env node
/**
 * Align stars.json skyX/skyY with constellation-graphics.js (Bishop Museum dome layout).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const gfxPath = path.join(root, 'constellation-graphics.js');
const starsPath = path.join(root, 'stars.json');

const gfxSrc = fs.readFileSync(gfxPath, 'utf8');
const starsData = JSON.parse(fs.readFileSync(starsPath, 'utf8'));

const GRAPHICS_STAR_TO_CATALOG = {
  polaris: 'hokupaa',
  antares: 'lehuakona',
  arcturus: 'hokulea',
  acrux: 'hanaiakamalama',
  alpha_cen: 'kamailehope',
  beta_cen: 'kamailemua',
  vega: 'kawelo',
  altair: 'humu',
  deneb: 'piraetea',
  gienah: 'mee',
  alphacca: 'ka_moi',
  spica: 'hikianalia',
  regulus: 'ikiiki'
};

const starsBlock = gfxSrc.match(/const CONSTELLATION_STARS = \{([\s\S]*?)\n\};/);
if (!starsBlock) throw new Error('CONSTELLATION_STARS not found');

const gfxPositions = {};
const starRe = /\{\s*id:\s*"([^"]+)"[^}]*x:\s*(\d+),\s*y:\s*(\d+)/g;
let m;
while ((m = starRe.exec(starsBlock[1])) !== null) {
  gfxPositions[m[1]] = { x: Number(m[2]), y: Number(m[3]) };
}

let updated = 0;
starsData.stars.forEach(star => {
  const gfxId = Object.entries(GRAPHICS_STAR_TO_CATALOG).find(([, cid]) => cid === star.id)?.[0];
  if (!gfxId || !gfxPositions[gfxId]) return;
  const pos = gfxPositions[gfxId];
  if (star.skyX !== pos.x || star.skyY !== pos.y) {
    star.skyX = pos.x;
    star.skyY = pos.y;
    updated++;
  }
});

fs.writeFileSync(starsPath, JSON.stringify(starsData, null, 2) + '\n');
console.log(`Updated ${updated} catalog star positions from graphics.`);
