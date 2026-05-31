// 管理員後台主程式

// ─── 面板標題對應表 ───────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: '系統總覽',
  rules:     '警報規則設定',
  accounts:  '帳號管理',
  devices:   '裝置管理',
  logs:      '系統日誌',
};

// ─── 頂部標題更新 ─────────────────────────────────────────────────
function updateHeaderTitle(page) {
  const el = document.querySelector('.header-page-title');
  if (el) el.textContent = PAGE_TITLES[page] || page;
}

// ─── 頂部日期 ─────────────────────────────────────────────────────
function updateHeaderDate() {
  const el = document.getElementById('header-date');
  if (!el) return;
  const now = new Date();
  const opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  el.textContent = now.toLocaleDateString('zh-TW', opts);
}

// ─── 面板切換 ─────────────────────────────────────────────────────
function initSidebarNav() {
  const navItems = document.querySelectorAll('.nav-item[data-page]');
  const panels   = document.querySelectorAll('.page-panel[data-panel]');

  function showPage(page) {
    navItems.forEach(n => n.classList.toggle('active', n.dataset.page === page));
    panels.forEach(p => {
      p.hidden = p.dataset.panel !== page;
    });
    updateHeaderTitle(page);
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(item.dataset.page);
    });
  });

  // 儀表板快速跳轉連結（如「查看全部」日誌）
  document.querySelectorAll('[data-go-page]').forEach(el => {
    el.addEventListener('click', () => {
      showPage(el.dataset.goPage);
    });
  });

  showPage('dashboard');
}

// ─── 篩選 Tab 切換（通用）────────────────────────────────────────
function initFilterTabs() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const tabs = group.querySelectorAll('[data-filter]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

// ─── 警報規則 Toggle 狀態視覺更新 ────────────────────────────────
function initRuleToggles() {
  document.querySelectorAll('.rule-card .toggle-input').forEach(input => {
    const card = input.closest('.rule-card');
    if (!card) return;

    function syncCardState() {
      card.style.opacity = input.checked ? '1' : '0.5';
    }

    syncCardState();
    input.addEventListener('change', syncCardState);
  });
}

// ─── 系統時鐘（header 更新）──────────────────────────────────────
function startClock() {
  updateHeaderDate();
}

// ─── 初始化 ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  startClock();
  initSidebarNav();
  initFilterTabs();
  initRuleToggles();
});
