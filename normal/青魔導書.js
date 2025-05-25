function startEvent49() {
    QText = [
  '青魔導書イベント',
  '【説明】\n何のリスクもなく青の魔導書を入手できる。ラッキー！'
];
  currentEvent = 'event49';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('何かが落ちている…', () => {
      showTextTypingEffect(`青の魔導書を入手した！`, () => {
        flagB = true;
        updateFlagGrid();
        removeEvent('event49');
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
}
