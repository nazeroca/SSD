function startEvent21() {
  currentEvent = 'event21';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(10, 20);
  showSceneImage('./image/ゴブリン.png');
  showTextTypingEffect('ゴブリンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゴブリン.png';
    initializeMonster(noteCount);
    startGameP(4000, noteCount, 0.05, 2000, 10, () => {
      
      showTextTypingEffect(`ゴブリンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
