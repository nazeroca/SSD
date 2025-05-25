function startEvent38() {
  QText = [
  'VS　堕天使',
  '【ＨＰ】30+\n【説明】\n天使が堕ちた姿。今まで倒した天使の数に応じて強くなる。'
];
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
