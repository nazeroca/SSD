function startEvent01() {
  currentEvent = 'event01';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 30);
  showTextTypingEffect('スライムが現れた！', () => {
    document.getElementById('monster-img').src = './image/スライム.png';
    initializeMonster(noteCount);
    startGame(1000, noteCount, () => {
      
      showTextTypingEffect(`スライムを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent(['event01','event05']);
        });
    });
  });
  });
}
