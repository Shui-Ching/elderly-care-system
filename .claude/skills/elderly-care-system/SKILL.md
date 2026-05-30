---
name: elderly-care-system
description: 防孤獨死照護系統的專案設計參考與開發進度追蹤。當使用者提到這個專案、要繼續開發介面、或詢問系統架構與設計規範時，必須載入此 skill。包含完整系統架構、四大角色介面開發計畫（家屬 App、社工後台、長者端、管理員），以及每個介面的開發狀態。每次對話開始時應主動回顧進度，確認下一步。
---

# 防孤獨死照護系統（Elderly Care System）

## 專案背景

因應人口老年化問題，設計一套整合 IoT 感測、主動互動、社區網絡的照護系統，目標是在長者發生意外或孤獨死之前及時發出警報並啟動人工關懷流程。

---

## 系統架構

### 四大角色

| 角色 | 說明 |
|------|------|
| 長者本人（Elder） | 被照護對象，使用簡易操作介面 |
| 家屬 / 照顧者（Caregiver） | 遠端監控長者狀態、接收警報 |
| 社工 / 志工（Social Worker） | 管理多位案件、排班訪視 |
| 系統管理員（Admin） | 設定警報規則、帳號與系統管理 |

### 三大感測模組

1. **被動感測模組（Passive Monitor）**
   - IoT 感測器：電力、水、瓦斯、門磁、移動偵測
   - 穿戴裝置：心率、跌倒偵測

2. **主動互動模組（Active Check-in）**
   - 定時電話 / 語音問候
   - App 日常回報
   - 按鈕式緊急呼叫
   - 服藥提醒確認

3. **社區網絡模組（Community Network）**
   - 訪視排班管理
   - 便利商店員 / 郵差通報
   - 鄰居志工、里長通報

### AI 分析引擎

- 異常行為偵測（超過 N 小時無活動）
- 風險等級評估（綠 / 黃 / 紅）
- 趨勢預測（連續幾天未外出）
- 自動觸發警報規則

### 三級警報邏輯

```
🟢 綠燈 — 正常
   生活規律正常，無異常訊號

🟡 黃燈 — 待確認
   系統自動撥打電話 / 推送通知
   → 長者回應 → 恢復綠燈
   → 30 分鐘無回應 → 升級

🔴 紅燈 — 緊急
   同步通報：家屬 + 社工 + 里長
   → 仍無法聯繫 → 實地訪視 / 救護車
```

### 資料流

```
[長者端設備]  →  [資料收集層]  →  [分析引擎]  →  [通報層]  →  [人工確認]
IoT / App       MQTT / API       AI Rules       Push / SMS    家屬 / 社工
```

---

## 建議開發順序

| 優先 | 介面 | 理由 |
|------|------|------|
| 1 | `caregiver-dashboard` | 家屬是核心決策用戶；三級警報視覺語言在此確立，是整個設計系統的基礎；RWD 手機優先，最易 demo |
| 2 | `elder-interface` | 長者端是資料輸入源頭（打卡、SOS、服藥），先定義輸入行為後，家屬端的數據才有脈絡 |
| 3 | `community-dashboard` | 桌機介面功能較複雜（多案件 + 行事曆），待前兩者確立設計語言後再做 |
| 4 | `admin-panel` | 後台配置型介面，用戶群最小，最後完成 |

---

## 介面開發計畫

### 1. 家屬 App 儀表板 `caregiver-dashboard`
- **狀態：** ✅ 已完成（四個頁面全數完成）
- **功能：** 即時狀態卡、歷史活動時間軸、三級警報通知、視訊通話入口
- **平台：** Web（RWD，手機優先）
- **技術棧：** HTML / SCSS / JS
- **已完成頁面：**
  - `index.html` 總覽頁 — Top Bar、問候語、長者狀態卡（三級燈號）、快速操作、感測器狀態列、活動時間軸（精簡）、近期警報、底部導航
  - `activity.html` 活動記錄頁 — 日期導航、每日摘要、24hr 熱圖、分類篩選、時間軸展開/收合
  - `alerts.html` 警報紀錄頁 — 當前狀態橫幅、篩選標籤、警報卡片（含升級時間軸）
  - `profile.html` 我的頁面 — 家屬帳號卡、被照護者資訊、照護團隊、通知設定 Toggle、感測器裝置清單、App 資訊/登出

