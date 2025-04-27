function startEvent11() {
  currentEvent = 'event11';
  const pgold = 100;
  showTextTypingEffect('メタルスライムが現れた！\n戦闘は熾烈なものになりそうだが、戦おうか？', () => {
    buttonGroup.innerHTML = '';
    const btnA = document.createElement('button');
    btnA.className = 'start-button';
    btnA.textContent = '戦う';
    btnA.style.backgroundColor = '#33CC99';
    btnA.onclick = () => {
      buttonGroup.classList.add('hidden');
      document.getElementById('monster-img').src = './image/event11.png';
    initializeMonster(100);
    startGame(1000, 100, () => {
      showTextTypingEffect(`メタルスライムを倒した！\n${pgold}ゴールドを獲得！`, () => {
        gold += pgold;
        updateGoldDisplay();
        
        // flagA がある場合は、追加のノーツを gold の値と同じ回数流す
        if (flagA) {
          showTextTypingEffect('呪いの黄金指輪が反応している！\nゴールドの数だけ追加で攻撃！', () => {
          startGame(1000, pgold, () => {
            fadeOutIn(() => {
              startRandomEvent(['event11']);
            });
          });
        });
        } else {
          fadeOutIn(() => {
            startRandomEvent(['event11']);
          });
        }
      });
    });
    };

    const btnB = document.createElement('button');
btnB.className = 'start-button';
btnB.textContent = '逃げる';
btnB.style.backgroundColor = '#FF9933';
btnB.onclick = () => {
  buttonGroup.classList.add('hidden');
  showTextTypingEffect('あなたは逃げ出した！', () => {
    fadeOutIn(() => {
      startRandomEvent(['event11']);
    });
  });
};


    buttonGroup.appendChild(btnA);
    buttonGroup.appendChild(btnB);
    buttonGroup.classList.remove('hidden');
  });
}
