// ══════════════════════════════════════════════════════════════════
// HŌKŪ PALAPALA — CONSTELLATION GRAPHICS DATA
// Mapped to 500x500 SVG dome, center (250,250), radius 240
// 21°N latitude, matching Bishop Museum June 2026 sky map layout
// North (Hōkūpaʻa/Polaris) is at top-center
// South (Hema) is at bottom-center
// East (Hikina) is left side, West (Komohana) is right side
// ══════════════════════════════════════════════════════════════════

const CONSTELLATION_STARS = {

  // ── NĀHIKU (Big Dipper / Ursa Major) ──────────────────────────
  // Circumpolar — visible all year, upper-right quadrant of dome
  nahiku: {
    h: "Nāhiku",
    w: "Big Dipper",
    months: [0,1,2,3,4,5,6,7,8,9,10,11],
    color: "#c0d8f8",
    stars: [
      { id: "dubhe",    x: 322, y: 105, mag: 1.8, label: "bowl top-right" },
      { id: "merak",    x: 328, y: 122, mag: 2.4, label: "bowl bottom-right" },
      { id: "phecda",   x: 308, y: 128, mag: 2.4 },
      { id: "megrez",   x: 302, y: 112, mag: 3.3 },
      { id: "alioth",   x: 282, y: 108, mag: 1.8 },
      { id: "mizar",    x: 262, y: 100, mag: 2.1 },
      { id: "alkaid",   x: 240, y: 88,  mag: 1.9 }
    ],
    lines: [
      ["dubhe","merak"],
      ["merak","phecda"],
      ["phecda","megrez"],
      ["megrez","dubhe"],
      ["megrez","alioth"],
      ["alioth","mizar"],
      ["mizar","alkaid"]
    ]
  },

  // ── KA MŌʻĪ (Cepheus) ─────────────────────────────────────────
  // Circumpolar — crown/house shape near Polaris, upper center
  ka_moi: {
    h: "Ka Mōʻī",
    w: "Cepheus",
    months: [0,1,2,3,4,5,6,7,8,9,10,11],
    color: "#d0c8f8",
    stars: [
      { id: "alpha_cep", x: 268, y: 72,  mag: 2.4, label: "Ka Mōʻī" },
      { id: "beta_cep",  x: 248, y: 62,  mag: 3.2 },
      { id: "gamma_cep", x: 228, y: 75,  mag: 3.2 },
      { id: "delta_cep", x: 235, y: 92,  mag: 3.7 },
      { id: "epsilon_cep",x:258, y: 88,  mag: 4.2 }
    ],
    lines: [
      ["alpha_cep","beta_cep"],
      ["beta_cep","gamma_cep"],
      ["gamma_cep","delta_cep"],
      ["delta_cep","epsilon_cep"],
      ["epsilon_cep","alpha_cep"],
      ["alpha_cep","delta_cep"]
    ]
  },

  // ── URSA MINOR (containing Hōkūpaʻa/Polaris) ──────────────────
  // Small dipper shape around the north pole
  ursa_minor: {
    h: "Hōkūpa'a",
    w: "Ursa Minor",
    months: [0,1,2,3,4,5,6,7,8,9,10,11],
    color: "#c8e0ff",
    stars: [
      { id: "polaris",     x: 250, y: 52,  mag: 2.0, label: "Hōkūpaʻa" },
      { id: "umi_delta",   x: 258, y: 65,  mag: 4.3 },
      { id: "umi_epsilon", x: 268, y: 75,  mag: 4.2 },
      { id: "umi_zeta",    x: 272, y: 88,  mag: 4.3 },
      { id: "umi_eta",     x: 262, y: 95,  mag: 4.9 },
      { id: "umi_beta",    x: 278, y: 98,  mag: 2.1 },
      { id: "umi_gamma",   x: 285, y: 88,  mag: 3.0 }
    ],
    lines: [
      ["polaris","umi_delta"],
      ["umi_delta","umi_epsilon"],
      ["umi_epsilon","umi_zeta"],
      ["umi_zeta","umi_eta"],
      ["umi_eta","umi_beta"],
      ["umi_beta","umi_gamma"],
      ["umi_gamma","umi_zeta"]
    ]
  },
  // ── CYGNUS (containing Piraʻetea/Deneb) ───────────────────────
  // Northern cross / swan shape, upper-left quadrant (east/NE)
  cygnus: {
    h: "Piraʻetea",
    w: "Cygnus",
    months: [5,6,7,8,9,10],
    color: "#e0f0ff",
    stars: [
      { id: "deneb",     x: 188, y: 102, mag: 1.3, label: "Piraʻetea" },
      { id: "cyg_gamma", x: 192, y: 125, mag: 2.2 },
      { id: "cyg_eta",   x: 175, y: 138, mag: 3.9 },
      { id: "albireo",   x: 195, y: 155, mag: 3.1 },
      { id: "cyg_delta", x: 178, y: 118, mag: 2.9 },
      { id: "cyg_epsilon",x:208, y: 115, mag: 2.5 }
    ],
    lines: [
      ["deneb","cyg_gamma"],
      ["cyg_gamma","albireo"],
      ["cyg_delta","cyg_gamma"],
      ["cyg_gamma","cyg_epsilon"],
      ["cyg_eta","cyg_gamma"]
    ]
  },

  // ── LYRA (containing Keoe/Vega) ───────────────────────────────
  // Small parallelogram + Vega, upper-left area (east)
  lyra: {
    h: "Keoe",
    w: "Lyra",
    months: [5,6,7,8,9,10],
    color: "#d0eeff",
    stars: [
      { id: "vega",      x: 162, y: 118, mag: 0.0, label: "Keoe" },
      { id: "lyr_beta",  x: 152, y: 138, mag: 3.5 },
      { id: "lyr_gamma", x: 160, y: 148, mag: 3.2 },
      { id: "lyr_delta", x: 172, y: 145, mag: 4.2 },
      { id: "lyr_epsilon",x:175, y: 135, mag: 3.9 }
    ],
    lines: [
      ["vega","lyr_epsilon"],
      ["vega","lyr_beta"],
      ["lyr_beta","lyr_gamma"],
      ["lyr_gamma","lyr_delta"],
      ["lyr_delta","lyr_epsilon"],
      ["lyr_epsilon","lyr_beta"]
    ]
  },

  // ── AQUILA (containing Humu/Altair) ───────────────────────────
  // Eagle shape, left-center area (east horizon)
  aquila: {
    h: "Humu",
    w: "Aquila",
    months: [5,6,7,8,9,10],
    color: "#e8f4ff",
    stars: [
      { id: "altair",    x: 148, y: 218, mag: 0.8, label: "Humu" },
      { id: "aql_tarazed",x:155, y: 200, mag: 2.7 },
      { id: "aql_alshain",x:140, y: 228, mag: 3.7 },
      { id: "aql_theta", x: 160, y: 245, mag: 3.2 },
      { id: "aql_eta",   x: 148, y: 258, mag: 3.9 },
      { id: "aql_delta", x: 168, y: 215, mag: 3.4 },
      { id: "aql_lambda",x: 175, y: 232, mag: 3.4 },
      { id: "aql_zeta",  x: 162, y: 265, mag: 3.0 }
    ],
    lines: [
      ["aql_tarazed","altair"],
      ["altair","aql_alshain"],
      ["altair","aql_theta"],
      ["aql_theta","aql_eta"],
      ["aql_eta","aql_zeta"],
      ["aql_delta","altair"],
      ["aql_delta","aql_lambda"],
      ["aql_lambda","aql_zeta"]
    ]
  },

  // ── HŌKŪ'IWA / BOÖTES (containing Hōkūleʻa/Arcturus) ─────────
  // Kite shape, center of dome (overhead at 21°N in summer)
  hokūiwa: {
    h: "Hōkūʻiwa",
    w: "Boötes",
    months: [3,4,5,6,7,8],
    color: "#f4a050",
    stars: [
      { id: "arcturus",  x: 250, y: 178, mag: -0.1, label: "Hōkūleʻa" },
      { id: "boo_eta",   x: 232, y: 158, mag: 2.7 },
      { id: "boo_epsilon",x:268, y: 155, mag: 2.4 },
      { id: "boo_delta", x: 278, y: 172, mag: 3.5 },
      { id: "boo_beta",  x: 268, y: 195, mag: 3.5 },
      { id: "boo_gamma", x: 232, y: 198, mag: 3.0 },
      { id: "boo_rho",   x: 222, y: 178, mag: 3.6 }
    ],
    lines: [
      ["arcturus","boo_eta"],
      ["boo_eta","boo_epsilon"],
      ["boo_epsilon","arcturus"],
      ["boo_epsilon","boo_delta"],
      ["boo_delta","boo_beta"],
      ["boo_beta","arcturus"],
      ["arcturus","boo_gamma"],
      ["boo_gamma","boo_rho"],
      ["boo_rho","arcturus"]
    ]
  },

  // ── KAUAMEA / CORONA BOREALIS ──────────────────────────────────
  // Small arc/crown near Boötes, center-right area
  kauamea: {
    h: "Kauamea",
    w: "Corona Borealis",
    months: [3,4,5,6,7],
    color: "#e8d080",
    stars: [
      { id: "alphecca",  x: 298, y: 168, mag: 2.2, label: "Kauamea" },
      { id: "crb_beta",  x: 285, y: 162, mag: 3.7 },
      { id: "crb_gamma", x: 278, y: 155, mag: 3.8 },
      { id: "crb_delta", x: 288, y: 148, mag: 4.6 },
      { id: "crb_epsilon",x:302, y: 148, mag: 4.1 },
      { id: "crb_iota",  x: 312, y: 155, mag: 4.9 },
      { id: "crb_theta", x: 315, y: 163, mag: 4.1 }
    ],
    lines: [
      ["crb_gamma","crb_beta"],
      ["crb_beta","alphecca"],
      ["alphecca","crb_theta"],
      ["crb_theta","crb_iota"],
      ["crb_iota","crb_epsilon"],
      ["crb_epsilon","crb_delta"],
      ["crb_delta","crb_gamma"]
    ]
  },

  // ── LEO (containing Ikiiki/Regulus) ───────────────────────────
  // Sickle/lion shape, right-center area (western sky in June)
  leo: {
    h: "Ikiiki",
    w: "Leo",
    months: [1,2,3,4,5],
    color: "#e0e8ff",
    stars: [
      { id: "regulus",   x: 368, y: 218, mag: 1.4, label: "Ikiiki" },
      { id: "leo_eta",   x: 355, y: 205, mag: 3.5 },
      { id: "leo_gamma", x: 345, y: 192, mag: 2.0 },
      { id: "leo_zeta",  x: 358, y: 182, mag: 3.4 },
      { id: "leo_mu",    x: 372, y: 185, mag: 3.9 },
      { id: "leo_epsilon",x:380, y: 195, mag: 3.0 },
      { id: "leo_theta", x: 375, y: 210, mag: 3.3 },
      { id: "leo_delta", x: 355, y: 222, mag: 2.6 },
      { id: "leo_beta",  x: 390, y: 228, mag: 2.1, label: "Denebola" }
    ],
    lines: [
      ["regulus","leo_eta"],
      ["leo_eta","leo_gamma"],
      ["leo_gamma","leo_zeta"],
      ["leo_zeta","leo_mu"],
      ["leo_mu","leo_epsilon"],
      ["leo_epsilon","leo_theta"],
      ["leo_theta","regulus"],
      ["leo_gamma","leo_delta"],
      ["leo_delta","leo_beta"]
    ]
  },

  // ── VIRGO (containing Hikianalia/Spica) ───────────────────────
  // Large Y shape, center-right to lower-right
  virgo: {
    h: "Hikianalia",
    w: "Virgo",
    months: [2,3,4,5,6],
    color: "#b8d8ff",
    stars: [
      { id: "spica",     x: 298, y: 290, mag: 1.0, label: "Hikianalia" },
      { id: "vir_gamma", x: 310, y: 265, mag: 2.7 },
      { id: "vir_delta", x: 328, y: 252, mag: 3.4 },
      { id: "vir_epsilon",x:338, y: 240, mag: 2.8 },
      { id: "vir_zeta",  x: 318, y: 248, mag: 3.4 },
      { id: "vir_beta",  x: 290, y: 265, mag: 3.6 },
      { id: "vir_eta",   x: 278, y: 258, mag: 3.9 },
      { id: "vir_tau",   x: 268, y: 248, mag: 4.3 }
    ],
    lines: [
      ["spica","vir_gamma"],
      ["vir_gamma","vir_delta"],
      ["vir_delta","vir_epsilon"],
      ["vir_gamma","vir_zeta"],
      ["vir_gamma","vir_beta"],
      ["vir_beta","vir_eta"],
      ["vir_eta","vir_tau"]
    ]
  },

  // ── MEʻE / CORVUS (southern crow) ─────────────────────────────
  // Compact trapezoid, lower-center area
  mee: {
    h: "Meʻe",
    w: "Corvus",
    months: [2,3,4,5],
    color: "#c8b8e8",
    stars: [
      { id: "gienah",    x: 272, y: 338, mag: 2.6, label: "Meʻe" },
      { id: "crv_beta",  x: 258, y: 352, mag: 2.6 },
      { id: "crv_delta", x: 268, y: 362, mag: 3.0 },
      { id: "crv_epsilon",x:285, y: 355, mag: 3.0 }
    ],
    lines: [
      ["gienah","crv_beta"],
      ["crv_beta","crv_delta"],
      ["crv_delta","crv_epsilon"],
      ["crv_epsilon","gienah"],
      ["gienah","crv_delta"]
    ]
  },

  // ── KAMAKAUNUIAMĀUI / SCORPIUS ─────────────────────────────────
  // Great fishhook shape, lower-left quadrant (SE horizon in June)
  scorpius: {
    h: "Kamakaunuiamāui",
    w: "Scorpius",
    months: [4,5,6,7,8],
    color: "#f06868",
    stars: [
      { id: "graffias",  x: 290, y: 318, mag: 2.5 },
      { id: "dschubba",  x: 305, y: 322, mag: 2.3 },
      { id: "sco_pi",    x: 315, y: 330, mag: 2.9 },
      { id: "antares",   x: 322, y: 348, mag: 1.1, label: "Lehuakona" },
      { id: "sco_tau",   x: 330, y: 362, mag: 2.8 },
      { id: "sco_epsilon",x:338, y: 375, mag: 2.3 },
      { id: "sco_mu",    x: 345, y: 385, mag: 3.0 },
      { id: "sco_zeta",  x: 350, y: 395, mag: 3.6 },
      { id: "sco_eta",   x: 355, y: 408, mag: 3.3 },
      { id: "sco_theta", x: 352, y: 418, mag: 1.9 },
      { id: "sco_iota",  x: 342, y: 425, mag: 3.0 },
      { id: "sco_kappa", x: 330, y: 428, mag: 2.4 },
      { id: "shaula",    x: 320, y: 432, mag: 1.6, label: "tip of hook" },
      { id: "sco_upsilon",x:308, y: 430, mag: 2.7 }
    ],
    lines: [
      ["graffias","dschubba"],
      ["dschubba","sco_pi"],
      ["sco_pi","antares"],
      ["antares","sco_tau"],
      ["sco_tau","sco_epsilon"],
      ["sco_epsilon","sco_mu"],
      ["sco_mu","sco_zeta"],
      ["sco_zeta","sco_eta"],
      ["sco_eta","sco_theta"],
      ["sco_theta","sco_iota"],
      ["sco_iota","sco_kappa"],
      ["sco_kappa","shaula"],
      ["shaula","sco_upsilon"]
    ]
  },

  // ── PĪMOE / SAGITTARIUS ───────────────────────────────────────
  // Teapot asterism, lower-left area (SE horizon)
  sagittarius: {
    h: "Pīmoe",
    w: "Sagittarius",
    months: [5,6,7,8],
    color: "#f8d0a0",
    stars: [
      { id: "kaus_aus",  x: 245, y: 408, mag: 1.8, label: "Pīmoe" },
      { id: "kaus_med",  x: 235, y: 395, mag: 2.7 },
      { id: "kaus_bor",  x: 225, y: 382, mag: 2.8 },
      { id: "sag_phi",   x: 218, y: 395, mag: 3.2 },
      { id: "sag_sigma", x: 228, y: 410, mag: 2.0 },
      { id: "sag_tau",   x: 240, y: 422, mag: 3.3 },
      { id: "sag_zeta",  x: 215, y: 408, mag: 2.6 },
      { id: "sag_epsilon",x:208, y: 395, mag: 1.8 }
    ],
    lines: [
      ["kaus_aus","kaus_med"],
      ["kaus_med","kaus_bor"],
      ["kaus_bor","sag_phi"],
      ["sag_phi","sag_zeta"],
      ["sag_zeta","sag_epsilon"],
      ["sag_epsilon","sag_phi"],
      ["sag_phi","sag_sigma"],
      ["sag_sigma","kaus_aus"],
      ["kaus_aus","sag_tau"],
      ["sag_tau","sag_sigma"]
    ]
  },

  // ── CENTAURUS pointer stars ────────────────────────────────────
  // Kamailemua and Kamailehope pointing to Southern Cross
  centaurus: {
    h: "Kamailemua me Kamailehope",
    w: "Centaurus Pointer Stars",
    months: [2,3,4,5,6],
    color: "#ffe8b0",
    stars: [
      { id: "alpha_cen", x: 308, y: 448, mag: -0.3, label: "Kamailehope" },
      { id: "beta_cen",  x: 322, y: 435, mag: 0.6,  label: "Kamailemua" }
    ],
    lines: [
      ["alpha_cen","beta_cen"]
    ],
    // Dashed pointer line to Southern Cross
    pointerLine: { from: "beta_cen", to: "acrux", dashed: true }
  },

  // ── HĀNAIAKAMALAMA / CRUX (Southern Cross) ────────────────────
  // Four-point cross shape, lower-center area
  crux: {
    h: "Hānaiakamalama",
    w: "Southern Cross",
    months: [2,3,4,5,6],
    color: "#c0f0e0",
    stars: [
      { id: "acrux",     x: 298, y: 422, mag: 0.8, label: "Hānaiakamalama" },
      { id: "mimosa",    x: 318, y: 410, mag: 1.3 },
      { id: "gacrux",    x: 298, y: 400, mag: 1.6 },
      { id: "cru_delta", x: 282, y: 412, mag: 2.8 },
      { id: "cru_epsilon",x:305, y: 412, mag: 3.6 }
    ],
    lines: [
      ["acrux","gacrux"],
      ["mimosa","cru_delta"],
      ["cru_epsilon","acrux"],
      ["cru_epsilon","gacrux"]
    ]
  }

};

