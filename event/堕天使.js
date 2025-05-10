function startEvent38() {
  currentEvent = 'event38';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/堕天使.png');
  let tx = [];
  if(ange==1){tx = `あなたに穢された…\n復讐する…`}else{tx = `あなたに…${ange}回も穢された…\n復讐する…`}
  showTextTypingEffect('堕天使が現れた！', () => {
    showTextTypingEffectS('【堕天使】',tx, () => {
      hideSceneImage();
    document.getElementById('monster-img').src = './image/堕天使.png';
    initializeMonster(30);
    startGame(1500-Math.min(1000, 100*ange), 30+5*ange, () => {
      showTextTypingEffect(`堕天使を倒した！`, () => {
        ange += 1;
        removeEvent('event03');
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
  });
}
