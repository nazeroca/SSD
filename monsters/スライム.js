function startEvent01() {
  currentEvent = 'event01';
  const pgold = 10;
  let noteCount = 30
  if(!flagA){noteCount = getSecureRandomInRange(20, 30);}
  
  showTextTypingEffect('スライムが現れた！', () => {
    document.getElementById('monster-img').src = './image/event1.png';
    initializeMonster(noteCount);
    startGame(1000, noteCount, () => {
      // 基本のバトル終了時にゴールドを加算する
      showTextTypingEffect(`スライムを倒した！\n${pgold}ゴールドを獲得！`, () => {
      gold += pgold;
      updateGoldDisplay();
      
      // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
      if (flagA) {
        showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
        startGame(1000, pgold, () => {
          fadeOutIn(() => {
            startRandomEvent(['event01','event05']);
          });
        });
      });
      } else {
        fadeOutIn(() => {
          startRandomEvent(['event01','event05']);
        });
      }
    });
  });
  });
}
