function startEvent19() {
  currentEvent = 'event19';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ハスター.png');
  let noteCount = getSecureRandomInRange(20, 100);
  showTextTypingEffect('ハスターが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ハスター.png';
    initializeMonster(noteCount);
    startGameR2(500,5000, noteCount, () => {
      
      showTextTypingEffect(`ハスターを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
