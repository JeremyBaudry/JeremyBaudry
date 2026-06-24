(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const yearEl = document.getElementById("year");
  const toast = document.getElementById("toast");
  const cvDownload = document.getElementById("cv-download");

  const localLogos = {
    "egis-group.com": "egis.jpg",
    "fnac.com": "fnac.svg",
    "natixis.com": "natixis.jpg",
    "vinci.com": "vinci.png",
    "jacobs.com": "jacobs.png",
    "lapeyre.fr": "lapeyre.png",
    "satam.fr": "satam.png",
    "agap2.com": "agap2.png",
    "neos-sdi": "neos-sdi.png",
    "telelingua.com": "telelingua.png",
    "sogitec.com": "sogitec.png",
    "groupe-la-francaise.fr": "la-francaise.svg",
    "ekaton.fr": "ekaton.png"
  };

  function initCompanyLogo(container) {
    if (container.dataset.logoInit === "1") return;
    container.dataset.logoInit = "1";

    const parent = container.closest("[data-domain], [data-fallback], [data-logo-file]");
    const logoFile = container.dataset.logoFile;
    const domain = container.dataset.domain || (parent && parent.dataset.domain);
    const fallback = container.dataset.fallback || (parent && parent.dataset.fallback) || "?";

    const span = document.createElement("span");
    span.className = "company-logo-fallback";
    span.textContent = fallback;
    span.setAttribute("aria-hidden", "true");
    container.appendChild(span);

    const img = document.createElement("img");
    img.alt = "";
    img.width = 48;
    img.height = 48;
    img.loading = "lazy";

    function showFallback() {
      container.classList.add("is-fallback");
    }

    img.addEventListener("error", function () {
      if (domain && img.dataset.triedClearbit !== "1") {
        img.dataset.triedClearbit = "1";
        img.src = "https://logo.clearbit.com/" + domain;
        return;
      }
      showFallback();
    });

    if (logoFile) {
      img.src = logoFile;
      container.insertBefore(img, span);
    } else if (domain && localLogos[domain]) {
      img.src = "public/logos/" + localLogos[domain];
      container.insertBefore(img, span);
    } else if (domain) {
      img.src = "https://logo.clearbit.com/" + domain;
      container.insertBefore(img, span);
    } else {
      showFallback();
    }
  }

  document.querySelectorAll(".company-logo").forEach(initCompanyLogo);

  document.querySelectorAll(".review-toggle, .malt-review-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const collapsed = target.classList.toggle("is-collapsed");
      btn.setAttribute("aria-expanded", String(!collapsed));
      btn.textContent = collapsed ? "Voir plus" : "Voir moins";
    });
  });

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (new URLSearchParams(window.location.search).get("envoye") === "1" && toast) {
    toast.hidden = false;
    toast.classList.add("show");
    history.replaceState({}, "", window.location.pathname + window.location.hash);
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.hidden = true; }, 400);
    }, 5000);
  }

  if (cvDownload) {
    cvDownload.addEventListener("click", function () {
      if (typeof window.cfBeacon !== "undefined") {
        window.cfBeacon("cv_download");
      }
    });
  }
})();
