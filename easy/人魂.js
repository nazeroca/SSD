function startEvent25() {
  currentEvent = 'event25';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/人魂.png');
  showTextTypingEffect('人魂が現れた！', () => {
    hideSceneImage();
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
