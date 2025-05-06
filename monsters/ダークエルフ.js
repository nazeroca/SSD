function startEvent16() {
  currentEvent = 'event16';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(40, 60);
  showTextTypingEffect('ダークエルフが現れた！', () => {
    document.getElementById('monster-img').src = './image/ダークエルフ.png';
    initializeMonster(noteCount);
    startGame(1500, noteCount, () => {
      
      showTextTypingEffect(`ダークエルフを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
