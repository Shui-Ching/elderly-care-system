// 社工後台主程式

// ─── 面板標題對應表 ───────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: '總覽儀表板',
  elders:    '我的長者',
  alerts:    '警報中心',
  visits:    '探訪紀錄',
  reports:   '月報產出',
  settings:  '系統設定',
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
  const panels   = document.querySelectorAll('.page-panel');

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

  // 初始顯示 dashboard
  showPage('dashboard');
}

// ─── 篩選 Tab 切換（通用）────────────────────────────────────────
function initFilterTabs() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const tabs = group.querySelectorAll('[data-filter]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active', 'active-danger', 'active-warn', 'active-ok'));
        const cls = tab.dataset.filterClass || 'active';
        tab.classList.add(cls);
      });
    });
  });
}

// ─── 月曆：渲染 ──────────────────────────────────────────────────
function renderCalendar(year, month) {
  const grid     = document.getElementById('cal-grid');
  const monthEl  = document.getElementById('cal-month-label');
  if (!grid || !monthEl) return;

  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay(); // 0=日

  const monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  monthEl.textContent = `${year} 年 ${monthNames[month]}`;

  // 模擬探訪資料（月 + 日 → 點類型）
  const visitData = {
    [`${year}-${month}-3`]:  ['dot-done'],
    [`${year}-${month}-7`]:  ['dot-done', 'dot-done'],
    [`${year}-${month}-10`]: ['dot-urgent'],
    [`${year}-${month}-14`]: ['dot-done', 'dot-pending'],
    [`${year}-${month}-17`]: ['dot-pending'],
    [`${year}-${month}-21`]: ['dot-done', 'dot-done', 'dot-done'],
    [`${year}-${month}-24`]: ['dot-pending', 'dot-pending'],
    [`${year}-${month}-28`]: ['dot-done'],
  };

  grid.innerHTML = '';

  // 前置空格（上月末尾）
  for (let i = 0; i < startDow; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day other-month';
    const prev = new Date(year, month, -startDow + i + 1);
    cell.innerHTML = `<span class="cal-day-num">${prev.getDate()}</span>`;
    grid.appendChild(cell);
  }

  // 本月日期
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const cell = document.createElement('div');
    const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
    cell.className = 'cal-day' + (isToday ? ' today selected' : '');
    cell.dataset.date = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

    const dots = visitData[`${year}-${month}-${d}`] || [];
    const dotsHtml = dots.length
      ? `<div class="cal-dots">${dots.map(c => `<span class="cal-dot ${c}"></span>`).join('')}</div>`
      : '';

    cell.innerHTML = `<span class="cal-day-num">${d}</span>${dotsHtml}`;

    cell.addEventListener('click', () => {
      document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      updateDayDetail(year, month, d);
    });

    grid.appendChild(cell);
  }

  // 後置空格（下月初）
  const remaining = 7 - ((startDow + lastDay.getDate()) % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day other-month';
      cell.innerHTML = `<span class="cal-day-num">${i}</span>`;
      grid.appendChild(cell);
    }
  }
}

// ─── 日程詳細更新 ─────────────────────────────────────────────────
function updateDayDetail(year, month, day) {
  const dateEl = document.getElementById('day-detail-date');
  const subEl  = document.getElementById('day-detail-sub');
  if (!dateEl) return;

  const d = new Date(year, month, day);
  const weekdays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  const monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  dateEl.textContent = `${year} 年 ${monthNames[month]} ${day} 日`;
  if (subEl) subEl.textContent = weekdays[d.getDay()];
}

// ─── 月曆導覽 ─────────────────────────────────────────────────────
function initCalendar() {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  renderCalendar(year, month);
  updateDayDetail(year, month, today.getDate());

  document.getElementById('cal-prev')?.addEventListener('click', () => {
    if (month === 0) { month = 11; year--; } else { month--; }
    renderCalendar(year, month);
  });

  document.getElementById('cal-next')?.addEventListener('click', () => {
    if (month === 11) { month = 0; year++; } else { month++; }
    renderCalendar(year, month);
  });
}

// ─── 月報：月份導覽 ───────────────────────────────────────────────
function initReportMonth() {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  const monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];

  function update() {
    const el = document.getElementById('report-month-label');
    if (el) el.textContent = `${year} 年 ${monthNames[month]}`;
  }

  update();

  document.getElementById('report-prev')?.addEventListener('click', () => {
    if (month === 0) { month = 11; year--; } else { month--; }
    update();
  });

  document.getElementById('report-next')?.addEventListener('click', () => {
    if (month === 11) { month = 0; year++; } else { month++; }
    update();
  });
}

// ─── 初始化 ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderDate();
  initSidebarNav();
  initFilterTabs();
  initCalendar();
  initReportMonth();
});
