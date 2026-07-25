/* Rail Layout Applier (UI-free)
   Reads the persisted rail layout from localStorage and applies it to the
   rendered rail rows. No panel, no buttons, no drag handles — purely a
   read-and-apply pass that runs after app.js builds the rails.

   Persisted shape (per side per level id):
     {
       "left": { "PH": {topPct, dx, scale}, ... },
       "right": { "PH": {topPct, dx, captionMax, keyW, keyH, childOffsets}, ... }
     }
*/
(function () {
  const STORAGE_KEY = 'mv-rail-layout-v1';

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { left: {}, right: {} };
  }

  const layout = load();

  // ─── Tag every rail row so we can find them by side+id ───
  function tagRows() {
    document.querySelectorAll('.rail-row').forEach(row => {
      if (row.dataset.side) return;
      const isLeft = row.classList.contains('rail-row-left');
      row.dataset.side = isLeft ? 'left' : 'right';
      // Level id lives on the row as data-level-id, set by app.js
      // (fall back to a class scan if missing).
      if (!row.dataset.levelId) {
        const cls = [...row.classList].find(c => /^rail-row-(PH|L3|L2|L1|GF)$/.test(c));
        if (cls) row.dataset.levelId = cls.replace('rail-row-', '');
      }
    });
  }

  // ─── Apply saved layout to a single rail row ───
  function applyToRow(row) {
    const side = row.dataset.side;
    const id = row.dataset.levelId;
    if (!side || !id) return;
    const cfg = (layout[side] && layout[side][id]) || {};

    if (cfg.topPct != null) row.style.top = cfg.topPct + '%';
    const dx = cfg.dx || 0;

    if (side === 'left') {
      row.style.transform = `translate(${dx}px, -50%)`;
      row.style.transformOrigin = 'right center';
    } else {
      row.style.transform = `translate(${dx}px, -50%)`;
    }

    if (side === 'right') {
      const caption = row.querySelector('.rail-caption');
      const key = row.querySelector('.rail-key');
      const marker = row.querySelector('.rail-marker');
      if (caption && cfg.captionMax) caption.style.maxWidth = cfg.captionMax + 'px';
      if (key) {
        if (cfg.keyW) { key.style.width = cfg.keyW + 'px'; key.style.flexBasis = cfg.keyW + 'px'; }
        if (cfg.keyH) key.style.height = cfg.keyH + 'px';
      }
      const off = cfg.childOffsets || {};
      if (marker)  marker.style.transform  = `translate(${(off.marker?.x)||0}px, ${(off.marker?.y)||0}px)`;
      if (key)     key.style.transform     = `translate(${(off.key?.x)||0}px, ${(off.key?.y)||0}px)`;
      if (caption) caption.style.transform = `translate(${(off.caption?.x)||0}px, ${(off.caption?.y)||0}px)`;
    }
  }

  function applyAll() {
    tagRows();
    document.querySelectorAll('.rail-row').forEach(applyToRow);
  }

  // Public hook: app.js can call this after re-rendering rails
  window.MV_RAIL_DESIGN = { apply: applyAll };

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(applyAll, 50);
    setTimeout(applyAll, 300);
    setTimeout(applyAll, 800);
  });
})();
