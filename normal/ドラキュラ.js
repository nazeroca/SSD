function startEvent10() {
  currentEvent = 'event10';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ドラキュラ.png');
  let noteCount = getSecureRandomInRange(20, 40);
  
  showTextTypingEffect('ドラキュラが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ドラキュラ.png';
    initializeMonster(noteCount);
    startGameP(2500, noteCount, 0.3, 1000, 10, () => {
        showTextTypingEffect(`ドラキュラを倒した！`, () => {
            fadeOutIn(() => {
              startRandomEvent([currentEvent]);
            });
        });
    });
  });
}
