// ---- 時鐘（每秒更新）----
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock-time').textContent = `${h}:${m}`;

  const dateStr = now.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  document.getElementById('clock-date').textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock();

// ---- 問候語（依時段顯示早安/午安/晚安）----
function updateGreeting() {
  const hour = new Date().getHours();
  let prefix = '早安';
  if (hour >= 12 && hour < 18) prefix = '午安';
  else if (hour >= 18) prefix = '晚安';

  const el = document.getElementById('greeting-name');
  if (el) el.textContent = `${prefix}，王伯伯`;
}

updateGreeting();

// ---- 每日打卡 ----
function doCheckin() {
  const card = document.getElementById('checkin-card');
  const btn  = document.getElementById('checkin-btn');
  const timeEl = document.getElementById('checkin-time-text');

  if (card.classList.contains('checked-in')) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

  card.classList.add('checked-in');

  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    已打卡完成
  `;
  btn.disabled = true;

  if (timeEl) timeEl.textContent = `打卡時間：${timeStr}`;
}

// ---- 服藥確認 ----
function takeMedicine() {
  const card = document.getElementById('medicine-card');
  const btn  = document.getElementById('medicine-confirm-btn');

  if (card.classList.contains('medicine-taken')) return;

  card.classList.add('medicine-taken');

  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    確認服藥完成
  `;
  btn.disabled = true;
}

// ---- SOS Modal ----
function openSosModal() {
  const modal = document.getElementById('sos-modal');
  modal.classList.add('visible');

  // 焦點移至 Modal 內第一個按鈕
  const firstBtn = modal.querySelector('button');
  if (firstBtn) firstBtn.focus();
}

function closeSosModal() {
  document.getElementById('sos-modal').classList.remove('visible');
}

function confirmSOS() {
  closeSosModal();

  const btn    = document.getElementById('sos-btn');
  const banner = document.getElementById('sos-triggered-banner');

  // 更新按鈕狀態
  btn.classList.add('sos-triggered');
  btn.innerHTML = `
    <span class="sos-icon" aria-hidden="true">🚨</span>
    <span class="sos-label">警報已發出</span>
    <span class="sos-sub">家人和社工已收到通知，請保持鎮定</span>
  `;

  // 顯示確認橫幅
  if (banner) banner.classList.add('visible');
}

// ---- ESC 鍵關閉 Modal ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSosModal();
});

// ---- 點擊 Modal 背景關閉 ----
document.getElementById('sos-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeSosModal();
});
