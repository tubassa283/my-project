// 必要なモジュールをインポート
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL用のpgモジュールをインポート
const path = require('path'); // pathモジュールをインポート

// Expressアプリケーションの作成
const app = express();
const PORT = process.env.PORT || 3000; // 環境変数からポートを取得、なければ3000を使用

// PostgreSQL接続設定
const pool = new Pool({
    // PostgreSQLについての記載をする(仮)
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
