function startEvent22() {
  currentEvent = 'event22';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(60, 80);
  showTextTypingEffect('メデューサが現れた！', () => {
    document.getElementById('monster-img').src = './image/メデューサ.png';
    initializeMonster(noteCount);
    startGameS(1000, noteCount, 0.08, 5000, 1, () => {
      
      showTextTypingEffect(`メデューサを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
