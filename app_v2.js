// 必要なモジュールをインポート
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL用のpgモジュールをインポート
const path = require('path'); // pathモジュールをインポート
require('dotenv').config(); // dotenvモジュールで環境変数を読み込む

// Expressアプリケーションの作成
const app = express();
const PORT = process.env.PORT || 3000; // 環境変数からポートを取得、なければ3000を使用

// PostgreSQL接続設定
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT || 5432, // ポートだけはデフォルト値を使用
});

// 必須の環境変数が設定されているか確認
if (!process.env.PG_USER || !process.env.PG_HOST || !process.env.PG_DATABASE || !process.env.PG_PASSWORD) {
    console.error("Error: Missing required environment variables for PostgreSQL connection.");
    process.exit(1); // 必須の環境変数が設定されていない場合、アプリケーションを停止
}

// データベース接続チェック
pool.connect((err) => {
    if (err) {
        console.error("Database connection error:", err.stack);
        process.exit(1); // データベース接続エラーが発生した場合、アプリケーションを停止
    } else {
        console.log("Database connected successfully.");
    }
});

// ミドルウェア設定
app.use(express.json()); // JSONボディを解析
app.use(express.static(path.join(__dirname))); // 現在のディレクトリから静的ファイルを提供

// スライドデータを取得するエンドポイント
app.get('/slides', async (req, res) => {
    const region = req.query.region; // クエリパラメータから地域を取得
    try {
        // データベースから指定された地域のスライドデータを取得
        const result = await pool.query('SELECT * FROM TBL名 WHERE region = $1', [region]);
        res.json(result.rows); // スライド情報をJSON形式で返す
    } catch (err) {
        console.error('Error fetching slides:', err);
        res.status(500).send('Internal Server Error'); // エラーが発生した場合は500エラーを返す
    }
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // サーバーが起動したことをコンソールに表示
});
