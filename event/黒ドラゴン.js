function startEvent30() {
      QText = [
  'VS　ブラックドラゴン',
  '【ＨＰ】100\n【説明】\n赤の魔導書を得た代償に呼び出された魔物。'
];
  currentEvent = 'event30';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/黒ドラゴン.png');
  showTextTypingEffect('ブラックドラゴンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/黒ドラゴン.png';
    initializeMonster(100);
    startGameT(2500, 1500, 500, 30, 30, 40, () => {
      showTextTypingEffect(`ブラックドラゴンを倒した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
