/* AezCheck — icon sprite + mascot "Aezo" (cú mèo). Injected once per page. */
(function () {
  var I = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var icons = {
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-up-right": '<path d="M7 17 17 7M8 7h9v9"/>',
    "check": '<path d="m5 12 4.5 4.5L19 7"/>',
    "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.2 2.5 2.5 4.6-5"/>',
    "x": '<path d="M6 6l12 12M18 6 6 18"/>',
    "x-circle": '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "shield": '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    "dashboard": '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    "wallet": '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M17 13h.01"/>',
    "layers": '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    "megaphone": '<path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2z"/><path d="M16 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    "card": '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 20a6.5 6.5 0 0 0-3-5.5"/>',
    "key": '<circle cx="7.5" cy="15.5" r="4"/><path d="m10.5 12.5 9-9M16 6l3 3M14 8l2 2"/>',
    "alert": '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
    "currency": '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.6-3.2-1.6M12 6v2M12 16v2"/>',
    "tag": '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    "history": '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    "download": '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    "send": '<path d="M21 3 3 10.5l7 3 3 7z"/><path d="m10 13.5 11-10.5"/>',
    "login": '<path d="M10 17l5-5-5-5M15 12H3M15 3h5v18h-5"/>',
    "play": '<path d="M7 4v16l13-8z"/>',
    "refresh": '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    "lock": '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    "building": '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    "page": '<path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "chev": '<path d="m6 9 6 6 6-6"/>',
    "chev-right": '<path d="m9 6 6 6-6 6"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    "phone": '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    "zap": '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    "bell": '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 0 0 4 0"/>',
    "filter": '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    "file": '<path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5"/>',
    "chart": '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    "sliders": '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    "puzzle": '<path d="M8 3h3a2 2 0 1 1 4 0h3v5a2 2 0 1 1 0 4v6h-5a2 2 0 1 0-4 0H4v-5a2 2 0 1 0 0-4V3z"/>',
    "ban": '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
    "pause": '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
    "arrow-down": '<path d="M12 5v14M6 13l6 6 6-6"/>',
    "sparkle": '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>'
  };
  var sym = Object.keys(icons).map(function (k) {
    return '<symbol id="i-' + k + '" viewBox="0 0 24 24" ' + I + '>' + icons[k] + '</symbol>';
  }).join("");

  /* ---------- Mascot: Aezo the owl (viewBox 0 0 220 240) ---------- */
  var mascot =
  '<linearGradient id="owBody" x1="0" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#34E3A0"/><stop offset=".5" stop-color="#12B47A"/><stop offset="1" stop-color="#0A6B52"/></linearGradient>' +
  '<linearGradient id="owHead" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3EEAA8"/><stop offset="1" stop-color="#0F9E6C"/></linearGradient>' +
  '<radialGradient id="owIris" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FFE38A"/><stop offset=".7" stop-color="#FFB72B"/><stop offset="1" stop-color="#E58A00"/></radialGradient>' +
  '<symbol id="owl" viewBox="0 0 220 240">' +
    '<ellipse cx="110" cy="232" rx="54" ry="6" fill="#020814" opacity=".35"/>' +
    '<g class="ow-all">' +
      /* wings */
      '<g class="ow-wingL"><path d="M58 118C34 128 26 168 42 200C58 190 66 156 66 128Z" fill="#0A6B52" stroke="#064734" stroke-width="3" stroke-linejoin="round"/><path d="M46 160c4 6 6 14 6 22M52 140c3 6 5 13 5 20" stroke="#18C485" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/></g>' +
      '<g class="ow-wingR"><path d="M162 118C186 128 194 168 178 200C162 190 154 156 154 128Z" fill="#0A6B52" stroke="#064734" stroke-width="3" stroke-linejoin="round"/><path d="M174 160c-4 6-6 14-6 22M168 140c-3 6-5 13-5 20" stroke="#18C485" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/></g>' +
      /* body */
      '<path d="M110 70C152 70 172 104 172 148C172 196 146 222 110 222C74 222 48 196 48 148C48 104 68 70 110 70Z" fill="url(#owBody)" stroke="#064734" stroke-width="3.5"/>' +
      '<path d="M110 128C138 128 150 150 150 176C150 202 132 214 110 214C88 214 70 202 70 176C70 150 82 128 110 128Z" fill="#E4FFF3"/>' +
      '<g fill="none" stroke="#7DD8B4" stroke-width="2.6" stroke-linecap="round"><path d="M88 156l6 5 6-5M104 156l6 5 6-5M120 156l6 5 6-5M80 174l6 5 6-5M96 174l6 5 6-5M112 174l6 5 6-5M128 174l6 5 6-5M90 192l6 5 6-5M106 192l6 5 6-5M122 192l6 5 6-5"/></g>' +
      /* feet */
      '<g fill="#F5A524" stroke="#9A5B00" stroke-width="2.5"><path d="M86 216c0 8 4 12 8 12s6-4 6-10M100 218c0 8 4 10 8 10"/><path d="M134 216c0 8-4 12-8 12s-6-4-6-10M120 218c0 8-4 10-8 10"/></g>' +
      /* head */
      '<g class="ow-head">' +
        '<path class="ow-tuftL" d="M62 70L50 26L90 52Z" fill="#0A6B52" stroke="#064734" stroke-width="3" stroke-linejoin="round"/>' +
        '<path class="ow-tuftR" d="M158 70L170 26L130 52Z" fill="#0A6B52" stroke="#064734" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M110 38C150 38 174 62 174 96C174 128 146 146 110 146C74 146 46 128 46 96C46 62 70 38 110 38Z" fill="url(#owHead)" stroke="#064734" stroke-width="3.5"/>' +
        '<path d="M110 60C96 52 66 56 60 84C54 112 76 128 96 124C104 122 110 114 110 106C110 114 116 122 124 124C144 128 166 112 160 84C154 56 124 52 110 60Z" fill="#EFFFF8" stroke="#064734" stroke-width="3"/>' +
        '<g class="ow-eye"><circle cx="86" cy="92" r="18" fill="url(#owIris)" stroke="#7A4A00" stroke-width="2"/><circle class="ow-pupil" cx="86" cy="92" r="9.5" fill="#0B1424"/><circle cx="90" cy="87" r="3.6" fill="#fff"/></g>' +
        '<g class="ow-eye"><circle cx="134" cy="92" r="18" fill="url(#owIris)" stroke="#7A4A00" stroke-width="2"/><circle class="ow-pupil" cx="134" cy="92" r="9.5" fill="#0B1424"/><circle cx="138" cy="87" r="3.6" fill="#fff"/></g>' +
        '<path d="M70 64Q85 54 100 62M120 62Q135 54 150 64" fill="none" stroke="#064734" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M110 104L100 116Q110 130 120 116Z" fill="#F5A524" stroke="#9A5B00" stroke-width="2.5" stroke-linejoin="round"/>' +
      '</g>' +
      /* chest badge */
      '<g class="ow-badge"><circle cx="110" cy="146" r="13" fill="#0B1424" stroke="#E4FFF3" stroke-width="3"/><path d="M104 146l4 4 8-9" fill="none" stroke="#34E3A0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '</g>' +
  '</symbol>';

  var holder = document.createElement("div");
  holder.setAttribute("aria-hidden", "true");
  holder.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  holder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><defs>' + mascot + sym + '</defs></svg>';
  document.body.insertBefore(holder, document.body.firstChild);
})();
