function startEvent17() {
  currentEvent = 'event17';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('幽霊が現れた！', () => {
    document.getElementById('monster-img').src = './image/幽霊.png';
    initializeMonster(10);
    startGameS(5000, 10, 0.1, 1000, 30, () => {
      
      showTextTypingEffect(`幽霊を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
