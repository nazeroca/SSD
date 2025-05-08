function startEvent36() {
  currentEvent = 'event36';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/グリフォン.png');
  let noteCount = getSecureRandomInRange(30, 50);
  showTextTypingEffect('グリフォンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/グリフォン.png';
    initializeMonster(noteCount+10);
    startGameA(3000,500, 2.2,noteCount,10, () => {
      
      showTextTypingEffect(`グリフォンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
