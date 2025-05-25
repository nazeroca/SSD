function startEvent01() {
    QText = [
  'VS　スライム',
  '【ＨＰ】20～30\n【説明】\nただのスライム。ボクわるいスライムじゃないよ。'
];
  currentEvent = 'event01';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 30);
  showSceneImage('./image/スライム.png');
  showTextTypingEffect('スライムが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/スライム.png';
    initializeMonster(noteCount);
    startGame(2500, noteCount, () => {
      
      showTextTypingEffect(`スライムを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent(['event01','event05']);
        });
    });
  });
  });
}
