function startEvent07() {
  currentEvent = 'event07';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ミノタウロス.png');
  let noteCount = getSecureRandomInRange(35, 50);
  showTextTypingEffect('ミノタウロスが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ミノタウロス.png';
    initializeMonster(noteCount);
    startGameR(500,4000, noteCount, () => {
      showTextTypingEffect(`ミノタウロスを倒した！`, () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
