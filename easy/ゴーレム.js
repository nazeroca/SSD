function startEvent04() {
        QText = [
  'VS　ゴーレム',
  '【ＨＰ】40～50\n【説明】\n岩でできた魔物。\nその体は非常に硬く、体力も高い。'
];
  currentEvent = 'event04';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(40, 50);
  showSceneImage('./image/ゴーレム.png');
  showTextTypingEffect('ゴーレムが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゴーレム.png';
    initializeMonster(noteCount);
    startGame(4000, noteCount, () => {
      showTextTypingEffect(`ゴーレムを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
