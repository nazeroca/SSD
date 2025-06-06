function startEvent27() {
        QText = [
  'VS　レッドドラゴン',
  '【ＨＰ】130\n【説明】\n特殊変異したドラゴン。\n通常のドラゴンと比べ、体力が高い。\n倒すと赤の魔導書が手に入るが、強力なモンスターが現れる可能性がある。'
];
  currentEvent = 'event27';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/赤ドラゴン.png');
  showTextTypingEffect('レッドドラゴンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/赤ドラゴン.png';
    initializeMonster(130);
    startGame(2000, 130, () => {
      showTextTypingEffect(`レッドドラゴンを倒した！`, () => {
        removeEvent(currentEvent);
        removeEvent('event28');
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
