# Template Ownership Boundaries

このドキュメントは、テンプレートリポジトリと派生リポジトリのファイル所有権の境界を定義します。
merge 時のコンフリクト解決の指針として使用してください。

## テンプレート所有（upstream を優先）

以下のパスはテンプレートリポジトリが管理します。派生リポジトリでは**直接編集しない**でください。
コンフリクト発生時は `git checkout --theirs <file>` でテンプレート側を採用します。

| パス | 内容 |
|---|---|
| `src/components/ui/` | Sparkle Design UIコンポーネント |
| `src/types/sparkle.ts` | 共通型定義 (SparkleSize, SparkleTheme等) |
| `src/lib/utils.ts` | `cn()` ユーティリティ |
| `src/hooks/use-mobile.ts` | モバイル検出フック |
| `src/app/globals.css` | デザイントークン定義部分（`@theme inline` ブロック） |
| `scripts/` | テンプレート配信スクリプト |
| `.templaterc.json` | テンプレートメタ情報 |

## 派生プロジェクト所有（ours を優先）

以下のパスは派生プロジェクトが自由に編集します。
コンフリクト発生時は `git checkout --ours <file>` で派生側を採用します。

| パス | 内容 |
|---|---|
| `src/app/page.tsx` | アプリケーションページ |
| `src/app/layout.tsx` | ルートレイアウト（メタデータ等をカスタマイズ） |
| `src/app/**/` | App Router のルート（page, layout, API） |
| `src/components/` (`ui/` 以外) | アプリ固有コンポーネント |
| `src/lib/` (`utils.ts` 以外) | アプリ固有ユーティリティ |
| `package.json` | 依存関係（テンプレート依存 + アプリ依存が混在） |
| `README.md` | プロジェクト固有のドキュメント |

## 共有ゾーン（手動マージ）

以下のパスはテンプレートと派生の両方が変更する可能性があります。
コンフリクト発生時は内容を確認して手動でマージしてください。

| パス | 注意点 |
|---|---|
| `package.json` | テンプレートが UI 依存を追加、派生がアプリ依存を追加 |
| `pnpm-lock.yaml` | `pnpm install` で再生成 |
| `tsconfig.json` | パスエイリアス等 |
| `next.config.ts` | プラグイン設定等 |
| `tailwind.config.*` | テーマ拡張等 |
| `src/app/globals.css` | テンプレートのトークン + 派生のカスタムスタイル |

### package.json コンフリクトの解決手順

```bash
# 両方の変更を取り込んだ後
pnpm install   # lock ファイルを再生成
git add package.json pnpm-lock.yaml
git commit
```
