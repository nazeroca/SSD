function startEvent21() {
        QText = [
  'VS　ゴブリン',
  '【ＨＰ】10～20\n【説明】\n小さな緑色のモンスター。\nときどき卑怯に追撃を行う。'
];
  currentEvent = 'event21';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(6, 8);
  showSceneImage('./image/ゴブリン.png');
  showTextTypingEffect('ゴブリンが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゴブリン.png';
    initializeMonster(noteCount*2+10);
    startGameT2(4000, 1000, noteCount, 5, 2,  () => {
      
      showTextTypingEffect(`ゴブリンを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
