function startEvent35() {
  currentEvent = 'event35';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(60, 80);
  showTextTypingEffect('クトゥグアが現れた！', () => {
    document.getElementById('monster-img').src = './image/クトゥグア.png';
    initializeMonster(noteCount);
    startGameS(3000, noteCount, 0.2, 500, 5, () => {
      
      showTextTypingEffect(`クトゥグアを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
