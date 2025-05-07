function startEvent21() {
  currentEvent = 'event21';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(10, 20);
  showTextTypingEffect('ゴブリンが現れた！', () => {
    document.getElementById('monster-img').src = './image/ゴブリン.png';
    initializeMonster(noteCount);
    startGameS(4000, noteCount, 0.05, 2000, 10, () => {
      
      showTextTypingEffect(`ゴブリンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
