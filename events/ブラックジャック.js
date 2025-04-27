function startEvent12() {
  currentEvent = 'event12';
  // ローカル変数 score を初期化（引いた数字の合計）
  let score = 0;
  
  // グローバルフラグ flagC (未定義の場合は false として扱う)
  flagC = false;
  
  // まずは案内テキストを表示してから、初回の「引く」ボタンを表示
  showTextTypingEffectS('【支配人】','カジノへようこそ！\nブラックジャックを開始します。', () => {
    showInitialDrawButton();
  });

  // 初回：ひとつの「引く」ボタンを表示
  function showInitialDrawButton() {
    buttonGroup.innerHTML = "";
    
    const drawBtn = document.createElement("button");
    drawBtn.className = "start-button";
    drawBtn.textContent = "ヒット";
    drawBtn.style.backgroundColor = "#33CCFF";
    drawBtn.style.display = "block";
    drawBtn.style.margin = "10px auto";
    
    drawBtn.onclick = () => {
      buttonGroup.classList.add('hidden');
      let num = Math.floor(secureRandom() * 11) + 1; // 1～11の数字
      score += num;
      showTextTypingEffect("現在：" + num + "\n合計：" + score, () => {
        // 初回引いた後は、判断用の「引く」＋「やめる」ボタンを表示
        showDecisionButtons();
      });
    };
    
    buttonGroup.appendChild(drawBtn);
    buttonGroup.classList.remove('hidden');
  }

  // 「引く」と「やめる」の 2 つのボタンを表示する関数
  function showDecisionButtons() {
    buttonGroup.innerHTML = "";
    
    // 「引く」ボタン
    const drawBtn = document.createElement("button");
    drawBtn.className = "start-button";
    drawBtn.textContent = "ヒット";
    drawBtn.style.backgroundColor = "#33CCFF";
    drawBtn.style.display = "block";
    drawBtn.style.margin = "10px auto";
    
    // 「やめる」ボタン
    const stopBtn = document.createElement("button");
    stopBtn.className = "start-button";
    stopBtn.textContent = "スタンド";
    stopBtn.style.backgroundColor = "#FF6666";
    stopBtn.style.display = "block";
    stopBtn.style.margin = "10px auto";
    
    // 「引く」ボタンの動作
    drawBtn.onclick = () => {
      buttonGroup.classList.add('hidden');
      let num = Math.floor(secureRandom() * 11) + 1;
      score += num;
      showTextTypingEffect("現在：" + num + "\n合計：" + score, () => {
        if (score > 21) {
          // bust: score が 21 超えた場合
          showTextTypingEffect("バーストしました。お仕置きを開始します。", () => {
            document.getElementById('monster-img').src = './image/event1.png';
            initializeMonster(210);
              startGameA(1000, 500, 2, 100,20, () => {
                fadeOutIn(() => {
                  startRandomEvent(['event12']);
                });
              });
          });
        } else if (score === 21) {
          // スペシャル: score がちょうど 21 の場合、ノーツは流さずフラグ C を立てる
          flagC = true;
          showTextTypingEffect("ブラックジャック！\n景品としてこちらを差し上げます。", () => {
            showTextTypingEffect("緑の魔導書を手に入れた！", () => {
            fadeOutIn(() => {
              startRandomEvent(['event12']);
            });
          });
        });
        } else {
          showDecisionButtons();
        }
      });
    };
    
    // 「やめる」ボタンの動作
    stopBtn.onclick = () => {
      buttonGroup.classList.add('hidden');
        let noteCount = 210 - (score * 10);
        showTextTypingEffect("最終スコア：" + score + " です。", () => {
          document.getElementById('monster-img').src = './image/event1.png';
          initializeMonster(noteCount);
          startGame(1000, noteCount, () => {
            fadeOutIn(() => {
              startRandomEvent(['event12']);
            });
          });
        });
    };
    
    buttonGroup.appendChild(drawBtn);
    buttonGroup.appendChild(stopBtn);
    buttonGroup.classList.remove('hidden');
  }
}
