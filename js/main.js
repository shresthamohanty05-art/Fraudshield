/**
 * FraudShield — application shell & shared UI behavior
 */

(function () {
  "use strict";

  const ICONS = {
    shield: "assets/icons/shield.svg",
    dashboard: "assets/icons/dashboard.svg",
    transactions: "assets/icons/transactions.svg",
    alerts: "assets/icons/alerts.svg",
    analytics: "assets/icons/analytics.svg",
    reports: "assets/icons/reports.svg",
    settings: "assets/icons/settings.svg",
    search: "assets/icons/search.svg",
    bell: "assets/icons/bell.svg",
    menu: "assets/icons/menu.svg",
    close: "assets/icons/close.svg",
  };

  /**
   * Resolve asset paths for pages in root vs pages/ subdirectory.
   * @param {string} path
   * @returns {string}
   */
  function resolvePath(path) {
    const inPagesDir = window.location.pathname.includes("/pages/");
    return inPagesDir ? "../" + path : path;
  }

  /**
   * Get the current page identifier from body data attribute or URL.
   * @returns {string}
   */
  function getCurrentPageId() {
    const fromBody = document.body.dataset.page;
    if (fromBody) return fromBody;

    const filename = window.location.pathname.split("/").pop() || "index.html";
    const map = {
      "index.html": "home",
      "dashboard.html": "dashboard",
      "transactions.html": "transactions",
      "alerts.html": "alerts",
      "analytics.html": "analytics",
      "reports.html": "reports",
      "settings.html": "settings",
    };
    return map[filename] || "";
  }

  /**
   * Initialize mobile sidebar open/close behavior.
   */
  function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");
    const menuBtn = document.querySelector(".header__menu-btn");
    const closeBtn = document.querySelector(".sidebar__close-btn");

    if (!sidebar || !menuBtn) return;

    function openSidebar() {
      sidebar.classList.add("sidebar--open");
      overlay?.classList.add("sidebar-overlay--visible");
      document.body.classList.add("sidebar-open");
      menuBtn.setAttribute("aria-expanded", "true");
    }

    function closeSidebar() {
      sidebar.classList.remove("sidebar--open");
      overlay?.classList.remove("sidebar-overlay--visible");
      document.body.classList.remove("sidebar-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }

    function toggleSidebar() {
      if (sidebar.classList.contains("sidebar--open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    menuBtn.addEventListener("click", toggleSidebar);
    closeBtn?.addEventListener("click", closeSidebar);
    overlay?.addEventListener("click", closeSidebar);

    sidebar.querySelectorAll(".sidebar__link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          closeSidebar();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.classList.contains("sidebar--open")) {
        closeSidebar();
      }
    });
  }

  /**
   * Highlight the active sidebar link for the current page.
   */
  function setActiveNavigation() {
    const currentPage = getCurrentPageId();
    if (!currentPage) return;

    document.querySelectorAll(".sidebar__link").forEach((link) => {
      const linkPage = link.dataset.page;
      link.classList.toggle("sidebar__link--active", linkPage === currentPage);
    });
  }

  /**
   * Build sidebar navigation from mock data if nav container exists.
   */
  function renderNavigation() {
    const navContainer = document.querySelector("[data-nav-render]");
    if (!navContainer || !window.FraudShieldMockData) return;

    const { navigation } = FraudShieldMockData;
    const currentPage = getCurrentPageId();
    let html = "";

    navigation.forEach((section) => {
      html += `<p class="sidebar__section-label">${section.section}</p><ul role="list">`;

      section.items.forEach((item) => {
        const isActive = item.id === currentPage;
        const iconPath = resolvePath(ICONS[item.icon] || ICONS.dashboard);
        const href = resolvePath(item.href);
        const badge = item.badge
          ? `<span class="badge badge--high-risk" style="margin-left:auto">${item.badge}</span>`
          : "";

        html += `
          <li>
            <a href="${href}"
               class="sidebar__link${isActive ? " sidebar__link--active" : ""}"
               data-page="${item.id}">
              <img src="${iconPath}" alt="" class="sidebar__link-icon" width="20" height="20">
              <span>${item.label}</span>
              ${badge}
            </a>
          </li>`;
      });

      html += "</ul>";
    });

    navContainer.innerHTML = html;
  }

  /**
   * Populate user info in sidebar footer from mock data.
   */
  function renderUserInfo() {
    const userContainer = document.querySelector("[data-user-render]");
    if (!userContainer || !window.FraudShieldMockData) return;

    const user = FraudShieldMockData.currentUser;
    userContainer.innerHTML = `
      <div class="sidebar__user">
        <div class="sidebar__avatar" aria-hidden="true">${user.initials}</div>
        <div class="sidebar__user-info">
          <p class="sidebar__user-name">${user.name}</p>
          <p class="sidebar__user-role">${user.role}</p>
        </div>
      </div>`;
  }

  /**
   * Initialize dropdown toggle behavior.
   */
  function initDropdowns() {
    document.querySelectorAll("[data-dropdown]").forEach((trigger) => {
      const parent = trigger.closest(".dropdown");
      if (!parent) return;

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = parent.classList.contains("dropdown--open");

        document.querySelectorAll(".dropdown--open").forEach((el) => {
          el.classList.remove("dropdown--open");
        });

        if (!isOpen) {
          parent.classList.add("dropdown--open");
        }
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown--open").forEach((el) => {
        el.classList.remove("dropdown--open");
      });
    });
  }

  /**
   * Initialize tab switching for elements with data-tabs.
   */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((tabGroup) => {
      const tabs = tabGroup.querySelectorAll(".tab");
      const panels = tabGroup.querySelectorAll("[data-tab-panel]");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const target = tab.dataset.tab;

          tabs.forEach((t) => t.classList.toggle("tab--active", t === tab));
          panels.forEach((panel) => {
            panel.hidden = panel.dataset.tabPanel !== target;
          });
        });
      });
    });
  }

  /**
   * Fix relative paths for icons/images in static HTML when in pages/ dir.
   */
  function fixAssetPaths() {
    if (!window.location.pathname.includes("/pages/")) return;

    document.querySelectorAll("[src^='assets/']").forEach((el) => {
      el.src = resolvePath(el.getAttribute("src"));
    });

    document.querySelectorAll("[href^='assets/']").forEach((el) => {
      el.href = resolvePath(el.getAttribute("href"));
    });
  }

  /**
   * Main entry point — run on DOM ready.
   */
  function init() {
    fixAssetPaths();
    renderNavigation();
    renderUserInfo();
    setActiveNavigation();
    initSidebar();
    initDropdowns();
    initTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.FraudShieldApp = {
    resolvePath,
    getCurrentPageId,
    init,
  };
})();
