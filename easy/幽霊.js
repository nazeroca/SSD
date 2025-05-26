function startEvent17() {
        QText = [
  'VS　幽霊',
  '【ＨＰ】10\n【説明】\nお菊さんと呼ばれる幽霊。\n割れている皿を見つけると怒り狂い、強力な攻撃を行う。'
];
  currentEvent = 'event17';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/幽霊.png');
  showTextTypingEffect('幽霊が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/幽霊.png';
    initializeMonster(10);
    startGameP(5000, 10, 0.05, 1000, 30, () => {
      
      showTextTypingEffect(`幽霊を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
