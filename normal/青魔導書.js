function startEvent49() {
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
