function startEvent04() {
  currentEvent = 'event04';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(40, 60);
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
