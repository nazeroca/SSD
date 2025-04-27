function startEvent08() {
  currentEvent = 'event08';
  const pgold = 15;
  let noteCount = 40
  if(!flagA){noteCount = getSecureRandomInRange(20, 40);}
  showTextTypingEffect('デュラハンが現れた！', () => {
    document.getElementById('monster-img').src = './image/event8.png';
    initializeMonster(noteCount+10);
    startGameA(3000,1000, 2,noteCount,10, () => {
      showTextTypingEffect(`デュラハンを倒した！\n${pgold}ゴールドを獲得！`, () => {
        gold += pgold;
        updateGoldDisplay();
        
        // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
        if (flagA) {
          showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
          startGame(1000, pgold, () => {
            fadeOutIn(() => {
              startRandomEvent(['event08']);
            });
          });
        });
        } else {
          fadeOutIn(() => {
            startRandomEvent(['event08']);
          });
        }
      });
    });
  });
}