### 2. 長者端簡易介面 `elder-interface`
- **狀態：** 🔄 進行中
- **功能：** 大字體設計、一鍵 SOS、每日打卡確認、服藥提醒
- **平台：** Web（平板 / 大螢幕優先，max-width 680px）
- **技術棧：** HTML / SCSS / JS
- **已完成頁面：**
  - `index.html` 主頁面 — 大時鐘（Fraunces 5rem）、時段問候語、每日打卡卡片（橙色）、服藥提醒卡片（藍色）、SOS 緊急求助按鈕（紅色脈衝）、確認 Modal

### 3. 社區照護網絡 `community-dashboard`
- **狀態：** 🔄 進行中
- **角色定位：** 統一「關懷者」角色——社工師、志工、鄰居、朋友、里長皆可使用同一介面；無身份階層之分
- **功能：** 關懷名單管理、拜訪排程行事曆、異常案件優先顯示、關懷記錄統計
- **平台：** Web（桌機優先）
- **技術棧：** HTML / SCSS / JS
- **已完成頁面：**
  - `index.html` 儀表板總覽 — 側邊欄導航、統計卡片、警報橫幅、異常案件列表 + 今日排班雙欄、近期動態 Feed
  - `cases.html` 關懷名單 — 搜尋列、狀態篩選標籤（全部／緊急／待確認／正常）、案件卡片列表（左側色條燈號、詳細資訊、操作按鈕）
  - `schedule.html` 拜訪排程 — 月曆格線（含事件點）、右側當日詳細排程面板、新增排程按鈕
  - `reports.html` 關懷統計 — 月份統計卡片、拜訪次數長條圖（CSS）、案件狀態圓環圖（SVG）、月份趨勢表格

### 4. 管理員系統設定 `admin-panel`
- **狀態：** 🔲 待開始
- **功能：** 警報規則設定、帳號與權限管理、IoT 裝置管理
- **平台：** Web（桌機）
- **技術棧：** HTML / SCSS / JS

---

## 開發狀態圖例

| 圖示 | 意義 |
|------|------|
| 🔲 | 待開始 |
| 🔄 | 進行中 |
| ✅ | 已完成 |
| 🔍 | 審查中 |

---

## 設計規範

### 視覺風格（已定案 — 依 caregiver-dashboard 確立）
- **主題：** 暖橙日光（Warm Amber Light）— 米白暖色底，非冷藍醫療感
- **字型：** `Fraunces`（長者姓名、大標題，variable serif）+ `DM Sans`（UI 文字）
- **禁用字型：** Inter、Roboto、Arial 等泛用字體
- **最大寬度：** 430px（手機優先，body 置中）
- **CSS 單位：** 全面使用 `rem`，禁用 `px`（無障礙合規要求）

### 其他規範
- **CSS 命名：** kebab-case，語意化（如 `.alert-card`、`.status-badge`）
- **禁用 BEM** 雙底線寫法（`__`、`--`）

---

## 設計系統速查（Cheat Sheet）

> 開發新頁面時無需重讀 SCSS，直接從此查用。

