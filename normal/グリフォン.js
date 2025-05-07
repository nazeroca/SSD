function startEvent36() {
  currentEvent = 'event36';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(30, 50);
  showTextTypingEffect('グリフォンが現れた！', () => {
    document.getElementById('monster-img').src = './image/グリフォン.png';
    initializeMonster(noteCount);
    startGameA(3000,500, 3,noteCount,10, () => {
      
      showTextTypingEffect(`グリフォンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
