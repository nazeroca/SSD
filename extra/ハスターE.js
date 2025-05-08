function startEvent40() {
  currentEvent = 'event40';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ハスターE.png');
  let noteCount = getSecureRandomInRange(40, 100);
  showTextTypingEffect('エリートハスターが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ハスターE.png';
    initializeMonster(noteCount);
    startGameR2(500,2500, noteCount, () => {
      
      showTextTypingEffect(`ハスターを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
