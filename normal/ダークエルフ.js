function startEvent16() {
  currentEvent = 'event16';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ダークエルフ.png');
  let noteCount = getSecureRandomInRange(40, 60);
  showTextTypingEffect('ダークエルフが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ダークエルフ.png';
    initializeMonster(noteCount);
    startGame(1000, noteCount, () => {
      
      showTextTypingEffect(`ダークエルフを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
