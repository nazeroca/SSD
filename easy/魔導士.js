// --- event1 用のボタン設定 ---
const buttonConfigs = [
  { label: '左の魔導士\n🧡高・🗡️低', speed: 2000, count: 40, color: '#F533FF', monsterImage: './image/紫魔導士.png' },
  { label: '右の魔導士\n🧡低・🗡️早', speed: 750, count: 25, color: '#3357FF', monsterImage: './image/青魔導士.png' }
];

// --- event1 のシナリオ ---
function startEvent02() {
  QText = [
  'VS　スライム',
  '【ＨＰ】25or40\n【説明】\n双子の魔導士。どちらかを倒せばもう一方はいなくなる。\nちなみに左の魔導士は<span style="color: fuchsia	">ヒダーリ</span>、右の魔導士は<span style="color: blue">ミーギ</span>の名を持つ。\nこっちから見てなんだね。'
];
  currentEvent = 'event02';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/魔導士.png');
  showTextTypingEffect('目の前に２人の黒魔導士が立ちはだかる！', () => {
    // ボタン1の生成
    const btn1 = document.createElement('button');
    btn1.className = 'start-button';
    btn1.textContent = buttonConfigs[0].label;
    btn1.style.backgroundColor = buttonConfigs[0].color;
    btn1.onclick = () => {
      hideSceneImage();
      clearTimeout(autoSelectTimer);
      buttonGroup.classList.add('hidden');
      // 選択されたボタンの設定をそのまま利用
      document.getElementById('monster-img').src = buttonConfigs[0].monsterImage;
      initializeMonster(buttonConfigs[0].count);
      showTextTypingEffect('紫の魔導士を倒すことにした！', () => {
        startGame(buttonConfigs[0].speed, buttonConfigs[0].count, () => {
          showTextTypingEffect(`紫の魔導士を倒した！`, () => {

              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
          });
        });
      });
    };

    // ボタン2の生成
    const btn2 = document.createElement('button');
    btn2.className = 'start-button';
    btn2.textContent = buttonConfigs[1].label;
    btn2.style.backgroundColor = buttonConfigs[1].color;
    btn2.onclick = () => {
      hideSceneImage();
      clearTimeout(autoSelectTimer);
      buttonGroup.classList.add('hidden');
      document.getElementById('monster-img').src = buttonConfigs[1].monsterImage;
      initializeMonster(buttonConfigs[1].count);
      showTextTypingEffect('青の魔導士を倒すことにした！', () => {
        startGame(buttonConfigs[1].speed, buttonConfigs[1].count, () => {
          showTextTypingEffect(`青の魔導士を倒した！`, () => {

              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
          });
        });
      });
    };

    // ボタン群のクリア＆追加
    buttonGroup.innerHTML = '';
    buttonGroup.appendChild(btn1);
    buttonGroup.appendChild(btn2);
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
