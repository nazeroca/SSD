function startEvent28() {
      QText = [
  'VS　グリーンドラゴン',
  '【ＨＰ】100\n【説明】\n特殊変異したドラゴン。\n通常のドラゴンと比べ、ときどき追撃を行う。\n倒すと赤の魔導書が手に入るが、強力なモンスターが現れる可能性がある。'
];
  currentEvent = 'event28';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/緑ドラゴン.png');
  showTextTypingEffect('グリーンドラゴンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/緑ドラゴン.png';
    initializeMonster(100);
    startGameP(2000, 100, 0.01, 500, 20, () => {
      showTextTypingEffect(`グリーンドラゴンを倒した！`, () => {
        removeEvent(currentEvent);
        removeEvent('event27');
        removeEvent('event29');
          showTextTypingEffect(`赤の魔導書を入手した！\nブラックドラゴンが出現するようになった！`, () => {
            flagR = true;
            updateFlagGrid();
            addEvent('event30', startEvent30, 9);
            fadeOutIn(() => {
        startRandomEvent([currentEvent]);
      });
          });
    });
  });
  });
}
