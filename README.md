# next-shadcn-sparkle

Next.js + shadcn/ui をベースに、[Sparkle Design](https://www.figma.com/community/file/1370468865498591498) のデザイントークンとコンポーネント仕様を適用した UI コンポーネントライブラリです。

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router / Turbopack) |
| UI Primitives | shadcn/ui + @base-ui/react |
| Styling | Tailwind CSS v4 + class-variance-authority |
| Design Tokens | Sparkle Design (Color, Typography, Spacing, Shadow, Radius) |
| Icon | Material Symbols Rounded (Google Fonts) |
| Font | BIZ UDPGothic / BIZ UDGothic |
| Storybook | Storybook 10 (nextjs-vite) |
| Language | TypeScript 5 |
| Package Manager | pnpm |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Start Storybook
pnpm storybook

# Build for production
pnpm build
```

## Components

80+ のコンポーネントを収録しています。すべて `src/components/ui/` に配置されています。

### General

| Component | File | Description |
|---|---|---|
| Button | `button.tsx` | theme (primary/neutral/negative) x variant (fill/outline/ghost) x size |
| IconButton | `icon-button.tsx` | アイコン専用ボタン (sm/md/lg) |
| ButtonGroup | `button-group.tsx` | ボタンのグループ化 |
| Link | `link.tsx` | テキストリンク |
| Icon | `icon.tsx` | Material Symbols Rounded ラッパー |

### Form

| Component | File | Description |
|---|---|---|
| Input | `input.tsx` | テキスト入力 (sm/md/lg) |
| InputSearch | `input-search.tsx` | 検索入力 (条件トリガー付き) |
| InputPassword | `input-password.tsx` | パスワード入力 (表示/非表示トグル) |
| InputDate | `input-date.tsx` | 日付入力 (カレンダーピッカー付き) |
| InputTime | `input-time.tsx` | 時刻入力 (時/分セレクター付き) |
| InputNumber | `input-number.tsx` | 数値入力 (増減ボタン付き) |
| InputChip | `input-chip.tsx` | チップ入力 (タグ追加/削除) |
| InputFile | `input-file.tsx` | ファイル入力 |
| InputOtp | `input-otp.tsx` | OTP入力 |
| Textarea | `textarea.tsx` | 複数行テキスト入力 |
| Select | `select.tsx` | セレクトボックス |
| NativeSelect | `native-select.tsx` | ネイティブセレクト |
| Checkbox | `checkbox.tsx` | チェックボックス (sm/md/lg) |
| RadioGroup | `radio-group.tsx` | ラジオグループ |
| Switch | `switch.tsx` | トグルスイッチ |
| Slider | `slider.tsx` | スライダー |
| Calendar | `calendar.tsx` | カレンダー |
| FormControl | `form-control.tsx` | フォームラベル + ヘルパーテキスト + バリデーション |

### Data Display

| Component | File | Description |
|---|---|---|
| Tag | `tag.tsx` | ステータスタグ (info/success/warning/negative) |
| Badge | `badge.tsx` | バッジ (カウント/ドット) |
| Avatar | `avatar.tsx` | アバター (画像/イニシャル/アイコン) |
| FilterChip | `filter-chip.tsx` | フィルターチップ |
| Kbd | `kbd.tsx` | キーボードショートカット表示 |
| InformationList | `information-list.tsx` | 情報リスト (アコーディオン対応) |
| Table | `table.tsx` | テーブル |
| Card | `card.tsx` | カード |
| Skeleton | `skeleton.tsx` | スケルトンローダー |
| Empty | `empty.tsx` | 空状態 |

### Feedback

| Component | File | Description |
|---|---|---|
| InlineMessage | `inline-message.tsx` | インラインメッセージ (info/success/warning/negative) |
| Tooltip | `tooltip.tsx` | ツールチップ |
| ProgressIndicator | `progress-indicator.tsx` | プログレスバー/サークル |
| Spinner | `spinner.tsx` | ローディングスピナー |
| Toast / Sonner | `toast.tsx` / `sonner.tsx` | トースト通知 |

### Overlay

| Component | File | Description |
|---|---|---|
| Modal (Dialog) | `dialog.tsx` | モーダルダイアログ (sm/md/lg/xl/full) |
| AlertDialog | `alert-dialog.tsx` | 確認ダイアログ |
| Sheet | `sheet.tsx` | シートパネル |
| Drawer | `drawer.tsx` | ドロワー |
| Popover | `popover.tsx` | ポップオーバー |
| DropdownMenu | `dropdown-menu.tsx` | ドロップダウンメニュー |
| ContextMenu | `context-menu.tsx` | コンテキストメニュー |
| HoverCard | `hover-card.tsx` | ホバーカード |
| Overlay | `overlay.tsx` | オーバーレイ |

### Navigation

| Component | File | Description |
|---|---|---|
| Tabs | `tabs.tsx` | タブ (line/solid/ghost) |
| VerticalTabs | `vertical-tabs.tsx` | 縦タブ |
| Breadcrumb | `breadcrumb.tsx` | パンくずリスト |
| Pagination | `pagination.tsx` | ページネーション |
| Stepper | `stepper.tsx` | ステッパー |
| SideNavigation | `side-navigation.tsx` | サイドナビゲーション |
| NavigationMenu | `navigation-menu.tsx` | ナビゲーションメニュー |
| Menubar | `menubar.tsx` | メニューバー |
| Sidebar | `sidebar.tsx` | サイドバー |

### Layout

| Component | File | Description |
|---|---|---|
| Divider | `divider.tsx` | 区切り線 |
| Stack | `stack.tsx` | スタックレイアウト |
| Separator | `separator.tsx` | セパレーター |
| Accordion | `accordion.tsx` | アコーディオン |
| Collapsible | `collapsible.tsx` | 折りたたみ |
| Resizable | `resizable.tsx` | リサイズ可能パネル |
| ScrollArea | `scroll-area.tsx` | スクロール領域 |
| AspectRatio | `aspect-ratio.tsx` | アスペクト比 |
| SegmentedControl | `segmented-control.tsx` | セグメンテッドコントロール |

## Design Tokens

Sparkle Design のデザイントークンは `src/app/globals.css` の `@theme inline` ブロックで定義されています。

```
Color:     --color-sp-{palette}-{shade}  (e.g. sp-primary-500)
Semantic:  --color-sp-text-{level}       (e.g. sp-text-high, sp-text-low)
Spacing:   --sp-{value}                  (e.g. --sp-4 = 4px, --sp-12 = 12px)
Shadow:    shadow-sp-raise, shadow-sp-pop-out
Radius:    rounded-sp-action (6px), rounded-sp-halfModal (8px), rounded-sp-modal (12px)
Font:      --font-family-base (BIZ UDPGothic), --font-family-icon (Material Symbols Rounded)
```

## Storybook

29 コンポーネントの Storybook ストーリーを収録しています。各コンポーネントのバリエーション（サイズ、テーマ、状態）を網羅しています。

```bash
pnpm storybook
# http://localhost:6006
```

## Project Structure

```
src/
  app/
    globals.css        # Sparkle Design tokens + Tailwind config
    layout.tsx         # Root layout (fonts, metadata)
    page.tsx           # Component showcase page
  components/
    ui/                # All UI components
  hooks/
    use-mobile.ts      # Mobile detection hook
  lib/
    utils.ts           # cn() utility
  types/
    sparkle.ts         # Shared types (SparkleSize, SparkleTheme, SparkleStatus)
  stories/             # Storybook stories
