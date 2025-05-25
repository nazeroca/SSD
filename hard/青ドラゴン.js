function startEvent29() {
  currentEvent = 'event29';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/青ドラゴン.png');
  showTextTypingEffect('ブルードラゴンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/青ドラゴン.png';
    initializeMonster(100);
    startGame(1500, 100, () => {
      showTextTypingEffect(`ブルードラゴンを倒した！`, () => {
        removeEvent(currentEvent);
        removeEvent('event27');
        removeEvent('event28');
          showTextTypingEffect(`赤の魔導書を入手した！\nブラックドラゴンが出現するようになった！`, () => {
            flagR = true;
            updateFlagGrid();
            addEvent('event30', startEvent30, 3);
            fadeOutIn(() => {
        startRandomEvent();
      });
          });
    });
  });
  });
}
