// 底部導航共用元件 — 自動依目前頁面設定 active 狀態

(function () {
  const NAV_ITEMS = [
    {
      label: '總覽',
      href: 'index.html',
      icon: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
             <polyline points="9 22 9 12 15 12 15 22"/>`,
    },
    {
      label: '活動',
      href: 'activity.html',
      icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    },
    {
      label: '警報',
      href: 'alerts.html',
      icon: `<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
             <path d="M13.73 21a2 2 0 01-3.46 0"/>`,
    },
    {
      label: '我的',
      href: 'profile.html',
      icon: `<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
             <circle cx="12" cy="7" r="4"/>`,
    },
  ];

  // 取得目前頁面檔名（空字串視為首頁）
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const items = NAV_ITEMS.map(function (item) {
    var isActive = currentPage === item.href ? ' active' : '';
    return [
      '<a class="nav-item' + isActive + '" href="' + item.href + '">',
      '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"',
      '       stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">',
      '    ' + item.icon,
      '  </svg>',
      '  <span>' + item.label + '</span>',
      '</a>',
    ].join('\n');
  }).join('\n');

  var nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = items;
  document.body.appendChild(nav);
})();
