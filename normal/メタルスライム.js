function startEvent11() {
  currentEvent = 'event11';
  eventCount++;
  updateEventCountDisplay();
  removeEvent('event11');
  showTextTypingEffect('メタルスライムが現れた！\n戦闘は苛烈になりそうだが、逃げ出そうか？', () => {
    buttonGroup.innerHTML = '';
    const btnA = document.createElement('button');
    btnA.className = 'start-button';
    btnA.textContent = '戦う';
    btnA.style.backgroundColor = '#33CC99';
    btnA.onclick = () => {
      clearTimeout(autoSelectTimer);
      buttonGroup.classList.add('hidden');
      document.getElementById('monster-img').src = './image/メタルスライム.png';
    initializeMonster(50);
    startGame(1000, 50, () => {
      showTextTypingEffect(`メタルスライムを倒した！`, () => {
        const randomIndex = Math.floor(secureRandom() * 3);
  
  if (randomIndex === 0) {
    if (flagR) {
      showTextTypingEffect(`魔導書を入手した！\nただ、すでに持っているものだ…`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
      });
    } else {
      flagR = true;
      updateFlagGrid();
      showTextTypingEffect(`赤の魔導書を入手した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
      });
    }
  } else if (randomIndex === 1) {
    if (flagG) {
      showTextTypingEffect(`魔導書を入手した！\nただ、すでに持っているものだ…`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
      });
    } else {
      flagG = true;
      updateFlagGrid();
      showTextTypingEffect(`緑の魔導書を入手した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
      });
    }
  } else {  // randomIndex === 2
    if (flagB) {
      showTextTypingEffect(`魔導書を入手した！\nただ、すでに持っているものだ…`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
      });
    } else {
      flagB = true;
      updateFlagGrid();
      showTextTypingEffect(`青の魔導書を入手した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
      });
    }
  }
      });
    });
    };

    const btnB = document.createElement('button');
btnB.className = 'start-button';
btnB.textContent = '逃げる';
btnB.style.backgroundColor = '#FF9933';
btnB.onclick = () => {
  clearTimeout(autoSelectTimer);
  buttonGroup.classList.add('hidden');

    showTextTypingEffect('あなたは逃げ出した！', () => {
      fadeOutIn(() => {
        startRandomEvent([currentEvent]);
      });
    });
  
};


    buttonGroup.appendChild(btnA);
    buttonGroup.appendChild(btnB);
    buttonGroup.classList.remove('hidden');
    autoSelectTimer = setTimeout(() => {
      const buttons = buttonGroup.querySelectorAll('button');
      if (buttons.length > 0) {
        const randomIndex = Math.floor(Math.random() * buttons.length);
        buttons[randomIndex].click();
      }
    }, 10000);
  });
}
