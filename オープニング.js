function startEvent00() {
  currentEvent = 'event00';
  
  updateFlagGrid()
  showSceneImage("./image/オープニング.png");
  showTextTypingEffect('あなたはとある城門の前にいる。', () => {
    
    // ボタングループを空にする
    buttonGroup.innerHTML = '';

    // 選択肢が1つだけのボタンを作成する
    const btn = document.createElement('button');
    btn.className = 'start-button';
    btn.textContent = '先へ進む';  // ボタンのラベル（例：「次へ」）
    btn.style.backgroundColor = '#00AEEF'; // 任意の背景色

    // ボタンがクリックされたら、ボタン群を非表示にし、フェード処理後に次のイベントへ移行する
    btn.onclick = () => {
      clearTimeout(autoSelectTimer);
      hideSceneImage();
      buttonGroup.classList.add('hidden');
      fadeOutIn(() => {
        startRandomEvent(['event0']);
      });
    };

    // ボタンを追加して、表示する
    buttonGroup.appendChild(btn);
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
