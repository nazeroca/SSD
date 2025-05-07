function startEvent07() {
  currentEvent = 'event07';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(28, 42);
  showTextTypingEffect('ミノタウロスが現れた！', () => {
    document.getElementById('monster-img').src = './image/ミノタウロス.png';
    initializeMonster(noteCount);
    startGameR(500,1000, noteCount, () => {
      showTextTypingEffect(`ミノタウロスを倒した！`, () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
