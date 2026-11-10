/* =====================================================
   AezCheck — shared behaviour (i18n, form, dialogs, motion)
   Chỉ cần sửa CONFIG.
   ===================================================== */
var CONFIG = {
  TELEGRAM: "https://t.me/nil_ad01",
  LOGIN: "https://aezcheck.com",
  SHEET_URL: "https://script.google.com/macros/s/AKfycbxLnMUy3SV5zJlLePhuEl0_2ui1Bbrl3L84X_iyb4ErlepOpPJNIV_VXc3YYI_mgXpNXw/exec",
  SITE: "AezCheck",
  EMAIL: "[email liên hệ]"
};

(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = matchMedia("(pointer: fine)").matches;
  var icon = function (n) { return '<svg class="ico"><use href="#i-' + n + '"/></svg>'; };
  var owl = function (c) { return '<svg class="owl ' + (c || "") + '" viewBox="0 0 220 240" aria-hidden="true"><use href="#owl"/></svg>'; };

  /* ---------- i18n ---------- */
  var LANG = window.AZ_LANG || "vi";
  var DICT = (window.AZ_I18N && window.AZ_I18N[LANG]) || null;
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function T(s) { if (!DICT) return s; var k = norm(s); return DICT[k] || s; }
  window.T = T;
  function translate(root) {
    if (!DICT) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (!n.nodeValue.trim() || p === "SCRIPT" || p === "STYLE" || p === "TEXTAREA") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      var v = t.nodeValue, k = norm(v), tr = DICT[k];
      if (tr) t.nodeValue = v.match(/^\s*/)[0] + tr + v.match(/\s*$/)[0];
    });
    ["placeholder", "aria-label", "alt", "title", "data-tip"].forEach(function (a) {
      $$("[" + a + "]", root).forEach(function (el) { var v = el.getAttribute(a), tr = DICT[norm(v)]; if (tr) el.setAttribute(a, tr); });
    });
  }
  function withLang(href) {
    if (LANG === "vi" || !/\.html(#|$)/.test(href) || /^https?:/.test(href)) return href;
    var parts = href.split("#");
    return parts[0] + "?lang=" + LANG + (parts[1] !== undefined ? "#" + parts[1] : "");
  }

  /* ---------- links ---------- */
  function wire(root) {
    $$("[data-tg]", root).forEach(function (a) { a.href = CONFIG.TELEGRAM; a.target = "_blank"; a.rel = "noopener"; });
    $$("[data-login]", root).forEach(function (a) { a.href = CONFIG.LOGIN; a.target = "_blank"; a.rel = "noopener"; });
    $$("[data-policy]", root).forEach(function (a) { a.href = "#chinh-sach"; a.onclick = function (e) { e.preventDefault(); if (pol.showModal) pol.showModal(); }; });
  }

  /* ---------- floating Telegram + mobile bar ---------- */
  document.body.insertAdjacentHTML("beforeend",
    '<a class="tg-fab" data-tg data-tip="Nhắn Telegram" aria-label="Nhắn Telegram">' + icon("send") + '</a>' +
    '<div class="mbar"><a class="btn btn-tg" data-tg aria-label="Nhắn Telegram">' + icon("send") + '</a>' +
    '<a class="btn btn-pri" href="#dang-ky">Đăng ký dùng thử' + icon("arrow") + '</a></div>');

  /* ---------- policy ---------- */
  var pol = document.createElement("dialog");
  pol.className = "policy"; pol.id = "chinh-sach";
  pol.innerHTML =
    '<div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><h2>Chính sách bảo mật</h2><p>Áp dụng cho dữ liệu bạn gửi qua form trên trang này.</p></div>' +
    '<button class="dlg-x" aria-label="Đóng">' + icon("x") + '</button></div>' +
    '<h3>1. Dữ liệu thu thập</h3><ul><li>Họ tên, số điện thoại/Zalo, Telegram, email, tên đơn vị.</li><li>Nhu cầu, quy mô và ghi chú bạn tự nhập.</li><li>Trang bạn gửi form và nguồn truy cập (ví dụ tham số quảng cáo utm).</li></ul>' +
    '<h3>2. Mục đích sử dụng</h3><p>Chỉ để liên hệ tư vấn, gửi báo giá và hỗ trợ cài đặt AezCheck theo yêu cầu của bạn.</p>' +
    '<h3>3. Chia sẻ & lưu trữ</h3><p>Không bán hoặc chia sẻ dữ liệu cho bên thứ ba vì mục đích quảng cáo. Dữ liệu được lưu trên hệ thống nội bộ của đội AezCheck.</p>' +
    '<h3>4. Quyền của bạn</h3><p>Bạn có thể yêu cầu xem, sửa hoặc xoá dữ liệu bất kỳ lúc nào qua Telegram.</p>' +
    '<p style="margin-top:16px;font-size:13px">Facebook là thương hiệu của Meta Platforms, Inc. AezCheck là sản phẩm độc lập.</p>';
  document.body.appendChild(pol);
  $(".dlg-x", pol).addEventListener("click", function () { pol.close(); });

  /* ---------- lightbox ---------- */
  var lb = document.createElement("dialog");
  lb.className = "lb";
  lb.innerHTML = '<img alt=""><div class="lb-cap"><span></span><button class="dlg-x" aria-label="Đóng">' + icon("x") + '</button></div>';
  document.body.appendChild(lb);
  $(".dlg-x", lb).addEventListener("click", function () { lb.close(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest("img[data-zoom]");
    if (!img || !lb.showModal) return;
    $("img", lb).src = img.currentSrc || img.src; $("img", lb).alt = img.alt;
    $("span", lb).textContent = img.alt + " — " + T("ảnh giao diện thật (đã làm mờ thông tin cá nhân)");
    lb.showModal();
  });

  /* ---------- lead modal on sub pages ---------- */
  var hasInline = !!document.getElementById("dang-ky"), leadDlg = null;
  if (!hasInline) {
    leadDlg = document.createElement("dialog");
    leadDlg.className = "lead-dlg"; leadDlg.setAttribute("aria-label", "Đăng ký dùng thử");
    leadDlg.innerHTML = '<div class="top"><div>' + owl() + '<div><h2>Đăng ký dùng thử</h2><p class="s">Đội AezCheck mở workspace và hướng dẫn cài đặt cho bạn.</p></div></div><button class="dlg-x" aria-label="Đóng">' + icon("x") + '</button></div><div data-lead></div>';
    document.body.appendChild(leadDlg);
    $(".dlg-x", leadDlg).addEventListener("click", function () { leadDlg.close(); });
    leadDlg.addEventListener("click", function (e) { if (e.target === leadDlg) leadDlg.close(); });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href="#dang-ky"]');
    if (a && leadDlg && leadDlg.showModal) { e.preventDefault(); leadDlg.showModal(); }
  });

  /* ---------- lead form ---------- */
  var NEEDS = [["trial", "Dùng thử"], ["demo", "Demo 1-1"], ["quote", "Nhận báo giá"], ["partner", "Hợp tác / đại lý"]];
  var MODS = ["Tài sản", "Tài chính & thẻ", "Khách hàng thuê tài khoản quảng cáo", "Shield & Admin Business Manager", "Phân quyền"];
  function formHTML(id) {
    return '<form class="lead" id="' + id + '" novalidate>' +
      '<div class="row2"><label class="fld"><span>Họ và tên<em>*</em></span><input name="name" autocomplete="name" placeholder="Nguyễn Văn A" maxlength="80"></label>' +
      '<label class="fld"><span>Số điện thoại / Zalo<em>*</em></span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="09xx xxx xxx" maxlength="20"></label></div>' +
      '<div class="row2"><label class="fld"><span>Telegram</span><input name="telegram" placeholder="@username" maxlength="40"></label>' +
      '<label class="fld"><span>Tên agency / công ty</span><input name="company" autocomplete="organization" placeholder="ABC Media" maxlength="80"></label></div>' +
      '<fieldset class="fld"><legend>Bạn cần gì?<em>*</em></legend><div class="chips" data-need>' +
        NEEDS.map(function (n) { return '<label><input type="radio" name="need" value="' + n[0] + '"><span>' + n[1] + '</span></label>'; }).join("") + '</div></fieldset>' +
      '<div class="row2"><label class="fld"><span>Số tài khoản quảng cáo đang quản lý</span><select name="scale"><option value="">— Chọn —</option><option value="Dưới 100">Dưới 100</option><option value="100 – 1.000">100 – 1.000</option><option value="1.000 – 10.000">1.000 – 10.000</option><option value="Trên 10.000">Trên 10.000</option></select></label>' +
      '<label class="fld"><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="ban@congty.com" maxlength="80"></label></div>' +
      '<fieldset class="fld"><legend>Phân hệ quan tâm</legend><div class="chips">' +
        MODS.map(function (m) { return '<label><input type="checkbox" name="modules" value="' + m + '"><span>' + m + '</span></label>'; }).join("") + '</div></fieldset>' +
      '<label class="fld"><span>Ghi chú</span><textarea name="note" rows="2" maxlength="600" placeholder="Ví dụ: đang quản lý 3 workspace cho thuê tài khoản quảng cáo, cần đối soát bill hằng ngày"></textarea></label>' +
      '<label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<label class="consent"><input type="checkbox" name="consent"><span>Tôi đồng ý để AezCheck liên hệ tư vấn theo <a data-policy>Chính sách bảo mật</a>.</span></label>' +
      '<p class="msg" role="status" aria-live="polite"></p>' +
      '<button class="btn btn-pri" type="submit" data-mag><span>Gửi đăng ký</span>' + icon("arrow") + '</button>' +
      '</form>' +
      '<div class="lead-ok" hidden tabindex="-1">' + owl() +
      '<h3>Đã nhận đăng ký!</h3><p>Aezo đã chuyển thông tin cho đội AezCheck. Bạn sẽ được liên hệ qua kênh đã để lại. Muốn nhanh hơn, nhắn Telegram ngay.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn btn-tg" data-tg>' + icon("send") + 'Nhắn Telegram</a><button class="btn btn-ghost" type="button" data-again>Gửi đăng ký khác</button></div></div>';
  }
  $$("[data-lead]").forEach(function (box, k) {
    box.innerHTML = formHTML("lead-" + k);
    var form = $("form", box), ok = $(".lead-ok", box), msg = $(".msg", form), btn = $("button[type=submit]", form);
    function say(t) { msg.className = "msg" + (t ? " err" : ""); msg.innerHTML = t || ""; wire(msg); }
    form.addEventListener("input", function (e) { var c = e.target.closest(".chips,.consent"); e.target.classList.remove("bad"); if (c) c.classList.remove("bad"); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, first = null, err = "";
      $$(".bad", form).forEach(function (x) { x.classList.remove("bad"); });
      function fail(el, t) { el.classList.add("bad"); if (!first) { first = el; err = t; } }
      if (f.name.value.trim().length < 2) fail(f.name, T("Vui lòng nhập họ tên."));
      var d = f.phone.value.replace(/\D/g, "");
      if (d.length < 8 || d.length > 15) fail(f.phone, T("Số điện thoại chưa đúng (8–15 chữ số)."));
      if (f.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim())) fail(f.email, T("Email chưa đúng định dạng."));
      if (!$('input[name="need"]:checked', form)) fail($("[data-need]", form), T("Vui lòng chọn nhu cầu."));
      if (!f.consent.checked) fail(f.consent.closest(".consent"), T("Vui lòng tích đồng ý để chúng tôi liên hệ."));
      if (first) { say(err); var fe = first.matches("input,select,textarea") ? first : $("input", first); if (fe) fe.focus(); return; }
      if (f.website.value) return;
      var tgLink = ' <a data-tg>' + T("nhắn Telegram") + '</a>.';
      if (!CONFIG.SHEET_URL) { say(T("Form chưa kết nối Google Sheet. Vui lòng") + tgLink); return; }
      var q = new URLSearchParams(location.search);
      var data = {
        name: f.name.value.trim(), phone: f.phone.value.trim(), telegram: f.telegram.value.trim(), company: f.company.value.trim(),
        need: ($('input[name="need"]:checked', form) || {}).value, scale: f.scale.value, email: f.email.value.trim(),
        modules: $$('input[name="modules"]:checked', form).map(function (x) { return x.value; }).join(", "),
        note: f.note.value.trim(), site: CONFIG.SITE,
        page: (location.pathname.split("/").pop() || "index.html") + " · " + LANG.toUpperCase(),
        source: q.get("utm_source") || document.referrer || "direct", campaign: q.get("utm_campaign") || ""
      };
      btn.disabled = true; $("span", btn).textContent = T("Đang gửi…"); say("");
      fetch(CONFIG.SHEET_URL, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) })
                .then(function () { if (window.fbq) { fbq('track', 'Lead'); fbq('track', 'CompleteRegistration'); } form.hidden = true; ok.hidden = false; wire(ok); ok.focus({ preventScroll: true }); })
        .catch(function () { say(T("Gửi chưa thành công. Thử lại hoặc") + tgLink); })
        .then(function () { btn.disabled = false; $("span", btn).textContent = T("Gửi đăng ký"); });
    });
    $("[data-again]", ok).addEventListener("click", function () { form.reset(); ok.hidden = true; form.hidden = false; say(""); });
  });

  /* ---------- apply language ---------- */
  translate(document.body);
  if (DICT) { document.title = T(document.title); var md = $('meta[name="description"]'); if (md) md.content = T(md.content); }
  document.documentElement.classList.remove("tr-wait");
  $$("a[href]").forEach(function (a) { var h = a.getAttribute("href"); var n = withLang(h); if (n !== h) a.setAttribute("href", n); });
  var NAMES = { vi: "Tiếng Việt", en: "English", ru: "Русский" };
  $$(".lang-cur").forEach(function (s) { s.textContent = NAMES[LANG]; });
  $$(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function (e) { e.stopPropagation(); var o = b.getAttribute("aria-expanded") !== "true"; b.setAttribute("aria-expanded", o); b.parentNode.classList.toggle("open", o); });
  });
  document.addEventListener("click", function () { $$(".lang.open").forEach(function (l) { l.classList.remove("open"); $(".lang-btn", l).setAttribute("aria-expanded", false); }); });
  $$(".lang button[data-l]").forEach(function (b) {
    b.setAttribute("aria-pressed", b.dataset.l === LANG);
    b.addEventListener("click", function () {
      var l = b.dataset.l; try { localStorage.setItem("az-lang", l); } catch (e) {}
      var u = new URL(location.href); if (l === "vi") u.searchParams.delete("lang"); else u.searchParams.set("lang", l);
      location.href = u.toString();
    });
  });
  wire(document);

  /* ---------- nav ---------- */
  var pg = document.body.getAttribute("data-page");
  $$("[data-nav]").forEach(function (a) { if (a.getAttribute("data-nav") === pg) a.setAttribute("aria-current", "page"); });
  $$("[data-menu-btn]").forEach(function (b) {
    var m = $(b.getAttribute("data-menu-btn"));
    b.addEventListener("click", function () { var o = b.getAttribute("aria-expanded") !== "true"; b.setAttribute("aria-expanded", o); m.classList.toggle("open", o); });
  });

  /* ---------- scramble text ---------- */
  var GLYPH = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+";
  function scramble(el) {
    var final = el.textContent, len = final.length, f = 0, total = 26;
    (function tick() {
      var out = "";
      for (var i = 0; i < len; i++) {
        var ch = final[i];
        out += (ch === " " || i < (f / total) * len) ? ch : GLYPH[(Math.random() * GLYPH.length) | 0];
      }
      el.textContent = out;
      if (++f <= total) requestAnimationFrame(tick); else el.textContent = final;
    })();
  }

  /* ---------- reveal ---------- */
  $$("[data-stagger]").forEach(function (g) { [].slice.call(g.children).forEach(function (c, i) { c.style.setProperty("--i", i); }); });
  var targets = $$(".rv,.wipe,[data-stagger],.grad,[data-scramble]");
  if (REDUCED || !("IntersectionObserver" in window)) targets.forEach(function (e) { e.classList.add("in"); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in"); io.unobserve(e.target);
        if (e.target.hasAttribute("data-scramble")) scramble(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (e) { io.observe(e); });
  }

  /* safety: anything still hidden after 2.5s or reached by anchor gets shown */
  var showAll = function (root) { $$(".rv,.wipe,[data-stagger],.grad", root).forEach(function (e) { e.classList.add("in"); }); };
  addEventListener("hashchange", function () { var t = document.getElementById(location.hash.slice(1)); if (t) showAll(t); });
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return; var t = document.getElementById(a.getAttribute("href").slice(1)); if (t) showAll(t); });
  setTimeout(function () { $$(".rv,.wipe,[data-stagger]").forEach(function (e) { var r = e.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) e.classList.add("in"); }); }, 2500);

  /* ---------- spotlight cards + magnetic buttons ---------- */
  if (FINE && !REDUCED) {
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".spot");
      if (c) { var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px"); }
    }, { passive: true });
    $$("[data-mag]").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        b.style.transform = "translate(" + (x * .18).toFixed(1) + "px," + (y * .3).toFixed(1) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
      b.addEventListener("pointerenter", function () { document.body.classList.add("alert-mode"); });
      b.addEventListener("pointerleave", function () { document.body.classList.remove("alert-mode"); });
    });
    /* owl head follows the pointer */
    var raf = 0, px = innerWidth / 2;
    addEventListener("pointermove", function (e) { px = e.clientX; if (!raf) raf = requestAnimationFrame(turn); }, { passive: true });
    function turn() {
      raf = 0;
      $$("svg.owl").forEach(function (o) {
        var r = o.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
        var dx = (px - (r.left + r.width / 2)) / innerWidth;
        o.style.setProperty("--hr", Math.max(-14, Math.min(14, dx * 34)).toFixed(1) + "deg");
      });
    }
  }

  /* ---------- constellation canvas ---------- */
  $$("canvas.net").forEach(function (cv) {
    if (REDUCED) return;
    var ctx = cv.getContext("2d"), pts = [], W, H, mx = -999, my = -999, dpr = Math.min(devicePixelRatio || 1, 2), vis = true;
    function size() {
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, W * H / 16000)); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, g: Math.random() < .18 });
    }
    size(); addEventListener("resize", size);
    cv.parentElement.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    cv.parentElement.addEventListener("pointerleave", function () { mx = my = -999; });
    new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(cv);
    (function draw() {
      requestAnimationFrame(draw); if (!vis) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        var dmx = p.x - mx, dmy = p.y - my, dm = Math.hypot(dmx, dmy);
        if (dm < 120) { p.x += dmx / dm * .8; p.y += dmy / dm * .8; }
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) { ctx.strokeStyle = "rgba(120,255,190," + (0.17 * (1 - d / 130)) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        ctx.fillStyle = p.g ? "rgba(52,227,160,.9)" : "rgba(170,255,215,.5)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.g ? 2.2 : 1.4, 0, 6.3); ctx.fill();
      }
    })();
  });

  /* ---------- sub-nav: sliding pill + scroll spy ---------- */
  $$("[data-spy]").forEach(function (nav) {
    var bar = $(".bar", nav), links = $$("a[href*='#']", nav), pill = document.createElement("span");
    pill.className = "pill"; bar.insertBefore(pill, bar.firstChild);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").split("#")[1]); });
    var cur = -1;
    function upd() {
      var y = innerHeight * .35, c = 0;
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < y) c = i; });
      if (c === cur) return; cur = c;
      links.forEach(function (a, i) { a.classList.toggle("on", i === c); });
      var a = links[c]; pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px";
      bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.offsetWidth / 2, behavior: REDUCED ? "auto" : "smooth" });
    }
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", function () { cur = -1; upd(); }); upd();
  });

  /* ---------- stacking cards depth ---------- */
  var cards = $$(".pcard");
  if (cards.length && !REDUCED) {
    var onS = function () {
      cards.forEach(function (c, i) {
        var nx = cards[i + 1]; if (!nx) { c.style.transform = ""; c.style.filter = ""; return; }
        var a = c.getBoundingClientRect(), b = nx.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, 1 - (b.top - a.top) / a.height));
        c.style.transform = "scale(" + (1 - p * .05).toFixed(3) + ")"; c.style.filter = "brightness(" + (1 - p * .35).toFixed(2) + ")";
      });
    };
    addEventListener("scroll", onS, { passive: true }); onS();
  }


  /* ---------- Aezo talks ---------- */
  var oh = $("#owlHero");
  if (oh) {
    var say = $(".owl-say", oh), btn = $(".owl-btn", oh);
    var LINES = [T("Xin chào, mình là Aezo!"), T("Mình đang canh tài khoản cho bạn…"), T("Có admin lạ? Để mình xử lý!"), T("Bấm vào mình thử xem!")];
    var li = 0, busy = false;
    var talk = function (txt, cls) { say.classList.add("swap"); setTimeout(function () { say.textContent = txt; say.className = "owl-say" + (cls ? " " + cls : ""); }, 250); };
    if (!REDUCED) setInterval(function () { if (busy) return; li = (li + 1) % LINES.length; talk(LINES[li]); }, 4200);
    btn.addEventListener("click", function () { btn.classList.remove("poke"); void btn.offsetWidth; btn.classList.add("poke"); talk(T("Hú hú! Kiểm soát toàn bộ hệ thống quảng cáo!")); });
    window.AZ_OWL = function (state) {
      busy = true;
      if (state === "alarm") { btn.classList.add("alarm"); talk(T("Phát hiện admin lạ!"), "alarm"); setTimeout(function () { btn.classList.remove("alarm"); }, 1600); }
      else { talk(T("Đã xử lý xong!"), "ok"); setTimeout(function () { busy = false; }, 2200); }
    };
  }

  /* ---------- hero live console ---------- */
  var con = $("#console");
  if (con) {
    var rows = $$(".c-row", con), alertBox = $(".c-alert", con);
    var STATES = [["ok", T("Hoạt động")], ["warn", T("Unsettled")], ["info", T("Đang xét duyệt")], ["bad", T("Vô hiệu hoá")]];
    var k = 0;
    var step = function () {
      var r = rows[k % rows.length], st = $(".st", r), s = STATES[(Math.random() * STATES.length) | 0];
      st.className = "st " + s[0]; st.textContent = s[1];
      r.classList.add("flash"); setTimeout(function () { r.classList.remove("flash"); }, 900);
      if (k % 4 === 1) {
        alertBox.classList.remove("done"); $("b", alertBox).textContent = T("Phát hiện admin lạ trong Business Manager"); $("small", alertBox).textContent = T("Business Manager Agency A · đang xử lý…");
        $(".ic", alertBox).innerHTML = icon("alert"); alertBox.classList.add("on"); if (window.AZ_OWL) window.AZ_OWL("alarm");
        setTimeout(function () { alertBox.classList.add("done"); $("b", alertBox).textContent = T("Đã hạ quyền admin lạ"); $("small", alertBox).textContent = T("Theo cấu hình tự động · vừa xong"); $(".ic", alertBox).innerHTML = icon("check"); if (window.AZ_OWL) window.AZ_OWL("ok"); }, 1800);
        setTimeout(function () { alertBox.classList.remove("on"); }, 4200);
      }
      k++;
    };
    if (!REDUCED) setInterval(step, 1600);
  }
})();
