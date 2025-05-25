function startEvent33() {
    QText = [
  'VS　紫の宝箱',
  '【ＨＰ】???\n【説明】\n怪しすぎる宝箱。確率は50%らしい。'
];
  eventCount++;
  updateEventCountDisplay();
  currentEvent = 'event33';
  showSceneImage('./image/宝箱E.png')
  let noteCount = getSecureRandomInRange(70, 90);
  showTextTypingEffect('宝箱を見つけた！…が、明らかに怪しい雰囲気を放っている…\n大人しく立ち去ろう。', () => {
    buttonGroup.innerHTML = '';
    const btnB = document.createElement('button');
    btnB.className = 'start-button';
    btnB.textContent = '開けない';
    btnB.style.backgroundColor = '#FF9933';
    btnB.onclick = () => {
      clearTimeout(autoSelectTimer);
      hideSceneImage();
      if (secureRandom() < 0.5) {
        buttonGroup.classList.add('hidden');
        showTextTypingEffect('無事に立ち去ることが出来た…', () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
        });
      } else {
        hideSceneImage();
        buttonGroup.classList.add('hidden');
        showTextTypingEffect('背後から何かに襲われた！\nやっぱりミミックだった！', () => {
          document.getElementById('monster-img').src = './image/ミミックE.png';
          initializeMonster(noteCount);
          startGame(900, noteCount, () => {
            showTextTypingEffect(`ミミックを倒した！`, () => {
              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
            });
          });
        });
      }
    };


    buttonGroup.appendChild(btnB);
    buttonGroup.classList.remove('hidden');
    autoSelectTimer = setTimeout(() => {
      const buttons = buttonGroup.querySelectorAll('button');
      if (buttons.length > 0) {
        const randomIndex = Math.floor(secureRandom() * buttons.length);
        buttons[randomIndex].click();
      }
    }, 10000);
  });
}
