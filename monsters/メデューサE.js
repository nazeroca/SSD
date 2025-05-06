function startEvent24() {
  currentEvent = 'event24';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(60, 80);
  showTextTypingEffect('エリートメデューサが現れた！', () => {
    document.getElementById('monster-img').src = './image/メデューサE.png';
    initializeMonster(noteCount);
    startGameS(700, noteCount, 0.08, 5000, 1, () => {
      
      showTextTypingEffect(`エリートメデューサを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
