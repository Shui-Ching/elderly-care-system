// 開發用：狀態切換工具函式
// 呼叫方式：setStatus('green') | setStatus('yellow') | setStatus('red')
function setStatus(status) {
  const heroCard     = document.getElementById('hero-card');
  const badge        = document.getElementById('status-badge');
  const badgeText    = document.getElementById('badge-text');
  const greetingMain = document.getElementById('greeting-main');

  heroCard.className = 'elder-hero-card';
  badge.className    = 'status-badge';

  const map = {
    green:  { cardClass: '',              badgeClass: '',       text: '正常',   greet: '媽媽今天 <strong>一切正常</strong>' },
    yellow: { cardClass: 'status-yellow', badgeClass: 'yellow', text: '待確認', greet: '媽媽目前 <strong style="color:var(--color-yellow)">需要確認</strong>' },
    red:    { cardClass: 'status-red',    badgeClass: 'red',    text: '緊急',   greet: '媽媽目前 <strong style="color:var(--color-red)">緊急狀態</strong>' },
  };

  const s = map[status] || map.green;
  if (s.cardClass)  heroCard.classList.add(s.cardClass);
  if (s.badgeClass) badge.classList.add(s.badgeClass);
  badgeText.textContent  = s.text;
  greetingMain.innerHTML = s.greet;
}
