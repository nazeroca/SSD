function startEvent30() {
  currentEvent = 'event30';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('ブラックドラゴンが現れた！', () => {
    document.getElementById('monster-img').src = './image/黒ドラゴン.png';
    initializeMonster(100);
    startGameT(2500, 1500, 500, 30, 30, 30, () => {
      showTextTypingEffect(`ブラックドラゴンを倒した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
