# 結婚式ゲストメッセージサイト

結婚式のゲスト一人ひとりに、個別のメッセージを届けるデジタルメッセージサイトです。<br>
QRコードをテーブルに置き、ゲストが自分の名前を入力すると、新郎新婦からのお手紙が封筒を開く演出とともに表示されます。

![画面収録 2026-02-21 0 07 59](https://github.com/user-attachments/assets/8389241a-e876-4583-a3ec-37fba62e1255)


## 機能

- 名前検索（漢字・カナどちらでもOK。空白は自動削除）
- 封筒が開くアニメーション
- 便箋風のメッセージ表示
- 1人1通制限（一度開くとlocalStorageに保存。その端末では他の名前では検索できない）
- 隠しリセットコマンド（注意文言を3秒以内に5回タップでlocalStorageを初期化）

## こだわりポイント

- ウェディングカラー（ベージュ×テラコッタ）の配色
- 封筒タップでゆっくり揺れるシェイク
- 封筒の3D開封演出
- 長文メッセージは本文のみスクロール
- ひらがな・スペースの入力揺れに対応

## まず使ってみる

1. リポジトリをダウンロード（ZIP）またはクローンする
2. ターミナルで `npm install` を実行
3. `npm run dev` で起動し、ブラウザで http://localhost:3000 を開く
4. 「鈴木太郎」または「鈴木花子」と入力してメッセージを見る（テスト用データ）


## 本格的な使い方

GitHub のテンプレートとして使えるようになっています。プログラミングが初めての方でも、以下の手順でサイトを公開できます。

### 1. GitHub でログインまたはアカウント作成

[GitHub](https://github.com) にアクセスし、アカウントにログインします。まだアカウントがない場合は「Sign up」から無料で作成できます。

### 2. テンプレートを複製してリポジトリ作成

このリポジトリのページで「Use this template」ボタンをクリックし、「Create a new repository」を選びます。リポジトリ名（例：`wedding-message`）を入力して作成すると、あなた専用のコピーができます。

### 3. JSON 形式のメッセージデータを用意する

ゲストの「氏名」「フリガナ」「メッセージ」をまとめた JSON データを用意します。

- **おすすめ**: Excel や Google スプレッドシートで氏名・フリガナ・メッセージを一覧にし、ChatGPT などに「JSON 形式にして」と頼むと楽です。
- **形式**: `{ "id", "kanjiName", "kanaName", "message", "sender" }` の配列。改行は `\n` で表します。`sender` は手紙の差出人名（例：新郎なら "Shinro Name"、新婦なら "Shimpu Name"）。
- サンプルは `public/data.json` を参照してください。

### 4. GitHub 上で直接 `public/data.json` を編集してコミット・プッシュ

1. 作成したリポジトリのページで `public/data.json` をクリック
2. 鉛筆アイコン（Edit this file）をクリック
3. 用意した JSON データで内容を置き換え
4. 画面下部の「Commit changes」をクリックし、メッセージ（例：「ゲストデータを登録」）を入力して「Commit changes」で確定

これで GitHub 上にデータが保存されます。パソコンに Git を入れていなくても大丈夫です。

### 5. GitHub と Vercel を連携する

1. [Vercel](https://vercel.com) にアクセスし、GitHub アカウントでログイン
2. 「Add New…」→「Project」を選択
3. 「Import Git Repository」で GitHub を選び、初回は Vercel に GitHub のアクセスを許可

### 6. リポジトリを選択してデプロイ

1. 先ほど作成したリポジトリ（例：`wedding-message`）を選択
2. 「Deploy」をクリック
3. 数十秒で完了し、`https://〇〇〇.vercel.app` のような URL が発行されます

この URL を QR コードに変換してテーブルに置けば、ゲストがスマホでアクセスしてメッセージを読めます。

## 開発者向け

- **技術**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion 11, TypeScript
- **構成**: `app/page.tsx`（メイン）、`components/envelope.tsx`（封筒）、`components/letter-overlay.tsx`（便箋）、`public/data.json`（ゲストデータ）
- **データ形式**: `{ "id", "kanjiName", "kanaName", "message", "sender" }` の配列（`\n` で改行、`sender` は差出人名）

---

*2026.02.19 - Designed by v0 / Built by Cursor*
