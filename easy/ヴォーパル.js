function startEvent31() {
        QText = [
  'VS　ヴォーパル',
  '【ＨＰ】20～30\n【説明】\n羽根の生えた伝説上の兎\n攻撃が徐々に早くなる。'
];
  currentEvent = 'event31';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 30);
  showSceneImage('./image/ヴォーパル.png');
  showTextTypingEffect('ヴォーパルが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ヴォーパル.png';
    initializeMonster(noteCount);
    startGameA(5000,1000, 2,noteCount,0, () => {
      
      showTextTypingEffect(`ヴォーパルを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
