function startEvent24() {
  currentEvent = 'event24';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(60, 80);
  showSceneImage('./image/メデューサE.png');
  showTextTypingEffect('エリートメデューサが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/メデューサE.png';
    initializeMonster(noteCount);
    startGameP(700, noteCount, 0.06, 5000, 1, () => {
      
      showTextTypingEffect(`エリートメデューサを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
