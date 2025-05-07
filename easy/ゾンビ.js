function startEvent14() {
  currentEvent = 'event14';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(30, 40);
  showTextTypingEffect('ゾンビが現れた！', () => {
    document.getElementById('monster-img').src = './image/ゾンビ.png';
    initializeMonster(noteCount);
    startGameR(2000,4000, noteCount, () => {
      
      showTextTypingEffect(`ゾンビを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
