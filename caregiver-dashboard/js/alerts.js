// 警報頁面互動

// ---- 篩選標籤 ----
const filterTabs  = document.querySelectorAll('.filter-tab');
const alertCards  = document.querySelectorAll('.alert-card');
const emptyState  = document.getElementById('alert-empty');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    let visibleCount = 0;

    alertCards.forEach(card => {
      const match = filter === 'all' || card.dataset.status === filter;
      card.classList.toggle('hidden', !match);
      if (match) visibleCount++;
    });

    // 空狀態顯示
    if (emptyState) {
      emptyState.classList.toggle('visible', visibleCount === 0);
    }
  });
});
