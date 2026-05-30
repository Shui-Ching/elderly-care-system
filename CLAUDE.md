# 防孤獨死照護系統專案

## Skill 載入

本專案使用專屬 skill：`.claude/skills/elderly-care-system/`

每次對話開始時，請主動載入此 skill 並確認當前開發進度。

## 技術棧

- HTML / SCSS / JS（主力）
- 靜態元件庫，不依賴框架

## CSS 單位規範

**禁止使用 `px`，一律改用 `rem`。**

本專案未來將進行無障礙檢測（Accessibility Audit）。`px` 為固定單位，不會隨使用者的瀏覽器字型設定縮放，違反 WCAG 可縮放文字要求。

適用範圍：字型大小、間距（margin / padding）、元素寬高等所有尺寸屬性。

## 專案結構（flat 結構，已完成重構）

```
elderly-care-system/
├── CLAUDE.md
├── .claude/
│   └── skills/
│       └── elderly-care-system/
│           └── SKILL.md
│
├── index.html                  # 角色選擇頁
├── caregiver.html              # 家屬 App 主頁（body.view-caregiver）
├── caregiver-alerts.html       # 家屬 — 警報頁
├── caregiver-activity.html     # 家屬 — 活動紀錄頁
├── caregiver-profile.html      # 家屬 — 個人設定頁
├── elder.html                  # 長者端主頁（body.view-elder）
├── social-worker.html          # 社工後台主頁（body.view-social-worker）
│
├── css/
│   └── main.css                # 統一編譯輸出（npx sass scss/main.scss:css/main.css --no-source-map）
│
├── js/
│   ├── caregiver-main.js
│   ├── caregiver-bottom-nav.js
│   ├── caregiver-alerts.js
│   ├── caregiver-activity.js
│   ├── elder-main.js
│   └── social-worker-main.js
│
└── scss/
    ├── main.scss               # 入口，@use 所有 partials
    ├── _tokens.scss            # 全域 CSS 自定義屬性
    ├── _reset.scss
    ├── _animations.scss
    ├── _base.scss              # body.view-xxx 背景層
    └── views/
        ├── caregiver/          # 家屬 App 樣式 partials
        ├── elder/              # 長者端樣式 partials
        └── social-worker/      # 社工後台樣式 partials
```

### 新增角色頁面流程

1. 在根目錄建 `role-name.html`，加 `body.view-role-name`
2. 在 `scss/views/role-name/` 建對應 partial
3. 在 `scss/main.scss` 加 `@use 'views/role-name/...' as *`
4. 重新編譯：`npx sass scss/main.scss:css/main.css --no-source-map`
