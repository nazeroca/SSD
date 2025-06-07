function startEvent26() {
  currentEvent = 'event26';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/オーク.png');
  let noteCount = getSecureRandomInRange(50, 70);
  showTextTypingEffect('オークが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/オーク.png';
    initializeMonster(noteCount);
    startGame(1750, noteCount, () => {
      
      showTextTypingEffect(`オークを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
