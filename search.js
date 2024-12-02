let currentIndex = 0; // 現在の画像のインデックス
let currentDestination = ''; // 現在の選択先
let slidesData = []; // スライドデータを格納する配列

// 「青いボタン」のクリックイベントリスナー
document.getElementById('blue-button').addEventListener('click', function () {
    const inputForm = document.getElementById('inputForm');
    const slideContainer = document.getElementById('slideContainer');

    // 入力フォームが非表示の場合、表示にする
    if (inputForm.style.display === 'none' || inputForm.style.display === '') {
        inputForm.style.display = 'block'; // 入力フォームを表示
        setTimeout(() => {
            inputForm.classList.add('show'); // 不透明度を1に設定
        }, 10);

        // スライドショーを非表示にする
        slideContainer.style.display = 'none'; // スライドショーを隠す
        slideContainer.classList.remove('visible'); // visibleクラスを削除
    } else {
        inputForm.classList.remove('show');
        // 一旦非表示にしてから、スライドショーも隠す
        setTimeout(() => {
            inputForm.style.display = 'none'; // 入力フォームを隠す
            slideContainer.style.display = 'none'; // スライドショーも隠す
        }, 500); // トランジションの時間に合わせて500ms待つ
    }
});

// 検索ボタンのクリックイベントリスナーを追加
document.getElementById('search-button').addEventListener('click', function () {
    const destination = document.getElementById('destination1').value;
    if (destination) {
        currentDestination = destination; // 現在の選択先を記録
        fetchSlides(currentDestination); // データ取得
    }
});

// スライドデータを取得する関数
function fetchSlides(region) {
    const slideContainer = document.getElementById('slideContainer');
    const slideImage = document.getElementById('slideImage');

    fetch(`/slides?region=${region}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            slidesData = data; // 取得したデータを格納
            currentIndex = 0; // 画像インデックスをリセット

            // 最初のスライドを表示
            if (slidesData.length > 0) {
                updateSlide(); // 最初のスライドを更新
            }

            // スライドを表示するためのクラスを追加
            slideContainer.style.display = 'block'; // まずはブロックにしてから
            setTimeout(() => {
                slideContainer.classList.add('visible'); // visibleクラスを追加
            }, 10);
        })
        .catch((error) => {
            console.error('Error fetching slides:', error); // エラーログ出力
        });
}

// 前へボタンのクリックイベントリスナーを追加
document.getElementById('prev-button').addEventListener('click', function () {
    if (slidesData.length > 0) {
        currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length; // 前の画像に切り替え
        updateSlide();
    }
});

// 次へボタンのクリックイベントリスナーを追加
document.getElementById('next-button').addEventListener('click', function () {
    if (slidesData.length > 0) {
        currentIndex = (currentIndex + 1) % slidesData.length; // 次の画像に切り替え
        updateSlide();
    }
});

// 現在のスライドを更新する関数
function updateSlide() {
    const slideImage = document.getElementById('slideImage');
    const slideName = document.getElementById('slideName');
    const slideText = document.getElementById('slideText');
    const slideAddress = document.getElementById('slideAddress');

    // 各要素にデータを割り当てる
    slideImage.src = slidesData[currentIndex].image_path;
    slideName.textContent = slidesData[currentIndex].name;
    slideText.textContent = slidesData[currentIndex].description;
    slideAddress.textContent = slidesData[currentIndex].address;
}
