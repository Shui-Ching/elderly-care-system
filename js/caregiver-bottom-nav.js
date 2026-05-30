// 底部導航共用元件 — 自動依目前頁面設定 active 狀態

(function () {
  const NAV_ITEMS = [
    { label: '總覽',  href: 'caregiver.html',          icon: 'bi-house'    },
    { label: '活動',  href: 'caregiver-activity.html', icon: 'bi-activity' },
    { label: '警報',  href: 'caregiver-alerts.html',   icon: 'bi-bell'     },
    { label: '我的',  href: 'caregiver-profile.html',  icon: 'bi-person'   },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'caregiver.html';

  const items = NAV_ITEMS.map(({ label, href, icon }) => {
    const isActive = currentPage === href ? ' active' : '';
    return `
      <a class="nav-item${isActive}" href="${href}">
        <i class="bi ${icon}"></i>
        <span>${label}</span>
      </a>`;
  }).join('');

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = items;
  document.body.appendChild(nav);
})();
