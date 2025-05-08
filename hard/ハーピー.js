function startEvent32() {
  currentEvent = 'event32';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ハーピー.png');
  let noteCount = getSecureRandomInRange(5, 30);
  showTextTypingEffect('ハーピーが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ハーピー.png';
    initializeMonster(40+noteCount);
    startGameA(5000,500, 1.5,40,noteCount, () => {
      
      showTextTypingEffect(`ハーピーを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
