function startEvent10() {
  currentEvent = 'event10';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 40);
  
  showTextTypingEffect('ドラキュラが現れた！', () => {
    document.getElementById('monster-img').src = './image/ドラキュラ.png';
    initializeMonster(noteCount);
    startGameS(2500, noteCount, 0.05, 1000, 10, () => {
        showTextTypingEffect(`ドラキュラを倒した！`, () => {
            fadeOutIn(() => {
              startRandomEvent([currentEvent]);
            });
        });
    });
  });
}
