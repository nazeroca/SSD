function startEvent12() {
  currentEvent = 'event12';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(80, 100);
  showTextTypingEffect('ゴーレムが現れた！', () => {
    document.getElementById('monster-img').src = './image/ゴーレム.png';
    initializeMonster(noteCount);
    startGame(4000, noteCount, () => {
      showTextTypingEffect(`ゴーレムを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
