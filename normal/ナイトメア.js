// event12.js
function startEvent12() {
  QText = [
  'VS　ナイトメア',
  '【ＨＰ】15~25+\n【説明】\n実体を持たない悪夢。場合によっては永遠に目を覚ますことが出来ない。'
];
  currentEvent = 'event12';
  eventCount++;
  updateEventCountDisplay();

  // ノーツ数をランダムに決定
  let noteCount = getSecureRandomInRange(15, 25);
  showSceneImage('./image/ナイトメア.png');
  // テキストEを表示（ナイトメア出現）
  showTextTypingEffect('ナイトメアが現れた！', () => {
    hideSceneImage();
    // ノーツを流す
    document.getElementById('monster-img').src = './image/ナイトメア.png';
    initializeMonster(noteCount);
    startGameR(1000, 4000, noteCount, () => {
      // ノーツ流れ終わったらテキストFを表示（悪夢状態を伝える）
      showTextTypingEffect('あなたは悪夢にうなされている…', () => {
        // 確率で結果を選ぶ処理へ
        chooseOutcomeForEvent12(noteCount);
      });
    });
  });
}

function chooseOutcomeForEvent12(noteCount) {
  // セキュアな乱数を使い、0.5未満なら起きる、0.5以上なら再挑戦とする（50/50の例）
  if (secureRandom() < 0.5) {
    // 起きる（当たり）
    showTextTypingEffect('無事目を覚ますことが出来た。', () => {
      fadeOutIn(() => {
        startRandomEvent([currentEvent]);
      });
    });
  } else {
    // 起きることが出来ない（ハズレ）。再度ノーツを流す。
    showTextTypingEffect('起きることが出来ない！', () => {
      document.getElementById('monster-img').src = './image/ナイトメア.png';
      // 再度ノーツを流す。なお、noteCountは同じ値を使っていますが、変更したい場合はここで新たに決定してもよいです。
      initializeMonster(noteCount);
      startGameR(1000, 4000, noteCount, () => {
        // 再び確率で結果を判定する
        chooseOutcomeForEvent12(noteCount);
      });
    });
  }
}
