function startEvent31() {
  currentEvent = 'event31';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 30);
  showTextTypingEffect('ヴォーパルが現れた！', () => {
    document.getElementById('monster-img').src = './image/ヴォーパル.png';
    initializeMonster(noteCount);
    startGameA(5000,1000, 2,noteCount,0, () => {
      
      showTextTypingEffect(`ヴォーパルを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
