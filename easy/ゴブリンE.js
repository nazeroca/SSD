function startEvent52() {
  currentEvent = 'event52';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(15, 25);
  showSceneImage('./image/ゴブリンE.png');
  showTextTypingEffect('エリートゴブリンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゴブリンE.png';
    initializeMonster(noteCount);
    startGameP(3000, noteCount, 0.07, 1500, 10, () => {
      
      showTextTypingEffect(`エリートゴブリンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
