// 社工後台主程式

// 更新頂部日期顯示
function updateHeaderDate() {
  const el = document.getElementById('header-date');
  if (!el) return;
  const now = new Date();
  const opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  el.textContent = now.toLocaleDateString('zh-TW', opts);
}

// Nav 切換（示意：僅顯示點擊狀態，實際頁面路由另設）
function initSidebarNav() {
  const navItems = document.querySelectorAll('.nav-item[data-page]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderDate();
  initSidebarNav();
});
