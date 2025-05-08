function startEvent08() {
  currentEvent = 'event08';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/デュラハン.png');
  let noteCount = getSecureRandomInRange(20, 40);
  showTextTypingEffect('デュラハンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/デュラハン.png';
    initializeMonster(noteCount+20);
    startGameA(3000,750, 1,noteCount,20, () => {
      showTextTypingEffect(`デュラハンを倒した！`, () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
