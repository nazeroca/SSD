function startEvent45() {
  currentEvent = 'event45';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(50, 70);
  showSceneImage('./image/ゴーレムE.png');
  showTextTypingEffect('エリートエリートゴーレムが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゴーレムE.png';
    initializeMonster(noteCount);
    startGame(2500, noteCount, () => {
      showTextTypingEffect(`エリートゴーレムを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
