function startEvent42() {
        QText = [
  'VS　雪女',
  '【ＨＰ】20～30\n【説明】\n雪の精霊。\n徐々に遅くなる攻撃を放つ。'
];
  currentEvent = 'event42';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/雪女E.png');
  let noteCount = getSecureRandomInRange(20, 30);
  showTextTypingEffect('エリート雪女が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/雪女E.png';
    initializeMonster(noteCount+20);
    startGameA2(500,4000,500, 0.6,noteCount,5,20, () => {
      
      showTextTypingEffect(`エリート雪女を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
