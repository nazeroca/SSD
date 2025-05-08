function startEvent39() {
  currentEvent = 'event39';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/クトゥグアE.png');
  let noteCount = getSecureRandomInRange(60, 80);
  showTextTypingEffect('エリートクトゥグアが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/クトゥグアE.png';
    initializeMonster(noteCount);
    startGameP(3000, noteCount, 0.25, 500, 7, () => {
      
      showTextTypingEffect(`クトゥグアを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
