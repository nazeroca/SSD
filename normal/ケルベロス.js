function startEvent18() {
  currentEvent = 'event18';
  eventCount++;
  updateEventCountDisplay();
  let noteCount1 = getSecureRandomInRange(25, 30);
  let noteCount2 = getSecureRandomInRange(25, 35);
  let noteCount3 = getSecureRandomInRange(25, 40);
  showTextTypingEffect('ケルベロスが現れた！', () => {
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
