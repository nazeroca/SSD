// event3.js
function startEvent20() {
  eventCount++;
  updateEventCountDisplay();
  currentEvent = 'event20';
  showSceneImage('./image/宝箱.png')
  let noteCount = getSecureRandomInRange(50, 60);
  showTextTypingEffect('宝箱を見つけた！', () => {
    buttonGroup.innerHTML = '';
    const btnA = document.createElement('button');
    btnA.className = 'start-button';
    btnA.textContent = '開ける';
    btnA.style.backgroundColor = '#33CC99';
    btnA.onclick = () => {
      clearTimeout(autoSelectTimer);
      hideSceneImage();
      if (secureRandom() < 0.2 && !flagG) {
        buttonGroup.classList.add('hidden');
        showSceneImage('./image/財宝.png');
        flagG = true;
        updateFlagGrid();
        showTextTypingEffect('緑の魔導書を手に入れた！', () => {
          hideSceneImage();
          removeEvent(currentEvent);
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
        });
      } else {
        buttonGroup.classList.add('hidden');
        showSceneImage('./image/ミミック.png');
        showTextTypingEffect('宝箱はミミックだった！', () => {
          hideSceneImage();
          document.getElementById('monster-img').src = './image/ミミック.png';
          initializeMonster(noteCount);
          startGame(1200, noteCount, () => {
            showTextTypingEffect(`ミミックを倒した！`, () => {
              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
            });
          });
        });
      }



    };

    const btnB = document.createElement('button');
    btnB.className = 'start-button';
    btnB.textContent = '開けない';
    btnB.style.backgroundColor = '#FF9933';
    btnB.onclick = () => {
      clearTimeout(autoSelectTimer);
      hideSceneImage();
      if (secureRandom() < 0.5) {
        buttonGroup.classList.add('hidden');
        showTextTypingEffect('無事に立ち去ることが出来た！', () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
        });
      } else {
        hideSceneImage();
        buttonGroup.classList.add('hidden');
        showTextTypingEffect('背後から何かに襲われた！\n宝箱はミミックだったようだ…', () => {
          document.getElementById('monster-img').src = './image/ミミック.png';
          initializeMonster(noteCount);
          startGame(1200, noteCount, () => {
            showTextTypingEffect(`ミミックを倒した！`, () => {
              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
            });
          });
        });
      }
    };


    buttonGroup.appendChild(btnA);
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
