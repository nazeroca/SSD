function startEvent46() {
  currentEvent = 'event46';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ドラキュラE.png');
  let noteCount = getSecureRandomInRange(30, 40);
  
  showTextTypingEffect('エリートドラキュラが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ドラキュラE.png';
    initializeMonster(noteCount);
    startGameP(2500, noteCount, 0.15, 1000, 10, () => {
        showTextTypingEffect(`エリートドラキュラを倒した！`, () => {
            fadeOutIn(() => {
              startRandomEvent([currentEvent]);
            });
        });
    });
  });
}
