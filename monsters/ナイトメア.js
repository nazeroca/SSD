// event4.js
function startEvent04() {
  currentEvent = 'event04';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(15, 25);
  
  // テキストEを表示
  
  showTextTypingEffect('ナイトメアが現れた！', () => {
    // ノーツを流す
    document.getElementById('monster-img').src = './image/ナイトメア.png';
    initializeMonster(noteCount);
    startGameR(1000, 4000, noteCount, () => {
      // ノーツ流れ終わったらテキストFを表示
      showTextTypingEffect('あなたは悪夢にうなされている。', () => {
        // ランダムに2つのボタンを表示（1つは当たり、1つはハズレ）
        showRandomButtonsForEvent4();
      });
    });
  });
}

function showRandomButtonsForEvent4() {
  let noteCount = getSecureRandomInRange(15, 25);
  // ランダムにボタンを2つ表示（当たり・ハズレ）
  const buttons = [
    { label: '目を覚ます', color: '#000000', isWinner: true },
    { label: '目を覚ます', color: '#000000', isWinner: false }
  ];

  // ボタンをシャッフル
  buttons.sort(() => secureRandom() - 0.5);

  buttonGroup.innerHTML = '';  // 前のボタンを消す
  buttons.forEach(config => {
    const btn = document.createElement('button');
    btn.className = 'start-button';
    btn.textContent = config.label;
    btn.style.backgroundColor = config.color;
    btn.onclick = () => {
      if (config.isWinner) {
        // 当たりボタンを選んだ場合
        buttonGroup.classList.add('hidden');
        showTextTypingEffect('あなたは無事目を覚ますことが出来た。', () => {
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
        });
      } else {
        // ハズレボタンを選んだ場合、再度ノーツを流す
        buttonGroup.classList.add('hidden');
        showTextTypingEffect('起きることが出来ない！', () => {
        document.getElementById('monster-img').src = './image/ナイトメア.png';
    initializeMonster(noteCount);
        startGameR(1000, 4000, noteCount, () => {
          // ノーツ流れ終わったらテキストGを表示
            // 再度ランダムなボタンを表示
            showRandomButtonsForEvent4();
        });
      });
      }
    };
    buttonGroup.appendChild(btn);
  });

  buttonGroup.classList.remove('hidden');
}
