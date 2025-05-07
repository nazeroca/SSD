function startEvent37() {
  currentEvent = 'event37';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 30);
  showTextTypingEffect('レヴィアタンが現れた！', () => {
    document.getElementById('monster-img').src = './image/レヴィアタン.png';
    initializeMonster(noteCount);
    startGameA(4000,800, 1.8,noteCount,0, () => {
      startGameA(800,4000, 1.8,noteCount,0, () => {
      
      showTextTypingEffect(`レヴィアタンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
});
  });
}
