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
| 3 | `social-worker-dashboard` | 桌機介面功能較複雜（多案件 + 行事曆），待前兩者確立設計語言後再做 |
| 4 | `admin-panel` | 後台配置型介面，用戶群最小，最後完成 |

---

## 介面開發計畫

### 1. 家屬 App 儀表板 `caregiver-dashboard`
- **狀態：** 🔄 進行中
- **功能：** 即時狀態卡、歷史活動時間軸、三級警報通知、視訊通話入口
- **平台：** Web（RWD，手機優先）
- **技術棧：** HTML / SCSS / JS
- **已完成：** `index.html` 主畫面（總覽頁）— Top Bar、長者狀態卡、快速操作、感測器狀態列、活動時間軸、近期警報、底部導航

### 2. 長者端簡易介面 `elder-interface`
- **狀態：** 🔲 待開始
- **功能：** 大字體設計、一鍵 SOS、每日打卡確認、服藥提醒
- **平台：** Web（平板 / 大螢幕優先）
- **技術棧：** HTML / SCSS / JS

### 3. 社工後台系統 `social-worker-dashboard`
- **狀態：** 🔲 待開始
- **功能：** 多案件列表管理、訪視排班行事曆、異常案件優先顯示、統計報表
- **平台：** Web（桌機優先）
- **技術棧：** HTML / SCSS / JS

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
- **主題：** 暖色夜燈（Warm Vigil）— 深暖黑背景，非冷藍醫療感
- **字型：** `Fraunces`（長者姓名、標題，variable serif）+ `DM Sans`（UI 文字）
- **禁用字型：** Inter、Roboto、Arial 等泛用字體

### 色彩 Token
| Token | 色值 | 用途 |
|-------|------|------|
| `--color-bg` | `#0d0b08` | 頁面背景 |
| `--color-surface` | `#171410` | 卡片背景 |
| `--color-accent` | `#dfa050` | 主調琥珀金 |
| `--color-green` | `#50b890` | 🟢 正常狀態 |
| `--color-yellow` | `#eecc40` | 🟡 待確認狀態 |
| `--color-red` | `#e85250` | 🔴 緊急狀態 |
| `--color-text-primary` | `#ede8dc` | 主文字（暖白） |
| `--color-text-dim` | `#635a4a` | 輔助文字（暖灰） |

### 其他規範
- **字體大小：** 長者端需 ≥ 20px，其他介面 ≥ 14px
- **CSS 命名：** kebab-case，語意化（如 `.alert-card`、`.status-badge`）
- **SCSS 變數：** 設計 token 統一管理（`$color-alert-red`、`$color-status-green`）
- **禁用 BEM** 雙底線寫法

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
