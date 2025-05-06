function startEvent09() {
  currentEvent = 'event09';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(7, 13);
  showTextTypingEffect('ネクロマンサーが現れた！', () => {
    document.getElementById('monster-img').src = './image/ネクロマンサー.png';
    initializeMonster(40+noteCount);
    startGameT(1000, 4000, 750, 20, noteCount, 20, () => {
      showTextTypingEffect(`ネクロマンサーを倒した！`, () => {

          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
