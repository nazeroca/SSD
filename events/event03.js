// event3.js
function startEvent03() {
  currentEvent = 'event03';
  showTextTypingEffect('目の前にいかにも怪しい指輪がある…', () => {
    buttonGroup.innerHTML = '';
    const btnA = document.createElement('button');
    btnA.className = 'start-button';
    btnA.textContent = '呪いの黄金指輪を得る';
    btnA.style.backgroundColor = '#33CC99';
    btnA.onclick = () => {
      buttonGroup.classList.add('hidden');
      flagA = true;
      showTextTypingEffect('呪いの黄金指輪を得た！', () => {
        fadeOutIn(() => {
          startRandomEvent(['event03']);
        });
      });
    };

    const btnB = document.createElement('button');
btnB.className = 'start-button';
btnB.textContent = 'ボタンB（ノーツ）';
btnB.style.backgroundColor = '#FF9933';
btnB.onclick = () => {
  buttonGroup.classList.add('hidden');
  // モンスター画像を event3 用の画像に更新
  document.getElementById('monster-img').src = './image/event3.png';
  // モンスターの初期化: ノーツ数40に合わせたHP設定
  initializeMonster(40);
  startGame(500, 40, () => {
    fadeOutIn(() => {
      startRandomEvent(['event03']);
    });
  });
};


    buttonGroup.appendChild(btnA);
    buttonGroup.appendChild(btnB);
    buttonGroup.classList.remove('hidden');
  });
}
