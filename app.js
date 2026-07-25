// MV Estate Portal — template logic
// Renders the house (data-driven levels + rooms), the estate scene, and the detail panel.

(function() {
  const DATA = window.MV_FAMILY;

  // Painted dot Y-positions on house-empty-v4.png — rails align to these.
  // Tuned from the dragged layout you committed.
  const RAIL_Y = { PH: 31.86, L3: 44.30, L2: 56.49, L1: 67.60, GF: 79.76 };
  // Pixel offsets to shift the entire rail row inward toward the house.
  // Values come from the in-page drag-and-save tool; baked here so they apply
  // in any browser/tab without needing localStorage.
  const RAIL_LEFT_DX = 108;
  const RAIL_RIGHT_DX = -106;
  // Per-child offsets within each right-rail row (marker / key / caption).
  const RAIL_RIGHT_CHILD = {
    marker:  { x: 0,   y: 0 },
    key:     { x: -21, y: 0 },
    caption: { x: -40, y: 3 },
  };

  // ─── render the house into a given canvas/foundation pair ───
  function renderHouseInto(canvasEl, foundationEl, railLeftEl, railRightEl) {
    canvasEl.innerHTML = '';
    if (foundationEl) foundationEl.innerHTML = '';
    if (railLeftEl) railLeftEl.innerHTML = '';
    if (railRightEl) railRightEl.innerHTML = '';

    const house = DATA.house;

    house.levels.forEach((level) => {
      const lvl = document.createElement('div');
      lvl.className = 'level';
      lvl.style.flex = '1';

      // (Inline level-strip removed — replaced by absolute-positioned rail rows below.)

      const body = document.createElement('div');
      body.className = 'level-body';

      level.rooms.forEach((room, rIdx) => {
        const roomEl = document.createElement('div');
        roomEl.className = 'room';
        roomEl.style.gridColumn = `span ${room.width}`;
        roomEl.style.background = (rIdx % 2 === 0) ? level.palette.roomBg : (level.palette.roomBgAlt || level.palette.roomBg);
        roomEl.dataset.roomId = room.id;

        if (room.category) {
          const cat = document.createElement('div');
          cat.className = 'room-category';
          cat.style.color = level.palette.categoryText;
          cat.textContent = room.category;
          roomEl.appendChild(cat);
        }

        const name = document.createElement('div');
        name.className = 'room-name' + (room.name.length > 32 ? ' sm' : '');
        name.textContent = room.name;
        roomEl.appendChild(name);

        if (room.subName) {
          const sn = document.createElement('div');
          sn.className = 'room-subname';
          sn.textContent = room.subName;
          roomEl.appendChild(sn);
        }

        if (room.status) {
          const st = document.createElement('div');
          st.className = 'room-status';
          st.textContent = room.status;
          roomEl.appendChild(st);
        }

        if (room.generations && room.generations.length) {
          const gens = document.createElement('div');
          gens.className = 'room-gens';
          room.generations.forEach(g => {
            const b = document.createElement('span');
            b.className = 'gen-badge gen-' + g.toLowerCase();
            b.textContent = g;
            gens.appendChild(b);
          });
          roomEl.appendChild(gens);
        }

        roomEl.addEventListener('click', () => openRoom(room.id));
        body.appendChild(roomEl);
      });

      lvl.appendChild(body);
      canvasEl.appendChild(lvl);
    });

    if (house.foundation && foundationEl) {
      const f = document.createElement('div');
      f.className = 'foundation';
      f.innerHTML = `<span class="foundation-label">${house.foundation.label}</span><span class="foundation-text">${house.foundation.text}</span>`;
      f.addEventListener('click', () => openRoom(house.foundation.roomId));
      foundationEl.appendChild(f);
    }

    // ─── RAILS ─── one row per level, vertically centered on its painted dot
    if (railLeftEl || railRightEl) {
      house.levels.forEach((level) => {
        const yPct = RAIL_Y[level.id];
        if (yPct == null) return;

        // LEFT rail — colored vertical pill matching the strip palette
        if (railLeftEl) {
          const row = document.createElement('div');
          row.className = 'rail-row rail-row-left';
          row.style.top = yPct + '%';
          row.style.transform = `translate(${RAIL_LEFT_DX}px, -50%)`;
          const pill = document.createElement('div');
          pill.className = 'rail-level-pill';
          if (level.label && level.label.length >= 9) pill.classList.add('long');
          pill.style.background = level.palette.strip;
          pill.style.color = level.palette.stripText;
          // Two-word labels (e.g. "Ground Level") wrap to 2 lines so each word
          // fits comfortably in the skinny pill. Single-word labels stay on one line.
          const parts = (level.label || '').trim().split(/\s+/);
          if (parts.length >= 2) {
            pill.innerHTML = parts.map(p => `<span class="rlp-line">${p}</span>`).join('');
            pill.classList.add('multi-line');
          } else {
            pill.textContent = level.label;
          }
          row.appendChild(pill);
          railLeftEl.appendChild(row);
        }

        // RIGHT rail — short marker + key icon + qualification text
        if (railRightEl) {
          const row = document.createElement('div');
          row.className = 'rail-row rail-row-right';
          row.style.top = yPct + '%';
          row.style.transform = `translate(${RAIL_RIGHT_DX}px, -50%)`;

          const marker = document.createElement('div');
          marker.className = 'rail-marker';
          marker.style.color = level.palette.strip;
          marker.style.transform = `translate(${RAIL_RIGHT_CHILD.marker.x}px, ${RAIL_RIGHT_CHILD.marker.y}px)`;
          marker.textContent = level.id; // PH / L3 / L2 / L1 / GF
          row.appendChild(marker);

          const key = document.createElement('img');
          key.className = 'rail-key';
          key.src = 'assets/key-icon.png';
          key.alt = '';
          key.style.transform = `translate(${RAIL_RIGHT_CHILD.key.x}px, ${RAIL_RIGHT_CHILD.key.y}px)`;
          row.appendChild(key);

          const cap = document.createElement('div');
          cap.className = 'rail-caption';
          cap.textContent = level.qualification || '';
          cap.style.transform = `translate(${RAIL_RIGHT_CHILD.caption.x}px, ${RAIL_RIGHT_CHILD.caption.y}px)`;
          row.appendChild(cap);

          railRightEl.appendChild(row);
        }
      });
    }
  }

  function renderHouse() {
    renderHouseInto(
      document.getElementById('house-canvas'),
      document.getElementById('house-foundation'),
      document.getElementById('house-rail-left'),
      document.getElementById('house-rail-right')
    );
    renderLegendInto(document.getElementById('house-legend'));
    const canvasAll = document.getElementById('house-canvas-all');
    const foundationAll = document.getElementById('house-foundation-all');
    const railLeftAll = document.getElementById('house-rail-left-all');
    const railRightAll = document.getElementById('house-rail-right-all');
    if (canvasAll) renderHouseInto(canvasAll, foundationAll, railLeftAll, railRightAll);
    const legendAll = document.getElementById('house-legend-all');
    if (legendAll) renderLegendInto(legendAll);

    // Re-apply any localStorage rail overrides on top of baked defaults
    if (window.MV_RAIL_DESIGN && window.MV_RAIL_DESIGN.apply) {
      window.MV_RAIL_DESIGN.apply();
    }
  }

  // ─── Generation legend bar ───
  function renderLegendInto(el) {
    if (!el) return;
    el.innerHTML = `
      <span class="legend-bar-title">Generation Key</span>
      <span class="legend-item"><span class="gen-badge gen-g1">G1</span>Generation 1 — Founders</span>
      <span class="legend-item"><span class="gen-badge gen-g2">G2</span>Generation 2 — Children</span>
      <span class="legend-item"><span class="gen-badge gen-g3">G3</span>Generation 3 — Grandchildren</span>
      <span class="legend-item"><span class="gen-badge gen-il">IL</span>In-Laws</span>
    `;
  }

  // ─── render the estate: PNG background + positioned hotspots ───
  function renderEstateInto(container) {
    container.innerHTML = '';

    // Clean up any legacy Annex SVG overlay
    const frame = container.parentElement;
    if (frame) {
      const oldOverlay = frame.querySelector('.estate-overlay');
      if (oldOverlay) oldOverlay.remove();
    }

    // Hotspot rects are tight around each building's footprint in the 1713×918 PNG.
    // The label sits centered just below the rect (bottom: -28px via CSS), so the rect's
    // horizontal center and lower edge MUST match the building it belongs to.
    //   Garden : fountain + arch cluster, upper-left
    //   House  : manor with columns + hedges, lower-center-left (links back to house view)
    //   Gateway: the gate between two pillars, lower-center
    //   Ops    : large office building, upper-right
    // Each zone defines:
    //   • the invisible clickable rect (left/top/width/height), sized tight around the building
    //   • labelX/labelY = exact anchor (% of frame) where the label is centered & its top line sits
    // Anchors were eyeballed against the estate PNG so each label sits just below its building.
    // Four named elements on the estate, left-to-right:
    //   1. Garden  (far left)              — labelled under the garden
    //   2. Annex   (classical columned bldg, center-left) — labelled under the building, CLICKABLE to open the house view
    //   3. Gateway (gate, center-right)    — labelled under the gate
    //   4. Ops     (modern bldg, far right) — labelled under the building
    // Hotspot coords expressed as % of the 1713×918 estate PNG.
    // NEW estate.png layout (5625×2344):
    //   Garden  — top-left  (fountain + arch cluster)
    //   Ops     — top-right (modern office)
    //   Annex   — bottom-center-left (columned manor)  → clicking opens house view
    //   Gateway — center    (open gates)
    // Label anchors derived from actual painted bboxes of each building on estate.png:
    //   Garden  bbox bottom ≈ 44.7%, cx ≈ 14.9%
    //   Ops     bbox bottom ≈ 47.8%, cx ≈ 80.9%
    //   Annex   bbox bottom ≈ 89.8%, cx ≈ 34.9%
    //   Gateway bbox bottom ≈ 82.8%, cx ≈ 56.9%
    // labelY sits ~4pp below bbox-bottom so each label has a consistent gutter
    // of whitespace between it and the bushes/hedges at the base of its building.
    // The .estate-frame has extra aspect-ratio headroom below the image so
    // labels at labelY > 100% don't clip.
    // Coordinates for new estate.png (1536×1024). Defaults are rough — press L
    // to enter drag mode, position each hotspot + label, then click "Copy coords".
    const zones = [
      // Mansion (top-center) — the family house, clicking opens the house view (no label)
      { key: 'mansion', eyebrow: 'The House',              left: '18%',   top: '2%',  width: '50.5%', height: '33%',
        labelX: '43%',   labelY: '36%',
        showLabel: false,
        onClick: () => switchView('house') },
      { key: 'annex',   eyebrow: 'Operational Governance', left: '78.6%', top: '37.8%', width: '19.4%', height: '20.4%',
        labelX: '88.7%', labelY: '58.3%' },
      { key: 'garden',  eyebrow: 'Well-being',             left: '1.1%',  top: '24.8%', width: '29.4%', height: '30%',
        labelX: '14.9%', labelY: '56.8%' },
      { key: 'ops',     eyebrow: 'Operation Initiatives',  left: '30.1%', top: '74.8%', width: '29.2%', height: '21.2%',
        labelX: '45%',   labelY: '97.6%' },
      { key: 'gateway', eyebrow: 'The Gateway',            left: '32.7%', top: '53.9%', width: '27.6%', height: '19.6%',
        labelX: '46.4%', labelY: '48.7%' },
      // Bridge (center-right, over the river) — popup, no navigation
      { key: 'bridge',  eyebrow: 'Owners Legal Right',     left: '50%',   top: '30.3%', width: '22%',  height: '20%',
        labelX: '61%',   labelY: '52%',
        showLabel: false,
        onClick: () => openInfoPopup('bridge') },
      // Restricted Access sign (right of bridge) — popup
      { key: 'restricted', eyebrow: 'Restricted Access',   left: '65%',   top: '44.9%', width: '13%',  height: '13.7%',
        labelX: '71.5%', labelY: '60%',
        showLabel: false,
        onClick: () => openInfoPopup('restricted') },
    ];

    zones.forEach(z => {
      const b = DATA.estate.buildings[z.key];
      // Some zones (bridge, restricted) aren't full buildings — they only
      // need the hotspot for popup triggering. Skip the missing-building bail.

      // Invisible clickable hotspot (no visible square)
      const el = document.createElement('div');
      el.className = 'estate-hotspot';
      el.dataset.key = z.key;
      el.style.cssText = `left:${z.left};top:${z.top};width:${z.width};height:${z.height};`;
      // Resize handle (only visible in drag mode)
      const handle = document.createElement('div');
      handle.className = 'estate-hotspot-handle';
      el.appendChild(handle);
      // Key label inside the hotspot (only visible in drag mode)
      const keyTag = document.createElement('div');
      keyTag.className = 'estate-hotspot-key';
      keyTag.textContent = z.key;
      el.appendChild(keyTag);

      // Apply any saved overrides from localStorage (drag mode persists positions).
      const saved = loadEstateOverrides()[z.key];
      if (saved) {
        if (saved.left)   el.style.left   = saved.left;
        if (saved.top)    el.style.top    = saved.top;
        if (saved.width)  el.style.width  = saved.width;
        if (saved.height) el.style.height = saved.height;
      }

      // Label is optional — bridge and restricted are popup-only, no label.
      let label = null;
      if (z.showLabel !== false) {
        label = document.createElement('div');
        label.className = 'estate-label';
        // Gateway label gets the gold dash drawn BELOW the text (not above) so the
        // line sits between Family Office and the buildings beneath it.
        if (z.key === 'gateway') label.classList.add('line-below');
        label.dataset.for = z.key;
        const labelLeft = (saved && saved.labelX) || z.labelX;
        const labelTop  = (saved && saved.labelY) || z.labelY;
        label.style.cssText = `left:${labelLeft};top:${labelTop};`;
        const labelName = (b && b.name) || '';
        label.innerHTML = `<span class="eh-eyebrow">${z.eyebrow}</span>${labelName}`;

        el.addEventListener('mouseenter', () => label.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => label.classList.remove('is-hover'));
      }

      if (z.onClick) {
        el.addEventListener('click', z.onClick);
      } else if (b) {
        el.addEventListener('click', () => openBuilding(z.key));
      }

      // ─── DRAG-TO-POSITION support (activated by toggleLabelDragMode) ───
      if (label) enableLabelDrag(label, container, z.key);
      enableHotspotDrag(el, handle, container, z.key);

      container.appendChild(el);
      if (label) container.appendChild(label);
    });
  }

  // ── Persistence: estate drag positions live in localStorage so they survive
  //    page refreshes. The "Copy coords" button still emits source code for
  //    pasting back into the zones array (the canonical record).
  const ESTATE_OVERRIDE_KEY = 'mv-estate-overrides-v1';
  function loadEstateOverrides() {
    try { return JSON.parse(localStorage.getItem(ESTATE_OVERRIDE_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveEstateOverride(key, patch) {
    const all = loadEstateOverrides();
    all[key] = Object.assign({}, all[key], patch);
    localStorage.setItem(ESTATE_OVERRIDE_KEY, JSON.stringify(all));
  }
  window.clearEstateOverrides = () => {
    localStorage.removeItem(ESTATE_OVERRIDE_KEY);
    location.reload();
  };

  // Drag-to-position mode for estate labels. When enabled, labels become
  // grabbable; dragging updates left/top in % of the hotspots container.
  // The current coords are displayed live in a pill and copied to the clipboard
  // so they can be pasted back into the zones array.
  let labelDragMode = false;
  function enableLabelDrag(label, container, key) {
    label.addEventListener('pointerdown', (e) => {
      if (!labelDragMode) return;
      e.preventDefault();
      e.stopPropagation();
      label.setPointerCapture(e.pointerId);
      label.classList.add('is-dragging');

      const frameRect = container.getBoundingClientRect();
      // Compute the pointer's offset from the label's anchor point (its top-left
      // is at left/top, but with translateX(-50%) the visual center is at left).
      const startLabelRect = label.getBoundingClientRect();
      // The label's anchor (style.left) corresponds to the HORIZONTAL CENTER of the label.
      // The anchor (style.top) corresponds to the TOP edge of the label.
      const anchorX = startLabelRect.left + startLabelRect.width / 2;
      const anchorY = startLabelRect.top;
      const grabDx = e.clientX - anchorX;
      const grabDy = e.clientY - anchorY;

      const onMove = (ev) => {
        const newAnchorX = ev.clientX - grabDx;
        const newAnchorY = ev.clientY - grabDy;
        const leftPct = ((newAnchorX - frameRect.left) / frameRect.width) * 100;
        const topPct = ((newAnchorY - frameRect.top) / frameRect.height) * 100;
        label.style.left = leftPct.toFixed(1) + '%';
        label.style.top = topPct.toFixed(1) + '%';
        updateDragReadout();
        // Persist on every move so position sticks even if pointerup is missed
        saveEstateOverride(key, { labelX: label.style.left, labelY: label.style.top });
      };
      const onUp = () => {
        label.classList.remove('is-dragging');
        label.removeEventListener('pointermove', onMove);
        label.removeEventListener('pointerup', onUp);
        label.removeEventListener('pointercancel', onUp);
        // Persist label position
        saveEstateOverride(key, { labelX: label.style.left, labelY: label.style.top });
      };
      label.addEventListener('pointermove', onMove);
      label.addEventListener('pointerup', onUp);
      label.addEventListener('pointercancel', onUp);
    });
  }

  // Drag + resize for estate hotspot rects. Grabbing the body of the hotspot
  // moves it; grabbing the bottom-right handle resizes it. All coords are kept
  // in % of the hotspots container. Click events are suppressed while dragging
  // so the hotspot's normal click (openBuilding) doesn't fire on release.
  function enableHotspotDrag(el, handle, container, key) {
    let justDragged = false;

    // Swallow the click that happens right after a drag — capture phase so it
    // wins over the hotspot's own click listener.
    el.addEventListener('click', (e) => {
      if (justDragged) {
        e.stopImmediatePropagation();
        e.preventDefault();
        justDragged = false;
      }
    }, true);

    // MOVE — drag body of hotspot
    el.addEventListener('pointerdown', (e) => {
      if (!labelDragMode) return;
      if (e.target === handle) return; // resize handler below
      e.preventDefault();
      e.stopPropagation();
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');

      const frameRect = container.getBoundingClientRect();
      const startRect = el.getBoundingClientRect();
      const grabDx = e.clientX - startRect.left;
      const grabDy = e.clientY - startRect.top;
      let moved = false;

      const onMove = (ev) => {
        const newLeftPx = ev.clientX - grabDx;
        const newTopPx = ev.clientY - grabDy;
        const leftPct = ((newLeftPx - frameRect.left) / frameRect.width) * 100;
        const topPct = ((newTopPx - frameRect.top) / frameRect.height) * 100;
        el.style.left = leftPct.toFixed(1) + '%';
        el.style.top = topPct.toFixed(1) + '%';
        moved = true;
        updateDragReadout();
        // Persist on every move
        saveEstateOverride(key, { left: el.style.left, top: el.style.top });
      };
      const onUp = () => {
        el.classList.remove('is-dragging');
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
        if (moved) justDragged = true;
        // Persist hotspot position
        saveEstateOverride(key, { left: el.style.left, top: el.style.top });
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
    });

    // RESIZE — drag bottom-right handle
    handle.addEventListener('pointerdown', (e) => {
      if (!labelDragMode) return;
      e.preventDefault();
      e.stopPropagation();
      handle.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');

      const frameRect = container.getBoundingClientRect();
      const startRect = el.getBoundingClientRect();
      let moved = false;

      const onMove = (ev) => {
        const newRightPx = ev.clientX;
        const newBottomPx = ev.clientY;
        const widthPx = Math.max(20, newRightPx - startRect.left);
        const heightPx = Math.max(20, newBottomPx - startRect.top);
        const widthPct = (widthPx / frameRect.width) * 100;
        const heightPct = (heightPx / frameRect.height) * 100;
        el.style.width = widthPct.toFixed(1) + '%';
        el.style.height = heightPct.toFixed(1) + '%';
        moved = true;
        updateDragReadout();
        // Persist on every move
        saveEstateOverride(key, { width: el.style.width, height: el.style.height });
      };
      const onUp = () => {
        el.classList.remove('is-dragging');
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        handle.removeEventListener('pointercancel', onUp);
        if (moved) justDragged = true;
        // Persist hotspot size
        saveEstateOverride(key, { width: el.style.width, height: el.style.height });
      };
      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp);
      handle.addEventListener('pointercancel', onUp);
    });
  }

  function updateDragReadout() {
    const pill = document.getElementById('estate-drag-readout');
    if (!pill) return;
    // Prefer the labels inside the currently visible estate-frame.
    const frames = [...document.querySelectorAll('.estate-frame')];
    const visible = frames.find(f => f.getBoundingClientRect().height > 10) || frames[0];
    if (!visible) return;
    const hotspots = [...visible.querySelectorAll('.estate-hotspot')];
    const labels = [...visible.querySelectorAll('.estate-label')];
    // Build one block per zone: key, hotspot rect, label anchor — matching
    // the field order in the zones array so it's easy to paste back.
    const byKey = new Map();
    hotspots.forEach(h => byKey.set(h.dataset.key, { hotspot: h }));
    labels.forEach(l => {
      const entry = byKey.get(l.dataset.for) || {};
      entry.label = l;
      byKey.set(l.dataset.for, entry);
    });
    const lines = [...byKey.entries()].map(([k, v]) => {
      const h = v.hotspot;
      const l = v.label;
      const hotRect = h ? `left:'${h.style.left}', top:'${h.style.top}', width:'${h.style.width}', height:'${h.style.height}'` : '';
      const labRect = l ? `labelX:'${l.style.left}', labelY:'${l.style.top}'` : '';
      return `${k}:\n  ${hotRect}\n  ${labRect}`;
    }).join('\n');
    pill.querySelector('pre').textContent = lines;
  }

  function toggleLabelDragMode(force) {
    labelDragMode = (force !== undefined) ? force : !labelDragMode;
    document.body.classList.toggle('label-drag-mode', labelDragMode);
    let pill = document.getElementById('estate-drag-readout');
    if (labelDragMode) {
      if (!pill) {
        pill = document.createElement('div');
        pill.id = 'estate-drag-readout';
        pill.innerHTML = `
          <div class="edr-head">
            <span class="edr-title">Drag labels · press L to exit</span>
            <button class="edr-copy" type="button">Copy coords</button>
          </div>
          <pre></pre>`;
        document.body.appendChild(pill);
        pill.querySelector('.edr-copy').addEventListener('click', () => {
          const text = pill.querySelector('pre').textContent;
          navigator.clipboard?.writeText(text);
          const btn = pill.querySelector('.edr-copy');
          const orig = btn.textContent;
          btn.textContent = 'Copied ✓';
          setTimeout(() => { btn.textContent = orig; }, 1200);
        });
      }
      updateDragReadout();
    } else if (pill) {
      pill.remove();
    }
  }

  // Expose globally so it's easy to toggle from console too.
  window.toggleLabelDragMode = toggleLabelDragMode;

  document.addEventListener('keydown', (e) => {
    // Don't fire while typing in an input/textarea.
    if (/input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === 'l' || e.key === 'L') toggleLabelDragMode();
  });

  function renderEstate() {
    renderEstateInto(document.getElementById('estate-hotspots'));
    const all = document.getElementById('estate-hotspots-all');
    if (all) renderEstateInto(all);
  }

  // ─── DETAIL PANEL ───
  function openRoom(roomId) {
    const d = DATA.roomDetails[roomId];
    if (!d) return console.warn('No details for', roomId);
    document.getElementById('dp-badge').textContent = d.badge;
    document.getElementById('dp-badge').style.background = d.badgeColor;
    document.getElementById('dp-title').textContent = d.title;
    document.getElementById('dp-subtitle').textContent = d.subtitle;

    let h = '<div class="rooms-container"><div class="room-card"><div class="room-card-top"><div class="room-card-body">';
    d.rows.forEach(r => {
      h += `<div class="rcb-row"><div class="rcb-label">${r.label}</div><div class="rcb-value">${r.value}</div></div>`;
    });
    h += '</div></div></div></div>';
    document.getElementById('dp-body').innerHTML = h;
    document.getElementById('dp-body').scrollTop = 0;
    showPanel();
  }

  // ─── INFO POPUP (small modal — bridge, restricted-access, etc.) ───
  const INFO_POPUPS = {
    bridge: {
      title: 'Owners Legal Right',
      sections: [
        { label: 'To Be Represented', items: [
          'Representatives may or may not be family members',
          'Qualification and experience-based',
        ]},
      ],
    },
    restricted: {
      title: 'Governance Bodies with Restricted Access',
      sections: [
        { label: 'Representatives', items: [
          'Legal fiduciary duties',
          'Technical qualifications',
          'Held to industry standards',
          'Can be sued if obligations are breached',
          'Elected / ratified',
        ]},
      ],
    },
  };
  function openInfoPopup(key) {
    const cfg = INFO_POPUPS[key];
    if (!cfg) return;
    document.getElementById('info-title').textContent = cfg.title;
    let h = '';
    cfg.sections.forEach(sec => {
      h += `<div class="info-section">`;
      if (sec.label) h += `<div class="info-section-label">${sec.label}</div>`;
      h += '<ul class="info-list">';
      sec.items.forEach(item => { h += `<li>${item}</li>`; });
      h += '</ul></div>';
    });
    document.getElementById('info-body').innerHTML = h;
    const ov = document.getElementById('info-overlay');
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
  }
  function closeInfoPopup() {
    const ov = document.getElementById('info-overlay');
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
  }
  // Wire close handlers once on init
  document.addEventListener('DOMContentLoaded', () => {
    const ov = document.getElementById('info-overlay');
    if (!ov) return;
    document.getElementById('info-close').addEventListener('click', closeInfoPopup);
    ov.addEventListener('click', (e) => { if (e.target === ov) closeInfoPopup(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ov.classList.contains('open')) closeInfoPopup();
    });
  });
  window.openInfoPopup = openInfoPopup;

  function openBuilding(key) {
    const b = DATA.estate.buildings[key];
    if (!b) return;
    document.getElementById('dp-badge').textContent = b.subtitle.toUpperCase();
    document.getElementById('dp-badge').style.background = b.accentColor;
    document.getElementById('dp-title').textContent = b.name;
    document.getElementById('dp-subtitle').textContent = b.description;

    let h = '<div class="rooms-container">';
    b.rooms.forEach(rm => {
      const clickable = rm.roomId ? 'clickable' : '';
      const arrow = rm.roomId ? '<div class="rcl-arrow">OPEN ROOM →</div>' : '';
      const onclick = rm.roomId ? `data-roomid="${rm.roomId}"` : '';
      h += `<div class="room-card ${clickable}" ${onclick}><div class="room-card-top"><div class="room-card-label"><div class="rcl-category">${rm.category}</div><div class="rcl-name">${rm.name}</div>${arrow}</div><div class="room-card-body">`;
      if (rm.rows) {
        rm.rows.forEach(r => {
          h += `<div class="rcb-row"><div class="rcb-label">${r.label}</div><div class="rcb-value">${r.value}</div></div>`;
        });
      } else {
        const detail = DATA.roomDetails[rm.roomId];
        if (detail) {
          h += `<div class="rcb-row" style="border:none;"><div class="rcb-value" style="font-style:italic;color:#4A5E74;padding:4px 0;">${detail.subtitle}</div></div>`;
        }
      }
      h += '</div></div></div>';
    });
    h += '</div>';
    document.getElementById('dp-body').innerHTML = h;

    document.querySelectorAll('#dp-body .room-card.clickable').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-roomid');
        openRoom(id);
      });
    });

    document.getElementById('dp-body').scrollTop = 0;
    showPanel();
  }

  function showPanel() {
    document.getElementById('detail-overlay').classList.add('open');
    document.getElementById('detail-panel').classList.add('open');
    document.getElementById('detail-panel').setAttribute('aria-hidden','false');
  }
  function closePanel() {
    document.getElementById('detail-overlay').classList.remove('open');
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-panel').setAttribute('aria-hidden','true');
  }

  // ─── VIEW SWITCHER ───
  function switchView(view) {
    document.getElementById('view-house').style.display = view === 'house' ? 'block' : 'none';
    document.getElementById('view-estate').style.display = view === 'estate' ? 'block' : 'none';
    const viewAll = document.getElementById('view-all');
    if (viewAll) viewAll.style.display = view === 'all' ? 'block' : 'none';
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.view === view);
    });
    window.scrollTo({top:0, behavior:'instant'});
  }

  // ─── EVENTS ───
  document.addEventListener('DOMContentLoaded', () => {
    renderHouse();
    renderEstate();

    document.querySelectorAll('.nav-tab').forEach(t => {
      t.addEventListener('click', () => switchView(t.dataset.view));
    });
    document.getElementById('dp-close').addEventListener('click', closePanel);
    document.getElementById('detail-overlay').addEventListener('click', closePanel);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  });
})();