### CSS Token 完整列表（`_tokens.scss`）

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-bg` | `#fdf6ec` | 頁面底色（米白暖色）|
| `--color-surface` | `#ffffff` | 卡片底色 |
| `--color-surface-raised` | `#fff9f0` | hover / 懸浮層 |
| `--color-surface-high` | `#fff3e0` | 更高層次表面 |
| `--color-border` | `rgba(180,110,40,.15)` | 一般邊框 |
| `--color-border-subtle` | `rgba(180,110,40,.08)` | 淡邊框、分隔線 |
| `--color-text-primary` | `#2c1a08` | 主文字 |
| `--color-text-secondary` | `#7d5535` | 次要文字 |
| `--color-text-dim` | `#b8906a` | 暗淡輔助文字 |
| `--color-accent` | `#e07030` | 主調暖橙（品牌色）|
| `--color-accent-dim` | `rgba(224,112,48,.12)` | 暖橙淡底 |
| `--color-green` | `#1a9e6a` | 🟢 正常狀態 |
| `--color-green-dim` | `rgba(26,158,106,.12)` | 綠色淡底 |
| `--color-green-glow` | `rgba(26,158,106,.20)` | 綠色光暈 |
| `--color-yellow` | `#d4900a` | 🟡 待確認狀態 |
| `--color-yellow-dim` | `rgba(212,144,10,.12)` | 黃色淡底 |
| `--color-yellow-glow` | `rgba(212,144,10,.20)` | 黃色光暈 |
| `--color-red` | `#c93028` | 🔴 緊急狀態 |
| `--color-red-dim` | `rgba(201,48,40,.10)` | 紅色淡底 |
| `--color-red-glow` | `rgba(201,48,40,.20)` | 紅色光暈 |
| `--color-blue` | `#3060c0` | 感測輔助色（服藥）|
| `--color-purple` | `#7050b8` | 感測輔助色（門磁）|
| `--color-slate` | `#506090` | 感測輔助色（睡眠）|
| `--font-display` | `'Fraunces', Georgia, serif` | 大標題、長者姓名 |
| `--font-ui` | `'DM Sans', system-ui, sans-serif` | UI 文字 |
| `--radius-sm` | `8px` | 小圓角 |
| `--radius-md` | `14px` | 中圓角 |
| `--radius-lg` | `20px` | 大圓角（卡片常用）|
| `--radius-xl` | `26px` | 特大圓角（Hero 卡）|

### 動畫（`_animations.scss`）

| 動畫名 | 用途 |
|--------|------|
| `fade-up` | 頁面 section 進場，淡入 + 上移 18px |
| `pulse-ring` | 長者頭像外框脈衝環 |
| `dot-blink` | 狀態指示點閃爍（警報狀態）|

### HTML 新頁面樣板（內頁，含返回鍵）

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁面標題 — 守護</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/main.min.css">
</head>
<body>
<div class="app-wrapper">
  <header class="top-bar top-bar--inner">
    <div class="top-bar-left">
      <button class="icon-btn" onclick="location.href='index.html'" aria-label="返回">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <span class="page-title">頁面標題</span>
    </div>
  </header>
  <main class="main-content xxx-page">
    <!-- 內容 -->
    <div style="height: 0.75rem;"></div>
  </main>
