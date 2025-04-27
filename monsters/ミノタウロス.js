function startEvent07() {
  currentEvent = 'event07';
  const pgold = 10;
  let noteCount = 42
  if(!flagA){noteCount = getSecureRandomInRange(28, 42);}
  showTextTypingEffect('ミノタウロスが現れた！', () => {
    document.getElementById('monster-img').src = './image/event7.png';
    initializeMonster(noteCount);
    startGameR(500,1000, noteCount, () => {
      showTextTypingEffect(`ミノタウロスを倒した！\n${pgold}ゴールドを獲得！`, () => {
        gold += pgold;
        updateGoldDisplay();
        
        // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
        if (flagA) {
          showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
          startGame(1000, pgold, () => {
            fadeOutIn(() => {
              startRandomEvent(['event02']);
            });
          });
        });
        } else {
          fadeOutIn(() => {
            startRandomEvent(['event02']);
          });
        }
      });
    });
  });
}
