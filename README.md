# Twitter Clone Fullstack

Next.jsを利用したTwitterのクローンアプリです。
バックエンドのロジックも兼ね備えているので一応フルスタックということにしています。SQLiteを採用しているので、追加の設定なしにお手元の環境でお試しできます。

## Development

以下のコマンドで環境が構築され、プログラムが実行されます。

```bash
git clone https://github.com/sub-t/twitter-clone-fullstack project-name
cd project-name
yarn
yarn prisma:seed
yarn dev
```

http://localhost:3000/ にアクセスしたらログイン画面に到達できると思うので、事前に登録されたアカウントのメールアドレスを利用してログインしてください。パスワードは「password」で統一されています。

既存のアカウントの確認はPrisma Studioから行えます。下記のコマンドからPrisma Studioを起動してください。アカウントに対応するテーブルは「User」テーブルです。

```bash
yarn prisma:studio
```



## License

MIT
