function startEvent42() {
  currentEvent = 'event42';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/雪女E.png');
  let noteCount = getSecureRandomInRange(20, 30);
  showTextTypingEffect('エリート雪女が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/雪女E.png';
    initializeMonster(noteCount);
    startGameA2(1000,4000,500, 0.6,noteCount,5,20, () => {
      
      showTextTypingEffect(`エリート雪女を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
