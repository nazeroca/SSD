// event04.js
function startEvent43() {
  currentEvent = 'event43';
  eventCount++;
  updateEventCountDisplay();

  // ノーツ数をランダムに決定
  let noteCount = getSecureRandomInRange(20, 30);
  showSceneImage('./image/ナイトメアE.png');
  // テキストEを表示（ナイトメア出現）
  showTextTypingEffect('エリートナイトメアが現れた！', () => {
    hideSceneImage();
    // ノーツを流す
    document.getElementById('monster-img').src = './image/ナイトメアE.png';
    initializeMonster(noteCount);
    startGameR(1000, 4000, noteCount, () => {
      // ノーツ流れ終わったらテキストFを表示（悪夢状態を伝える）
      showTextTypingEffect('あなたはとても悪夢にうなされている…', () => {
        // 確率で結果を選ぶ処理へ
        chooseOutcomeForEvent04(noteCount);
      });
    });
  });
}

function chooseOutcomeForEvent04(noteCount) {
  // セキュアな乱数を使い、0.5未満なら起きる、0.5以上なら再挑戦とする（50/50の例）
  if (secureRandom() < 0.3) {
    // 起きる（当たり）
    showTextTypingEffect('無事目を覚ますことが出来た。', () => {
      fadeOutIn(() => {
        startRandomEvent([currentEvent]);
      });
    });
  } else {
    // 起きることが出来ない（ハズレ）。再度ノーツを流す。
    showTextTypingEffect('起きることが出来ない！', () => {
      document.getElementById('monster-img').src = './image/ナイトメアE.png';
      // 再度ノーツを流す。なお、noteCountは同じ値を使っていますが、変更したい場合はここで新たに決定してもよいです。
      initializeMonster(noteCount);
      startGameR(1000, 4000, noteCount, () => {
        // 再び確率で結果を判定する
        chooseOutcomeForEvent04(noteCount);
      });
    });
  }
}
