const CONSTELLATION_HIGHLIGHT_CSS = `
/* === BEGIN constellation-highlight CSS ============================== */
 
/* When the sky is in "highlighting" mode, dim everything except the
   active constellation. We toggle the .highlighting class on the SVG
   itself so we don't fight any inline opacity from the existing code. */
#sky-svg.highlighting .star-dim,
#sky-svg.highlighting .halo-dim,
#sky-svg.highlighting .label-dim,
#sky-svg.highlighting .constellation-line-dim,
#sky-svg.highlighting .constellation-label-dim {
  opacity: 0.12 !important;
  transition: opacity 0.5s ease;
}
 
#sky-svg .constellation-line-active {
  stroke: #e8b84b !important;
  stroke-width: 1.6 !important;
  opacity: 0.95 !important;
  filter: drop-shadow(0 0 4px rgba(232,184,75,0.6));
  transition: opacity 0.5s ease, stroke-width 0.5s ease;
}
 
#sky-svg .star-active {
  filter: drop-shadow(0 0 5px rgba(232,184,75,0.8))
          drop-shadow(0 0 10px rgba(232,184,75,0.4));
}
 
#sky-svg .constellation-label-active {
  fill: #e8b84b !important;
  opacity: 0.9 !important;
  font-weight: 600;
  transition: opacity 0.5s ease;
}
 
/* Gentle pulse on the active stars */
@keyframes constellation-star-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}
#sky-svg .star-active circle,
#sky-svg circle.star-active {
  transform-box: fill-box;
  transform-origin: center;
  animation: constellation-star-pulse 2.4s ease-in-out infinite;
}
 
/* Reposition the info panel so it never covers the sky.
   On wide screens it stays in the right column (existing layout).
   On narrow screens, move it BELOW the dome instead of overlapping. */
@media (max-width: 860px) {
  .sky-grid #star-detail {
    margin-top: 16px;
  }
}
 
/* Make the empty dome area click-dismissible — visual cue */
#sky-svg.highlighting {
  cursor: pointer;
}
 
/* === END constellation-highlight CSS ================================ */
`;
 
// Auto-inject the CSS so installation is one-step
(function injectCSS() {
  const style = document.createElement('style');
  style.setAttribute('data-source', 'constellation-highlight');
  style.textContent = CONSTELLATION_HIGHLIGHT_CSS;
  document.head.appendChild(style);
})();
 
 
/* ────────────────────────────────────────────────────────────────────
   STEP 2 — Map each star ID to the constellation it belongs to.
 
   We use the STAR_TO_CONSTELLATION map you already built for the info
   panel — but we extend it with a few extras so that ALL visible stars
   in a constellation respond to clicks, not just the named anchor.
   ────────────────────────────────────────────────────────────────── */
 
