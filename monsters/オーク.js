function startEvent26() {
  currentEvent = 'event26';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(50, 70);
  showTextTypingEffect('オークが現れた！', () => {
    document.getElementById('monster-img').src = './image/オーク.png';
    initializeMonster(noteCount);
    startGame(1500, noteCount, () => {
      
      showTextTypingEffect(`オークを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
