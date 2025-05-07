function startEvent12() {
  currentEvent = 'event12';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(40, 60);
  showTextTypingEffect('ゴーレムが現れた！', () => {
    document.getElementById('monster-img').src = './image/ゴーレム.png';
    initializeMonster(noteCount);
    startGame(3000, noteCount, () => {
      showTextTypingEffect(`ゴーレムを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
