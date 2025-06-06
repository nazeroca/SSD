function startEvent25() {
        QText = [
  'VS　人魂',
  '【ＨＰ】45\n【説明】\n怨念をもった人の魂。\n後半の魂ほど恨みの念が強くなり、攻撃も強力になる。'
];
  currentEvent = 'event25';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/人魂.png');
  showTextTypingEffect('人魂が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/人魂.png';
    initializeMonster(35);
    startGameT(3000, 2000, 1000, 20, 10, 5, () => {
      
      showTextTypingEffect(`人魂を倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
