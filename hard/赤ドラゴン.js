function startEvent27() {
  currentEvent = 'event27';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/赤ドラゴン.png');
  showTextTypingEffect('レッドドラゴンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/赤ドラゴン.png';
    initializeMonster(100);
    startGame(2000, 100, () => {
      showTextTypingEffect(`レッドドラゴンを倒した！`, () => {
        removeEvent(currentEvent);
        removeEvent('event28');
        removeEvent('event29');
            showTextTypingEffect(`赤の魔導書を入手した！\nブラックドラゴンが出現するようになった！`, () => {
              flagR = true;
              updateFlagGrid();
              addEvent('event30', startEvent30, 3);
              fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
            });
        });
      
  });
  });
}
