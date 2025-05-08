function startEvent18() {
  currentEvent = 'event18';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ケルベロス.png');
  let noteCount1 = getSecureRandomInRange(20, 30);
  let noteCount2 = getSecureRandomInRange(20, 35);
  let noteCount3 = getSecureRandomInRange(20, 40);
  showTextTypingEffect('ケルベロスが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ケルベロス.png';
    initializeMonster(noteCount1+noteCount2+noteCount3);
    startGameT(2500, 2250, 2000, noteCount1, noteCount2, noteCount3, () => {
      
      showTextTypingEffect(`ケルベロスを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
