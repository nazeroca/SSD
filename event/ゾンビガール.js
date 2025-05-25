function startEvent48() {
  currentEvent = 'event48';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 25);
  showSceneImage('./image/ゾンビ犬E.png');
  showTextTypingEffect('エリートゾンビ犬が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゾンビ犬E.png';
    initializeMonster(noteCount);
    startGameR(500, 1000, noteCount, () => {
      
      showTextTypingEffect(`エリートゾンビ犬を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
