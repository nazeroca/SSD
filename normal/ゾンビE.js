function startEvent47() {
  currentEvent = 'event47';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(30, 40);
  showSceneImage('./image/ゾンビE.png');
  showTextTypingEffect('エリートゾンビが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゾンビE.png';
    initializeMonster(noteCount);
    startGameR(750,2000, noteCount, () => {
      
      showTextTypingEffect(`エリートゾンビを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
