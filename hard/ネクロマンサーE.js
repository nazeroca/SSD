function startEvent44() {
  currentEvent = 'event44';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ネクロマンサーE.png');
  let noteCount = getSecureRandomInRange(15, 25);
  showTextTypingEffect('エリートネクロマンサーが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ネクロマンサーE.png';
    initializeMonster(40+noteCount);
    startGameT(750, 3000, 500, 35, noteCount, 35, () => {
      showTextTypingEffect(`エリートネクロマンサーを倒した！`, () => {

          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
      });
    });
  });
}
