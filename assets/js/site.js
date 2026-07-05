/* ============================================================
   site.js: shared chrome for every page
   Header + footer are defined ONCE here and injected into each
   page, so navigation is edited in a single place.
   Works over file:// and https:// (no fetch needed).
   ============================================================ */
(function () {
  "use strict";

  // Kaggle competition URL: update once here when the page goes live.
  var KAGGLE_URL = "https://www.kaggle.com/";

  var PAGES = [
    { href: "index.html",       label: "About" },
    { href: "competition.html", label: "Competition" },
    { href: "rules.html",       label: "Rules" },
    { href: "submission.html",  label: "Submission" },
    { href: "scoring.html",     label: "Scoring" },
    { href: "organizers.html",  label: "Organizers" }
  ];

  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (current === "") current = "index.html";

  var MARK =
    '<svg class="brand__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
      '<rect x="2" y="2" width="28" height="28" rx="7" fill="#0c2544"/>' +
      '<path d="M8 21V13l4-3 4 3v8" stroke="#45c8ea" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M16 21v-6l4-3 4 3v6" stroke="#f4a94b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<line x1="8" y1="24" x2="24" y2="24" stroke="#7688a3" stroke-width="1.6" stroke-linecap="round"/>' +
    '</svg>';

  var links = PAGES.map(function (p) {
    var active = p.href.toLowerCase() === current ? ' class="active"' : "";
    return '<a href="' + p.href + '"' + active + '>' + p.label + "</a>";
  }).join("");

  var header =
    '<header class="site-header"><div class="wrap"><nav class="nav" aria-label="Primary">' +
      '<a class="brand" href="index.html">' + MARK +
        '<span class="brand__name">Smart Buildings Competition' +
          "<small>NeurIPS 2026 &middot; Competition Track</small></span></a>" +
      '<button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false"><span></span></button>' +
      '<div class="nav__links">' + links +
        '<a class="nav__cta" href="' + KAGGLE_URL + '" target="_blank" rel="noopener">Join on Kaggle</a>' +
      "</div>" +
    "</nav></div></header>";

  var footerLinks = PAGES.map(function (p) {
    return '<a href="' + p.href + '">' + p.label + "</a>";
  }).join("");

  var footer =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div><h4>The Competition</h4>' +
          '<p class="footer-lede">A NeurIPS 2026 challenge to build one HVAC control policy that generalizes across unseen commercial buildings, scaling ML-driven building optimization toward global decarbonization.</p></div>' +
        '<div><h4>Pages</h4>' + footerLinks + "</div>" +
        '<div><h4>Contact</h4>' +
          '<a href="mailto:jag2396@columbia.edu">Judah Goldfeder &middot; Columbia</a>' +
          '<a href="mailto:ayush_rai@seas.harvard.edu">Ayush Rai &middot; Harvard</a>' +
          '<a href="' + KAGGLE_URL + '" target="_blank" rel="noopener">Kaggle discussion board</a>' +
        "</div>" +
      "</div>" +
      '<hr class="spectrum-rule" style="opacity:.5;margin-bottom:22px">' +
      '<div class="footer-bar">' +
        "<span>&copy; 2026 Smart Buildings Competition Organizers</span>" +
        "<span>Presented at NeurIPS 2026 &middot; Competition Track</span>" +
      "</div>" +
    "</div></footer>";

  // Inject
  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Mobile toggle
  var toggle = document.querySelector(".nav__toggle");
  var linksEl = document.querySelector(".nav__links");
  if (toggle && linksEl) {
    toggle.addEventListener("click", function () {
      var open = linksEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll reveal (fail-safe: content stays visible if anything goes wrong)
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    document.documentElement.classList.add("reveal-js");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(function () { reveals.forEach(function (el) { el.classList.add("in"); }); }, 2500);
  }

  // Sub-nav active-section highlighting (pages that have .subnav)
  var subnav = document.querySelector(".subnav");
  if (subnav) {
    var subLinks = Array.prototype.slice.call(subnav.querySelectorAll("a"));
    var targets = subLinks
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if ("IntersectionObserver" in window && targets.length) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            subLinks.forEach(function (a) { a.classList.remove("active"); });
            var active = subnav.querySelector('a[href="#' + e.target.id + '"]');
            if (active) active.classList.add("active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      targets.forEach(function (t) { so.observe(t); });
    }
  }
})();
