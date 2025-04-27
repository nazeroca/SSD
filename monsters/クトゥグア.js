function startEvent13() {
  currentEvent = 'event13';
  const pgold = 30;
  let noteCount = 100;
  if(!flagA){noteCount = getSecureRandomInRange(20, 100);}
  
  showTextTypingEffect('クトゥグアが現れた！', () => {
    document.getElementById('monster-img').src = './image/event13.png';
    initializeMonster(noteCount);
    startGame(1000, noteCount, () => {
      showTextTypingEffect(`クトゥグアを倒した！\n${pgold}ゴールドを獲得！`, () => {
        gold += pgold;
        updateGoldDisplay();
        
        // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
        if (flagA) {
          showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
          startGame(4000, pgold, () => {
            fadeOutIn(() => {
              startRandomEvent(['event13']);
            });
          });
        });
        } else {
          fadeOutIn(() => {
            startRandomEvent(['event13']);
          });
        }
      });
    });
  });
}
