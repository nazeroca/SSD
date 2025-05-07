function startEvent08() {
  currentEvent = 'event08';
  eventCount++;
  updateEventCountDisplay();

  let noteCount = getSecureRandomInRange(20, 40);
  showTextTypingEffect('デュラハンが現れた！', () => {
    document.getElementById('monster-img').src = './image/デュラハン.png';
    initializeMonster(noteCount+10);
    startGameA(3000,1000, 2,noteCount,10, () => {
      showTextTypingEffect(`デュラハンを倒した！`, () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
