function startEvent28() {
  currentEvent = 'event28';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/緑ドラゴン.png');
  showTextTypingEffect('グリーンドラゴンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/緑ドラゴン.png';
    initializeMonster(75);
    startGameP(2500, 75, 0.01, 500, 20, () => {
      showTextTypingEffect(`グリーンドラゴンを倒した！`, () => {
        removeEvent(currentEvent);
        if (flagDR && flagDB && flagDG && !flagR) {
          showTextTypingEffect(`三種のドラゴンを倒した！赤の魔導書を入手した！\nブラックドラゴンが出現するようになった！`, () => {
            flagR = true;
            updateFlagGrid();
            addEvent('event30', startEvent30, 1);
            fadeOutIn(() => {
        startRandomEvent([currentEvent]);
      });
          });
        } else {
          flagDG = true;
          fadeOutIn(() => {
        startRandomEvent([currentEvent]);
      });
        }
    });
  });
  });
}
