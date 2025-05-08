function startEvent23() {
  currentEvent = 'event23';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/雪女.png');
  let noteCount = getSecureRandomInRange(20, 30);
  showTextTypingEffect('雪女が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/雪女.png';
    initializeMonster(noteCount);
    startGameA(1000,4000, 0.8,noteCount,0, () => {
      
      showTextTypingEffect(`雪女を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
