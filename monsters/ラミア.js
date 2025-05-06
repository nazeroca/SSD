function startEvent34() {
  currentEvent = 'event34';
  eventCount++;
  updateEventCountDisplay();
  let noteCount1 = getSecureRandomInRange(40, 70);
  let noteCount2 = 30;
  let noteCount3 = getSecureRandomInRange(25, 40);
  showTextTypingEffect('ラミアが現れた！', () => {
    document.getElementById('monster-img').src = './image/ラミア.png';
    initializeMonster(noteCount1+noteCount2+noteCount3);
    startGameT(3000, 750, 1000, noteCount1, noteCount2, noteCount3,  () => {
      showTextTypingEffect(`ラミアを倒した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