</div>
<script src="js/bottom-nav.js"></script>
<script src="js/xxx.js"></script>
</body>
</html>
```

### 共用 Layout class（`_layout.scss`）

| Class | 說明 |
|-------|------|
| `.app-wrapper` | 最外層 flex-column 容器，底部預留 bottom-nav 空間 |
| `.top-bar` | 頂部導覽列（主頁版，有「守護」logo）|
| `.top-bar.top-bar--inner` | 頂部導覽列（內頁版，有返回鍵）|
| `.top-bar-left` | 內頁左側區（返回鍵 + `.page-title`）|
| `.page-title` | 內頁頁面標題文字 |
| `.app-logo` | 主頁「守護」品牌文字 |
| `.top-actions` | 右側圖示按鈕群 |
| `.icon-btn` | 圓形圖示按鈕（38×38px）|
| `.notif-dot` | 通知紅點（絕對定位 icon-btn 右上角）|
| `.main-content` | 主內容區，flex-column gap 14px，左右 padding 18px |
| `.section-header` | section 標題列（左標題 + 右連結）|
| `.section-title` | 左側 section 標題 |
| `.section-link` | 右側「詳細 →」文字連結 |
| `.bottom-nav` | 底部固定導航（`bottom-nav.js` 自動注入 body）|
| `.nav-item` | 底部導航項目；`.active` 為選中態 |

### 長者狀態卡（`_elder-card.scss`）

| Class | 說明 |
|-------|------|
| `.elder-hero-card` | 主卡片；`.status-yellow` `.status-red` 切換右上角光暈 |
| `.elder-info-row` | 頭像 + 姓名 + 狀態徽章橫排 |
| `.elder-avatar` | 圓形頭像；`.avatar-pulse` 為外圈脈衝環 |
| `.elder-name` / `.elder-detail` | 長者姓名 / 年齡・地址 |
| `.status-badge` | 狀態膠囊；加 `.yellow` `.red` 切換色 |
| `.status-dot` | 閃爍指示點 |
| `.status-stats` | 三欄統計（3-col grid）|
| `.stat-value` | 數值；`.highlight` 為綠色 |
| `.stat-label` | 統計標籤 |

### 時間軸（`_timeline.scss`）

| Class | 說明 |
|-------|------|
| `.timeline-card` | 白色圓角外框（`--radius-xl`）|
| `.timeline-list` | 事件列表容器 |
| `.tl-item` | 單筆事件；可加 `.expanded`、`.is-hidden` |
| `.tl-icon` | 事件圖示方塊（30×30，圓角 9px）|
| `.tl-movement` `.tl-medicine` `.tl-food` `.tl-door` `.tl-sleep` `.tl-alert` | 圖示色碼（依序：綠/藍/橙/紫/灰/紅）|
| `.tl-content` | 事件文字區（flex:1）|
| `.tl-event` / `.tl-sub` | 主文字 / 次要說明 |
| `.tl-time` | 右側時間數字 |
| `.tl-detail` | 展開詳情區（預設隱藏）|
| `.tl-detail-row` | 詳情內一列 key-value |
| `.tl-right` | 活動頁用：時間 + 展開箭頭直欄 |
| `.tl-chevron` | 展開箭頭 SVG（`.expanded` 時旋轉 180°）|
| `.tl-block` | 時段分組（活動頁用）；`.is-hidden` 隱藏 |
| `.tl-block-label` | 時段標籤文字（上午/清晨/昨夜）|

### 感測器（`_sensor.scss`）

| Class | 說明 |
|-------|------|
| `.sensor-row` | 4 格等寬 grid |
| `.sensor-card` | 單個感測器卡片 |
| `.sensor-pip` | 狀態圓點；`.offline` 灰、`.warn` 黃（預設綠）|

### 篩選標籤（`_alerts-page.scss` 共用）

| Class | 說明 |
|-------|------|
| `.filter-tab` | 單個篩選標籤；`.active` 為選中 |
| `.filter-count` | 標籤內數字 badge；`.is-active` 紅色 |

### 警報頁（`_alerts-page.scss`）

| Class | 說明 |
|-------|------|
| `.alert-status-banner` | 頂部狀態橫幅；`.green` `.yellow` `.red` |
| `.alert-filter-bar` | 篩選標籤列 |
| `.alert-feed` | 警報卡片列表容器 |
| `.alert-card` | 單筆警報卡；`.level-red` `.level-yellow` 左邊框色 |
| `.alert-level-badge` | 等級 pill；`.red` `.yellow` |
| `.alert-escalation` | 升級步驟時間軸 |
| `.esc-item` / `.esc-dot` | 步驟 / 圓點；`.auto` `.notify` `.contact` `.resolve` |
| `.alert-card-footer` | 底部列；`.resolved` `.pending` |
| `.alert-action-btn` | 進行中警報操作鈕；`.primary` `.danger` |
| `.alert-empty` | 空狀態；`.visible` 顯示 |

### 活動頁（`_activity-page.scss`）

| Class | 說明 |
|-------|------|
| `.day-nav` | 日期切換橫條 |
| `.day-nav-date` / `.day-nav-today` | 日期文字 / 「今天」badge |
| `.day-nav-btn` | 前後日箭頭按鈕（`[disabled]` 態半透明）|
| `.day-summary` | 每日三欄摘要 |
| `.activity-heatmap` | 熱圖外框卡片 |
| `.heatmap-bar` / `.heatmap-cell` | 熱圖條 / 單格；`data-level="0~4"` |
| `.heatmap-current` | 目前時刻標記（橙色）|
| `.activity-filter-bar` | 水平捲動分類篩選列 |
| `.activity-feed` | 活動事件流容器 |
| `.activity-empty` | 空狀態；`.visible` 顯示 |

### 我的頁面（`_profile-page.scss`）

| Class | 說明 |
|-------|------|
| `.profile-hero` | 家屬帳號卡（頭像 + 名字 + 編輯鈕）|
| `.profile-avatar` | 帳號頭像圓（橙色系）|
| `.profile-name` / `.profile-role` | 姓名 / 身份文字 |
| `.profile-edit-btn` | 編輯按鈕 |
| `.profile-section` | section 包裝（label + card）|
| `.profile-section-label` | 大寫小標籤（類似 `.tl-block-label`）|
| `.profile-card` | 白色通用卡片 |
| `.elder-profile-header` | 被照護者資訊標頭橫排 |
| `.profile-meta-list` / `.profile-meta-item` | key-value 列表 |
| `.meta-label` / `.meta-value` / `.meta-link` | 標籤 / 數值 / 連結式數值 |
| `.status-pip-lg` | 大版狀態指示燈；`.green` `.yellow` `.red` |
| `.care-team-list` / `.care-team-item` | 照護團隊列表 |
| `.care-team-avatar` | 成員頭像（`style="--c:#3060c0"` 傳入顏色）|
| `.care-team-call` | 電話按鈕（圓形綠色）|
| `.notif-list` / `.notif-item` | 通知設定列表 |
| `.notif-level-dot` | 等級圓點；`.red` `.yellow` `.orange` `.green` |
| `.toggle-wrap` + `.toggle-input` + `.toggle-track` | Toggle 開關三件套（純 CSS）|
| `.device-list` / `.device-item` | 感測器裝置列表 |
| `.device-icon-wrap` | 裝置圖示方塊 |
| `.device-status` | 狀態標籤；`.online` `.low-battery` `.offline` |
| `.logout-btn` | 紅色登出按鈕 |

### 首頁精簡元件（`_alerts.scss` `_quick-actions.scss` `_greeting.scss`）

| Class | 說明 |
|-------|------|
| `.greeting` / `.greeting-sub` / `.greeting-main` | 問候語區塊 |
| `.quick-actions` | 快速操作 3-col grid |
| `.action-btn` | 操作按鈕；`.call` `.video` `.sos` 設定圖示色 |
| `.action-icon` / `.action-label` | 圖示圓 / 標籤文字 |
| `.alert-section` / `.alert-list` / `.alert-item` | 首頁精簡警報列表 |
| `.alert-bar` | 左側色條；`.green` `.yellow` `.red` |
| `.alert-title` / `.alert-desc` / `.alert-time` | 警報標題 / 說明 / 時間 |

---

## 每次對話開始的例行確認

1. 目前哪個介面在進行中？
2. 上次做到哪個元件？
3. 這次要繼續還是切換介面？

---

## 開發慣例

### 檔案結構（每個介面通用）
```
<interface-name>/
├── index.html          ← 只有 HTML 結構，不內嵌 <style>
├── css/
│   └── main.css        ← SCSS 編譯輸出，不手動編輯
├── scss/
│   ├── _tokens.scss    ← 設計 Token（CSS 自定義屬性）
│   ├── _base.scss      ← Reset & body
│   ├── _animations.scss← @keyframe 動畫
│   ├── _layout.scss    ← 頁面骨架、導航
│   ├── _<component>.scss ← 各元件獨立一檔
│   └── main.scss       ← 入口，@use 所有 partials
└── js/
    └── main.js
```

### SCSS 規則
- **禁止** 將 CSS 寫在 HTML `<style>` 標籤內
- 每個元件獨立一個 `_partial.scss`，在 `main.scss` 以 `@use` 統一載入
- 使用 CSS 自定義屬性（`var(--color-xxx)`）作為 Token，不用 SCSS 變數跨檔傳遞值
- SCSS 巢狀寫法：用於 `&:hover`、`&.modifier`、子元素等語意明確的場合

### 編譯規則
- 輸出檔為 `css/main.min.css`（壓縮格式），HTML 一律連結此檔
- `css/main.css`（未壓縮）**不存在**，不手動維護
- **Claude 不執行任何編譯指令**，完成 SCSS 修改後告知使用者需要重新編譯

```bash
# 監聽模式（開發時手動執行，每次改 SCSS 自動重新編譯）
npx sass --watch scss/main.scss:css/main.min.css --style=compressed --no-source-map
```

## 備註

- 本系統以靜態 HTML/CSS 元件庫交付，不依賴特定框架
- 各介面完成後可整合至同一設計系統文件
- 未來可考慮整合 Vue / Nuxt 做動態化
