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

## 專案結構（規劃中）

```
elderly-care-system/
├── CLAUDE.md
├── .claude/
│   └── skills/
│       └── elderly-care-system/
│           └── SKILL.md
├── caregiver-dashboard/     # 家屬 App 儀表板
├── social-worker-dashboard/ # 社工後台
├── elder-interface/         # 長者端介面
└── admin-panel/             # 管理員系統
```
