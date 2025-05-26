function startEvent52() {
        QText = [
  'VS　エリートゴブリン',
  '【ＨＰ】15～25\n【説明】\nゴブリンのエリート種。通常のゴブリンと比べ、追撃の発生確率が高く、強力。'
];
  currentEvent = 'event52';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(15, 25);
  showSceneImage('./image/ゴブリンE.png');
  showTextTypingEffect('エリートゴブリンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゴブリンE.png';
    initializeMonster(noteCount);
    startGameP(3000, noteCount, 0.08, 1500, 10, () => {
      
      showTextTypingEffect(`エリートゴブリンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
