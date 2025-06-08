function startEvent41() {
  currentEvent = 'event41';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(40, 50);
  showSceneImage('./image/レヴィアタンE.png');
  showTextTypingEffect('エリートレヴィアタンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/レヴィアタンE.png';
    initializeMonster(2*noteCount);
    startGameA2(3000,500, 3000, 2.5, noteCount, 0.4, noteCount, () => {
      
      showTextTypingEffect(`エリートレヴィアタンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
});
  });
}
