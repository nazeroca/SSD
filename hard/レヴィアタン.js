function startEvent37() {
  currentEvent = 'event37';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(30, 40);
  showSceneImage('./image/レヴィアタン.png');
  showTextTypingEffect('レヴィアタンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/レヴィアタン.png';
    initializeMonster(2*noteCount);
    startGameA2(3000,500, 3000, 2, noteCount, 0.5, noteCount, () => {
      
      showTextTypingEffect(`レヴィアタンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
});
  });
}
