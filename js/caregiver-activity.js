// 活動記錄頁面邏輯

(function () {

  // ---- 24hr 熱圖生成 ----
  // levels: 0=無資料, 1=睡眠, 2=低活動, 3=中活動, 4=高活動
  var HEATMAP_DATA = [
    1, 1, 1, 1, 1, 1,  // 00–05 睡眠中
    2,                  // 06 起床前安靜
    4, 4,               // 07–08 清晨高峰（外出返回、準備早餐）
    3, 3,               // 09–10 上午活動
    0, 0, 0, 0,         // 11–14 待記錄
    0, 0, 0, 0,         // 15–18 待記錄
    0, 0, 0, 0, 0, 0   // 19–23 待記錄
  ];

  // Demo 固定目前時刻為 10 時
  var DEMO_CURRENT_HOUR = 10;

  var heatmapBar = document.getElementById('heatmap-bar');
  if (heatmapBar) {
    HEATMAP_DATA.forEach(function (level, hour) {
      var cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.setAttribute('data-level', String(level));
      if (hour === DEMO_CURRENT_HOUR) {
        cell.classList.add('heatmap-current');
        cell.title = '目前時刻（' + hour + ':xx）';
      }
      heatmapBar.appendChild(cell);
    });
  }

  // ---- 日期導航 ----
  var DAYS_DATA = {
    '0':  { label: '5月30日，週六', today: true,  events: '9',  gap: '43<small>分</small>',  outdoor: '22<small>分</small>' },
    '-1': { label: '5月29日，週五', today: false, events: '11', gap: '38<small>分</small>',  outdoor: '45<small>分</small>' },
    '-2': { label: '5月28日，週四', today: false, events: '8',  gap: '5.1<small>小時</small>', outdoor: '0<small>分</small>'  }
  };

  var currentDayOffset = 0;

  var dateEl    = document.getElementById('day-nav-date');
  var todayBadge = document.getElementById('day-nav-today');
  var btnPrev   = document.getElementById('btn-prev');
  var btnNext   = document.getElementById('btn-next');

  var statEvents  = document.getElementById('stat-events');
  var statGap     = document.getElementById('stat-gap');
  var statOutdoor = document.getElementById('stat-outdoor');

  function updateDayNav() {
    var key = String(currentDayOffset);
    var data = DAYS_DATA[key] || DAYS_DATA['-2'];

    if (dateEl)     dateEl.textContent = data.label;
    if (todayBadge) todayBadge.style.display = data.today ? '' : 'none';
    if (statEvents)  statEvents.innerHTML  = data.events;
    if (statGap)     statGap.innerHTML     = data.gap;
    if (statOutdoor) statOutdoor.innerHTML = data.outdoor;

    if (btnPrev) btnPrev.disabled = (currentDayOffset <= -2);
    if (btnNext) btnNext.disabled = (currentDayOffset >= 0);
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      if (currentDayOffset > -2) {
        currentDayOffset--;
        updateDayNav();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      if (currentDayOffset < 0) {
        currentDayOffset++;
        updateDayNav();
      }
    });
  }

  // ---- 分類篩選 ----
  var filterBar    = document.getElementById('activity-filter-bar');
  var activityFeed = document.getElementById('activity-feed');
  var emptyState   = document.getElementById('activity-empty');

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var tab = e.target.closest('.filter-tab');
      if (!tab) return;

      // 切換 active 標籤
      filterBar.querySelectorAll('.filter-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      var cat = tab.getAttribute('data-cat');

      // 顯示 / 隱藏各事件
      var allItems = document.querySelectorAll('#activity-feed .tl-item');
      var visibleCount = 0;

      allItems.forEach(function (item) {
        var itemCat = item.getAttribute('data-cat');
        var show = (cat === 'all') || (itemCat === cat);
        item.classList.toggle('is-hidden', !show);
        if (show) visibleCount++;
      });

      // 隱藏完全空的時段 block
      document.querySelectorAll('#activity-feed .tl-block').forEach(function (block) {
        var hasVisible = block.querySelectorAll('.tl-item:not(.is-hidden)').length > 0;
        block.classList.toggle('is-hidden', !hasVisible);
      });

      // 空狀態
      if (emptyState) {
        emptyState.classList.toggle('visible', visibleCount === 0);
      }
    });
  }

  // ---- 展開 / 收合事件詳情 ----
  if (activityFeed) {
    activityFeed.addEventListener('click', function (e) {
      var item = e.target.closest('.tl-item');
      if (!item) return;
      if (!item.querySelector('.tl-detail')) return;
      item.classList.toggle('expanded');
    });
  }

})();
