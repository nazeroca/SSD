function startEvent15() {
  currentEvent = 'event15';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(10, 12);
  showTextTypingEffect('ゾンビ犬が現れた！', () => {
    document.getElementById('monster-img').src = './image/ゾンビ犬.png';
    initializeMonster(noteCount);
    startGameR(500, 1000, noteCount, () => {
      
      showTextTypingEffect(`ゾンビ犬を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
