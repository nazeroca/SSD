function startEvent15() {
        QText = [
  'VS　ゾンビ犬',
  '【ＨＰ】10～12\n【説明】\nゾンビ化した犬。\n攻撃が非常に高速。'
];
  currentEvent = 'event15';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(10, 12);
  showSceneImage('./image/ゾンビ犬.png');
  showTextTypingEffect('ゾンビ犬が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゾンビ犬.png';
    initializeMonster(noteCount);
    startGameR(500, 1000, noteCount, () => {
      
      showTextTypingEffect(`ゾンビ犬を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
