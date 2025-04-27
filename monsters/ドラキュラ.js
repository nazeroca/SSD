function startEvent10() {
  currentEvent = 'event10';
  const pgold = 15;
  let noteCount = 10;
  if(!flagA){noteCount = getSecureRandomInRange(8, 12);}
  showTextTypingEffect('ドラキュラが現れた！', () => {
    document.getElementById('monster-img').src = './image/event10.png';
    initializeMonster(noteCount);
    startGameS(2500, noteCount, 0.3, 1000, 10,  () => {
      showTextTypingEffect(`ドラキュラを倒した！\n${pgold}ゴールドを獲得！`, () => {
        gold += pgold;
        updateGoldDisplay();
        // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
        if (flagA) {
          showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
          startGame(1000, pgold, () => {
            fadeOutIn(() => {
              startRandomEvent(['event10']);
            });
          });
        });
        } else {
          fadeOutIn(() => {
            startRandomEvent(['event10']);
          });
        }
      });
    });
  });
}
