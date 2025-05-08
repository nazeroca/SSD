function startEvent34() {
  currentEvent = 'event34';
  eventCount++;
  updateEventCountDisplay();
  let noteCount1 = getSecureRandomInRange(10, 20);
  let noteCount2 = 20;
  showSceneImage('./image/ラミア.png');
  showTextTypingEffect('ラミアが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ラミア.png';
    initializeMonster((noteCount1+noteCount2)*3);
    startGameT2(3000, 750, noteCount1, noteCount2, 3,  () => {
      showTextTypingEffect(`ラミアを倒した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
