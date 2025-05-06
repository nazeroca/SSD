function startEvent25() {
  currentEvent = 'event25';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('人魂が現れた！', () => {
    document.getElementById('monster-img').src = './image/人魂.png';
    initializeMonster(45);
    startGameT(3000, 2000, 1000, 20, 15, 10, () => {
      
      showTextTypingEffect(`人魂を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
