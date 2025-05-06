// --- event1 用のボタン設定 ---
const buttonConfigs = [
  { label: '左の魔導士\n🧡高・🗡️低', speed: 2000, count: 40, color: '#F533FF', monsterImage: './image/青魔導士.png' },
  { label: '右の魔導士\n🧡低・🗡️早', speed: 1000, count: 25, color: '#3357FF', monsterImage: './image/紫魔導士.png' }
];

// --- event1 のシナリオ ---
function startEvent02() {
  currentEvent = 'event02';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('目の前に２人の黒魔導士が立ちはだかる！', () => {
    // ボタン1の生成
    const btn1 = document.createElement('button');
    btn1.className = 'start-button';
    btn1.textContent = buttonConfigs[0].label;
    btn1.style.backgroundColor = buttonConfigs[0].color;
    btn1.onclick = () => {
      buttonGroup.classList.add('hidden');
      // 選択されたボタンの設定をそのまま利用
      document.getElementById('monster-img').src = buttonConfigs[0].monsterImage;
      initializeMonster(buttonConfigs[0].count);
      showTextTypingEffect('テキストB', () => {
        startGame(buttonConfigs[0].speed, buttonConfigs[0].count, () => {
          showTextTypingEffect(`スライムを倒した！`, () => {

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
      buttonGroup.classList.add('hidden');
      document.getElementById('monster-img').src = buttonConfigs[1].monsterImage;
      initializeMonster(buttonConfigs[1].count);
      showTextTypingEffect('テキストB', () => {
        startGame(buttonConfigs[1].speed, buttonConfigs[1].count, () => {
          showTextTypingEffect(`スライムを倒した！`, () => {

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
  });
}
