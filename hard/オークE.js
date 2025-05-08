function startEvent50() {
  currentEvent = 'event50';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/オークE.png');
  let noteCount = getSecureRandomInRange(50, 70);
  showTextTypingEffect('エリートオークが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/オークE.png';
    initializeMonster(noteCount);
    startGame(900, noteCount, () => {
      
      showTextTypingEffect(`エリートオークを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