// Wait for the existing app to initialize before patching.
function applyConstellationHighlightPatch() {
  if (typeof DETAIL_CONSTELLATIONS === 'undefined' ||
      typeof STARS === 'undefined' ||
      !STARS.length) {
    // App not ready yet — try again in a moment.
    return setTimeout(applyConstellationHighlightPatch, 100);
  }
 
  /* The active constellation key, or null when nothing is highlighted. */
  let activeConstellation = null;
 
  /* Drawing state — references to the SVG elements we created in the
     last render pass, so we can flip classes on them. Keyed by
     constellation id. */
  let drawnConstellations = {};
 
  /* ──────────────────────────────────────────────────────────────────
     Build a lookup: which constellation does each star belong to?
     Combine your hand-built STAR_TO_CONSTELLATION map with the
     constellationGroup field from stars.json as a fallback. */
  function buildStarToConstellation() {
    const map = {};
    // Start with the explicit hand-built map
    if (typeof STAR_TO_CONSTELLATION === 'object') {
      Object.keys(STAR_TO_CONSTELLATION).forEach(k => {
        if (STAR_TO_CONSTELLATION[k]) map[k] = STAR_TO_CONSTELLATION[k];
      });
    }
    // Layer on the constellationGroup from stars.json where missing
    STARS.forEach(s => {
      if (!map[s.id] && s.constellationGroup) {
        // Only count it if we actually have a DETAIL_CONSTELLATION for it
        const guessKey = guessConstellationKey(s.constellationGroup, s.id);
        if (guessKey) map[s.id] = guessKey;
      }
    });
    return map;
  }
 
  /* Map stars.json's constellation_group strings (e.g. "scorpius",
     "summer_triangle") to DETAIL_CONSTELLATIONS keys. */
  function guessConstellationKey(group, starId) {
    const direct = DETAIL_CONSTELLATIONS[group];
    if (direct) return group;
    // Special handling for groupings that don't map 1:1
    if (group === 'ursa_major') return 'nahiku';
    if (group === 'boötes' || group === 'bootes') return 'hokūiwa';
    if (group === 'summer_triangle') {
      // Summer triangle splits across Lyra, Cygnus, Aquila
      if (starId === 'kawelo') return 'lyra';
      if (starId === 'ikua') return 'cygnus';
      if (starId === 'kekaookalani') return 'aquila';
    }
    if (group === 'corvus') return 'mee';
    if (group === 'gemini') return null;        // No detail shape yet
    if (group === 'canis_major') return null;   // No detail shape yet
    if (group === 'canis_minor') return null;
    if (group === 'auriga') return null;
    if (group === 'piscis_austrinus') return null;
    if (group === 'carina') return null;
    if (group === 'pleiades') return null;
    return null;
  }
 
  const STAR_TO_CON = buildStarToConstellation();
 
  /* ──────────────────────────────────────────────────────────────────
     For each constellation we want to draw, we need:
     - Which stars from STARS to anchor it on (positions come from
       the existing sky projection)
     - Which line segments from DETAIL_CONSTELLATIONS.lines to draw,
       remapped from local-diagram indices to world sky positions.
 
     Strategy: the DETAIL_CONSTELLATIONS shapes are SHAPE templates
     in a 180x170 local space. We use the SVG-projected positions of
     the named anchor stars as ground truth, and fit the template
     onto them using a similarity transform (translate + rotate +
     uniform scale) computed from one or two anchor points.
 
     For most constellations DETAIL_CONSTELLATIONS only has one or two
     starIds tying back to real stars. With one anchor we can only
     translate (so the shape sits where the star is, at the template's
     baked-in scale). With two anchors we can also rotate and scale.
 
     We'll detect the anchor count and pick the right transform. */
 
  function getConstellationsForFrame(placed) {
    // Index actual placed stars by id
    const placedById = {};
    placed.forEach(p => { placedById[p.star.id] = p; });
 
    const constellations = {};
 
    Object.keys(DETAIL_CONSTELLATIONS).forEach(conKey => {
      const tmpl = DETAIL_CONSTELLATIONS[conKey];
      if (!tmpl || !tmpl.stars || !tmpl.lines) return;
 
      // Find which of the constellation's anchor stars are currently placed
      const anchorIds = tmpl.starIds || [];
      const anchors = [];
      anchorIds.forEach((sid, anchorIdx) => {
        const placedStar = placedById[sid];
        if (placedStar) {
          // Look up where this anchor sits in the template
          // We assume the anchor's "template position" is the star
          // at index `highlightIdx` if there's exactly one anchor,
          // OR at indices we need to identify by matching starIds
          // to template stars in declaration order.
          // For simplicity: use the highlightIdx as the SINGLE anchor.
          const tmplIdx = (tmpl.highlightIdx != null && anchorIdx === 0)
            ? tmpl.highlightIdx
            : null;
          anchors.push({
            starId: sid,
            sky: { x: placedStar.x, y: placedStar.y },
            tmplIdx,
            tmplPos: tmplIdx != null ? tmpl.stars[tmplIdx] : null
          });
        }
      });
 
      if (anchors.length === 0) return;
 
      // Compute transform from template space → sky space
      const transform = computeTransform(tmpl, anchors);
 
      // Apply transform to every template star to get sky positions
      const projectedStars = tmpl.stars.map((p, i) =>
        applyTransform(p, transform)
      );
 
      // Project line endpoints
      const projectedLines = tmpl.lines.map(([a, b]) => ({
        x1: projectedStars[a].x, y1: projectedStars[a].y,
        x2: projectedStars[b].x, y2: projectedStars[b].y
      }));
 
      constellations[conKey] = {
        key: conKey,
        label: tmpl.h || conKey,
        wide: tmpl.w || '',
        stars: projectedStars,
        lines: projectedLines,
        anchorIds: anchors.map(a => a.starId),
        // Compute centroid for label placement
        cx: projectedStars.reduce((s, p) => s + p.x, 0) / projectedStars.length,
        cy: projectedStars.reduce((s, p) => s + p.y, 0) / projectedStars.length,
        color: getColorForConstellation(anchors)
      };
    });
 
    return constellations;
  }
 
  /* Use the color of the anchor star — falls back to gold. */
  function getColorForConstellation(anchors) {
    for (const a of anchors) {
      const star = STARS.find(s => s.id === a.starId);
      if (star && star.color) return star.color;
    }
    return '#e8b84b';
  }
 
  /* Compute a similarity transform from template space to sky space.
     With one anchor: pure translation, template scale preserved (the
     shapes in DETAIL_CONSTELLATIONS are in a 180x170 box, but the sky
     dome is 500x500 so we shrink by a default factor of ~0.5).
     With two+ anchors: translate + rotate + scale. */
  function computeTransform(tmpl, anchors) {
    const DEFAULT_SCALE = 0.55;     // template box → sky scale
 
    if (anchors.length >= 2 && anchors[0].tmplPos && anchors[1].tmplPos) {
      // Two-anchor transform
      const t1 = anchors[0].tmplPos, t2 = anchors[1].tmplPos;
      const s1 = anchors[0].sky,     s2 = anchors[1].sky;
      const tdx = t2.x - t1.x, tdy = t2.y - t1.y;
      const sdx = s2.x - s1.x, sdy = s2.y - s1.y;
      const scale = Math.hypot(sdx, sdy) / Math.hypot(tdx, tdy);
      const angle = Math.atan2(sdy, sdx) - Math.atan2(tdy, tdx);
      return {
        type: 'similarity',
        scale,
        cos: Math.cos(angle) * scale,
        sin: Math.sin(angle) * scale,
        tx: s1.x,
        ty: s1.y,
        ox: t1.x,
        oy: t1.y
      };
    }
 
    // Single-anchor: translation only
    const a = anchors[0];
    const tmplCenter = a.tmplPos || { x: 90, y: 85 };
    return {
      type: 'translate',
      scale: DEFAULT_SCALE,
      cos: DEFAULT_SCALE,
      sin: 0,
      tx: a.sky.x,
      ty: a.sky.y,
      ox: tmplCenter.x,
      oy: tmplCenter.y
    };
  }
 
  function applyTransform(p, t) {
    const dx = p.x - t.ox, dy = p.y - t.oy;
    return {
      x: t.tx + dx * t.cos - dy * t.sin,
      y: t.ty + dx * t.sin + dy * t.cos
    };
  }
 
  /* ──────────────────────────────────────────────────────────────────
     Patch renderSkyDome to draw the new constellation overlay AFTER
     the existing rendering. We don't replace the whole function — we
     just wrap it. */
 
  const originalRender = window.renderSkyDome;
  const originalSelect = window.selectStar;
 
  window.renderSkyDome = function patchedRenderSkyDome(month, layer, hourHST) {
    // Call original first — it draws the dome, background stars,
    // and all the star dots + labels + hit areas.
    originalRender.call(this, month, layer, hourHST);
 
    // Only add constellation overlay on the "constellations" layer
    drawnConstellations = {};
    activeConstellation = null;
    const svg = document.getElementById('sky-svg');
    if (!svg) return;
 
    svg.classList.remove('highlighting');
 
    if (layer !== 'constellations') return;
 
    // Rebuild placed list by reading what the original render drew.
    // We do this by re-projecting all stars the same way the original
    // did, since the existing render doesn't store its placed list.
    const placed = buildPlacedListForOverlay(month, layer, hourHST);
    const constellations = getConstellationsForFrame(placed);
 
    // Tag every existing star circle and label with dim-capable classes
    // so the .highlighting state can dim them.
    tagExistingElementsForDimming(svg);
 
    // Draw the constellation lines and labels (in their own group)
    const overlayGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlayGroup.setAttribute('id', 'constellation-overlay');
    overlayGroup.setAttribute('clip-path', 'url(#dc)');
    svg.appendChild(overlayGroup);
 
    Object.keys(constellations).forEach(conKey => {
      const con = constellations[conKey];
      const conGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      conGroup.setAttribute('data-constellation', conKey);
      conGroup.style.cursor = 'pointer';
 
      // Draw lines
      con.lines.forEach(seg => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', seg.x1);
        line.setAttribute('y1', seg.y1);
        line.setAttribute('x2', seg.x2);
        line.setAttribute('y2', seg.y2);
        line.setAttribute('stroke', con.color);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('opacity', '0.35');
        line.setAttribute('fill', 'none');
        line.classList.add('constellation-line-dim');
        line.setAttribute('data-constellation-line', conKey);
        conGroup.appendChild(line);
      });
 
      // Draw label at centroid (offset up a bit to not sit on a star)
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', con.cx);
      label.setAttribute('y', con.cy - 18);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', con.color);
      label.setAttribute('opacity', '0.45');
      label.setAttribute('font-size', '7.5');
      label.setAttribute('font-family', 'Cinzel, serif');
      label.setAttribute('letter-spacing', '0.08em');
      label.textContent = con.label;
      label.classList.add('constellation-label-dim');
      label.setAttribute('data-constellation-label', conKey);
      conGroup.appendChild(label);
 
      // Invisible hit area covering the constellation's bounding box.
      // This lets the user click ANYWHERE on the constellation —
      // including on the lines — not just on a star.
      const bbox = getBoundingBox(con);
      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      hit.setAttribute('x', bbox.x);
      hit.setAttribute('y', bbox.y);
      hit.setAttribute('width', bbox.w);
      hit.setAttribute('height', bbox.h);
      hit.setAttribute('fill', 'transparent');
      hit.setAttribute('pointer-events', 'visible');
      hit.style.cursor = 'pointer';
      hit.addEventListener('click', () => {
        highlightConstellation(conKey);
        // Also open the info panel for the anchor star, if any
        const anchorId = con.anchorIds[0];
        if (anchorId) {
          const star = STARS.find(s => s.id === anchorId);
          if (star && originalSelect) originalSelect.call(this, star);
        }
      });
      conGroup.appendChild(hit);
 
      overlayGroup.insertBefore(conGroup, overlayGroup.firstChild);
      drawnConstellations[conKey] = conGroup;
    });
 
    // Click on empty sky dismisses the highlight
    svg.addEventListener('click', handleSkyClick);
  };
 
  function getBoundingBox(con) {
    const xs = con.stars.map(s => s.x);
    const ys = con.stars.map(s => s.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad = 18;
    return {
      x: minX - pad,
      y: minY - pad,
      w: (maxX - minX) + pad * 2,
      h: (maxY - minY) + pad * 2
    };
  }
 
  /* When a user clicks bare sky (not a constellation, not a star),
     clear the highlight. */
  function handleSkyClick(e) {
    if (e.target.closest('[data-constellation]')) return;
    if (e.target.closest('[data-star-hit]')) return;
    if (e.target.tagName === 'circle' && e.target.getAttribute('cursor') === 'pointer') return;
    clearHighlight();
  }
 
  /* Tag all star dots, halos, and labels created by the ORIGINAL
     renderSkyDome so we can target them with the .highlighting CSS.
     We identify them by their fill color and position relative to
     known stars — but a simpler approach is to just tag all circles
     inside the SVG that aren't in our overlay group. */
  function tagExistingElementsForDimming(svg) {
    const overlay = svg.querySelector('#constellation-overlay');
    const all = svg.querySelectorAll('circle, text, line, path');
    all.forEach(el => {
      if (overlay && overlay.contains(el)) return;
      // Skip the dome background, gridlines, and clip elements
      const tag = el.tagName.toLowerCase();
      const r = parseFloat(el.getAttribute('r') || '0');
      if (tag === 'circle' && r > 50) return;          // dome background
      if (tag === 'circle' && el.getAttribute('fill') === 'none') return;
      if (tag === 'path' && el.getAttribute('clip-path') === 'url(#dc)' && !el.getAttribute('stroke-dasharray')) return;
      // Tag everything else
      if (tag === 'circle') el.classList.add('star-dim', 'halo-dim');
      if (tag === 'text')   el.classList.add('label-dim');
    });
  }
 
  function highlightConstellation(conKey) {
    const svg = document.getElementById('sky-svg');
    if (!svg) return;
    activeConstellation = conKey;
    svg.classList.add('highlighting');
 
    // Clear previous active classes
    svg.querySelectorAll('.constellation-line-active, .constellation-label-active, .star-active')
       .forEach(el => el.classList.remove(
         'constellation-line-active',
         'constellation-label-active',
         'star-active'
       ));
 
    const group = drawnConstellations[conKey];
    if (!group) return;
 
    // Activate this constellation's lines and label
    group.querySelectorAll('[data-constellation-line]')
         .forEach(el => el.classList.add('constellation-line-active'));
    group.querySelectorAll('[data-constellation-label]')
         .forEach(el => el.classList.add('constellation-label-active'));
 
    // Find this constellation's anchor stars in the main star layer
    // and brighten them. We identify them by looking up STARS that
    // belong to this constellation key.
    const memberIds = Object.keys(STAR_TO_CON)
      .filter(starId => STAR_TO_CON[starId] === conKey);
 
    memberIds.forEach(starId => {
      const star = STARS.find(s => s.id === starId);
      if (!star) return;
      // Find the circle for this star by matching color + approx position.
      // The original render doesn't tag stars with their id, so we
      // identify by color + position match. Cheap & reliable enough.
      svg.querySelectorAll('circle.star-dim').forEach(circ => {
        const cx = parseFloat(circ.getAttribute('cx'));
        const cy = parseFloat(circ.getAttribute('cy'));
        const fill = circ.getAttribute('fill');
        if (fill === star.color &&
            star.skyX != null && star.skyY != null &&
            Math.hypot(cx - star.skyX, cy - star.skyY) < 25) {
          circ.classList.remove('star-dim');
          circ.classList.add('star-active');
        }
      });
    });
  }
 
  function clearHighlight() {
    const svg = document.getElementById('sky-svg');
    if (!svg) return;
    svg.classList.remove('highlighting');
    activeConstellation = null;
    svg.querySelectorAll('.constellation-line-active, .constellation-label-active, .star-active')
       .forEach(el => {
         el.classList.remove(
           'constellation-line-active',
           'constellation-label-active',
           'star-active'
         );
         // Restore star-dim class to re-activate if user dims again
         if (el.tagName.toLowerCase() === 'circle' && el.getAttribute('r') !== null) {
           const r = parseFloat(el.getAttribute('r'));
           if (r < 20) el.classList.add('star-dim');
         }
       });
  }
 
  /* Listen for Escape to dismiss */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeConstellation) clearHighlight();
  });
 
  /* ──────────────────────────────────────────────────────────────────
     Rebuild the placed-star list by replicating what renderSkyDome
     does internally. (The original doesn't expose it.) */
  function buildPlacedListForOverlay(month, layer, hourHST) {
    const CX = 250, CY = 250, R = 240;
    const visible = STARS.filter(s =>
      s.months.includes(month) &&
      (typeof starMatchesLayer === 'function'
        ? starMatchesLayer(s, layer)
        : s.type !== 'starline')
    );
    const placed = [];
    visible.forEach(star => {
      const pos = (typeof getStarSkyPos === 'function')
        ? getStarSkyPos(star, month, hourHST)
        : null;
      if (!pos) return;
      const dx = pos.x - CX, dy = pos.y - CY;
      if (Math.hypot(dx, dy) > R - 5) return;
      placed.push({ star, x: pos.x, y: pos.y });
    });
    return placed;
  }
 
  /* ──────────────────────────────────────────────────────────────────
     Patch selectStar: when a star with a known constellation is
     clicked, also highlight that constellation on the dome. */
  window.selectStar = function patchedSelectStar(star) {
    originalSelect.call(this, star);
    const conKey = STAR_TO_CON[star.id];
    // Only highlight if we're on the constellation layer
    const layer = document.getElementById('sky-layer');
    if (conKey && layer && layer.value === 'constellations') {
      highlightConstellation(conKey);
    }
  };
 
  /* ──────────────────────────────────────────────────────────────────
     Force a re-render so the patch takes effect immediately. */
  if (typeof updateSky === 'function') {
    setTimeout(updateSky, 50);
  }
 
  console.log('[constellation-highlight] patch applied');
}
 
/* Kick it off — wait for DOMContentLoaded, then for the app to init. */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyConstellationHighlightPatch);
} else {
  applyConstellationHighlightPatch();
}
 
