function startEvent14() {
  currentEvent = 'event14';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 30);
  showSceneImage('./image/ゾンビ.png');
  showTextTypingEffect('ゾンビが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゾンビ.png';
    initializeMonster(noteCount);
    startGameR(1000,3000, noteCount, () => {
      
      showTextTypingEffect(`ゾンビを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
