function startEvent29() {
  currentEvent = 'event29';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('ブルードラゴンが現れた！', () => {
    document.getElementById('monster-img').src = './image/青ドラゴン.png';
    initializeMonster(75);
    startGame(1500, 75, () => {
      showTextTypingEffect(`ブルードラゴンを倒した！`, () => {
        removeEvent(currentEvent);
        if (flagDR && flagDB && flagDG && !flagR) {
          showTextTypingEffect(`三種のドラゴンを倒した！赤の魔導書を入手した！\nブラックドラゴンが出現するようになった！`, () => {
            flagR = true;
            updateFlagGrid();
            addEvent('event30', startEvent30, 1);
            fadeOutIn(() => {
        startRandomEvent();
      });
          });
        } else {
          flagDB = true;
          fadeOutIn(() => {
        startRandomEvent();
      });
        }
    });
  });
  });
}
