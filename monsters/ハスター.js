function startEvent19() {
  currentEvent = 'event19';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 100);
  showTextTypingEffect('ハスターが現れた！', () => {
    document.getElementById('monster-img').src = './image/ハスター.png';
    initializeMonster(noteCount);
    startGameR(500,5000, noteCount, () => {
      
      showTextTypingEffect(`ハスターを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