// ══════════════════════════════════════════════════════════════════
// CONSTELLATION RENDERING FUNCTION
// Paste this into your existing renderSkyDome() function
// Call it after drawing background stars, before drawing main stars
// ══════════════════════════════════════════════════════════════════

function renderConstellations(svg, month, CX, CY, R) {
  const layer = document.getElementById('sky-layer').value;
  if (layer !== 'constellations' && layer !== 'all') return;

  Object.values(CONSTELLATION_STARS).forEach(con => {
    // Only show constellations visible this month
    if (!con.months.includes(month)) return;

    const starMap = {};
    con.stars.forEach(s => { starMap[s.id] = s; });

    // Draw constellation lines
    con.lines.forEach(([fromId, toId]) => {
      const from = starMap[fromId];
      const to   = starMap[toId];
      if (!from || !to) return;

      // Clip to dome circle
      const dx1 = from.x - CX, dy1 = from.y - CY;
      const dx2 = to.x   - CX, dy2 = to.y   - CY;
      if (Math.sqrt(dx1*dx1+dy1*dy1) > R-5) return;
      if (Math.sqrt(dx2*dx2+dy2*dy2) > R-5) return;

      const line = mkEl('line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('stroke', con.color);
      line.setAttribute('stroke-width', '1');
      line.setAttribute('opacity', '0.22');
      line.setAttribute('clip-path', 'url(#dc)');
      svg.appendChild(line);
    });

    // Draw pointer/dashed lines if present
    if (con.pointerLine) {
      const from = starMap[con.pointerLine.from];
      // Find target in other constellations
      let to = null;
      Object.values(CONSTELLATION_STARS).forEach(c2 => {
        c2.stars.forEach(s => { if (s.id === con.pointerLine.to) to = s; });
      });
      if (from && to) {
        const dline = mkEl('line');
        dline.setAttribute('x1', from.x);
        dline.setAttribute('y1', from.y);
        dline.setAttribute('x2', to.x);
        dline.setAttribute('y2', to.y);
        dline.setAttribute('stroke', con.color);
        dline.setAttribute('stroke-width', '0.8');
        dline.setAttribute('stroke-dasharray', '4,4');
        dline.setAttribute('opacity', '0.18');
        dline.setAttribute('clip-path', 'url(#dc)');
        svg.appendChild(dline);
      }
    }

    // Draw individual constellation stars
    con.stars.forEach(s => {
      const dx = s.x - CX, dy = s.y - CY;
      if (Math.sqrt(dx*dx+dy*dy) > R-5) return;

      // Size by magnitude
      const r = s.mag < 0 ? 5.5 : s.mag < 1.5 ? 4 : s.mag < 2.5 ? 3 : s.mag < 3.5 ? 2.2 : 1.6;

      // Glow halo
      const halo = mkEl('circle');
      halo.setAttribute('cx', s.x);
      halo.setAttribute('cy', s.y);
      halo.setAttribute('r', r + 5);
      halo.setAttribute('fill', con.color);
      halo.setAttribute('opacity', '0.06');
      halo.setAttribute('clip-path', 'url(#dc)');
      svg.appendChild(halo);

      // Star dot
      const dot = mkEl('circle');
      dot.setAttribute('cx', s.x);
      dot.setAttribute('cy', s.y);
      dot.setAttribute('r', r);
      dot.setAttribute('fill', con.color);
      dot.setAttribute('stroke', 'rgba(255,255,255,0.2)');
      dot.setAttribute('stroke-width', '0.5');
      dot.setAttribute('clip-path', 'url(#dc)');
      svg.appendChild(dot);

      // Label for named stars
      if (s.label) {
        const lbl = mkEl('text');
        lbl.setAttribute('x', s.x + 7);
        lbl.setAttribute('y', s.y + 4);
        lbl.setAttribute('fill', con.color);
        lbl.setAttribute('opacity', '0.7');
        lbl.setAttribute('font-size', '7');
        lbl.setAttribute('font-family', 'Cinzel, serif');
        lbl.setAttribute('clip-path', 'url(#dc)');
        lbl.textContent = s.label;
        svg.appendChild(lbl);
      }
    });

    // Constellation name label at centroid
    const xs = con.stars.map(s => s.x);
    const ys = con.stars.map(s => s.y);
    const cx = xs.reduce((a,b) => a+b, 0) / xs.length;
    const cy = ys.reduce((a,b) => a+b, 0) / ys.length;
    const dcx = cx - CX, dcy = cy - CY;
    if (Math.sqrt(dcx*dcx+dcy*dcy) < R-20) {
      const name = mkEl('text');
      name.setAttribute('x', cx);
      name.setAttribute('y', cy - 12);
      name.setAttribute('text-anchor', 'middle');
      name.setAttribute('fill', con.color);
      name.setAttribute('opacity', '0.55');
      name.setAttribute('font-size', '8.5');
      name.setAttribute('font-family', 'Cinzel, serif');
      name.setAttribute('letter-spacing', '0.06em');
      name.setAttribute('clip-path', 'url(#dc)');
      name.textContent = con.h.toUpperCase();
      svg.appendChild(name);
    }
  });
}
