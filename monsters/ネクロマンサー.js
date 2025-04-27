function startEvent09() {
  currentEvent = 'event09';
  const pgold = 20;
  let noteCount = 13
  if(!flagA){noteCount = getSecureRandomInRange(7, 13);}
  showTextTypingEffect('ネクロマンサーが現れた！', () => {
    document.getElementById('monster-img').src = './image/event9.png';
    initializeMonster(40+noteCount);
    startGameT(1000, 4000, 750, 20, noteCount, 20, () => {
      showTextTypingEffect(`ネクロマンサーを倒した！\n${pgold}ゴールドを獲得！`, () => {
        gold += pgold;
        updateGoldDisplay();
        
        // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
        if (flagA) {
          showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
          startGame(1000, pgold, () => {
            fadeOutIn(() => {
              startRandomEvent(['event09']);
            });
          });
        });
        } else {
          fadeOutIn(() => {
            startRandomEvent(['event09']);
          });
        }
      });
    });
  });
}
