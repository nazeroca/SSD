function startEvent51() {
  currentEvent = 'event51';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/デュラハンE.png');
  let noteCount = getSecureRandomInRange(40, 80);
  showTextTypingEffect('エリートデュラハンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/デュラハンE.png';
    initializeMonster(noteCount+20);
    startGameA(3000,500, 1,noteCount,20, () => {
      showTextTypingEffect(`エリートデュラハンを倒した！`, () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