.storybook/
  main.ts              # Storybook config
  preview.ts           # Global decorators + CSS import
  preview-head.html    # Google Fonts loading
```

## Template Usage

このリポジトリをテンプレートとして派生プロジェクトを作成し、テンプレートの更新を後から取り込むことができます。

### 派生リポジトリの作成

```bash
# 1. GitHub で "Use this template" または手動でリポジトリを作成
git clone git@github.com:your-org/your-app.git
cd your-app

# 2. テンプレートを upstream として登録
bash scripts/init-from-template.sh
```

### テンプレート更新の取り込み

```bash
# 変更内容を確認（dry-run）
bash scripts/sync-from-template.sh --dry-run

# 更新を取り込み
bash scripts/sync-from-template.sh
```

コンフリクトが発生した場合は手動で解決してください。ファイルの所有権については [`.github/TEMPLATE_PATHS.md`](.github/TEMPLATE_PATHS.md) を参照してください。

### 派生リポジトリでの開発ルール

- `src/components/ui/` は**テンプレート所有**です。直接編集せず、テンプレート側で更新してください
- アプリ固有のコンポーネントは `src/components/` 配下（`ui/` 以外）に配置してください
- 詳細は [`.github/TEMPLATE_PATHS.md`](.github/TEMPLATE_PATHS.md) を参照

## License

Private
