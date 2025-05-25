function startEvent57() {
  currentEvent = 'event57';
  // ローカル変数 score を初期化（引いた数字の合計）
  let score = 0;
  
  // グローバルフラグ flagC (未定義の場合は false として扱う)
  flagC = false;
  showSceneImage('./image/バニーガール.png');
  // まずは案内テキストを表示してから、初回の「引く」ボタンを表示
  showTextTypingEffect('バニーガールが現れた！', () => {
  showTextTypingEffectS('【バニー】','私とブラックジャックしましょ♡\nさ、早速1枚引いてちょうだい。', () => {
    showInitialDrawButton();
  });
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
      showTextTypingEffectS('【バニー】',num+"のカードね。もちろんまだ引くわよね？", () => {
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
      showTextTypingEffect("引いたのは"+num + "のカードね。\n今の合計は" + score+"。", () => {
        if (score > 21) {
          // bust: score が 21 超えた場合
          showTextTypingEffect("あーあ、バースト。\nこれは…お仕置きを受けて貰わないと…♡", () => {
            hideSceneImage();
            document.getElementById('monster-img').src = './image/バニーガール.png';
            initializeMonster(100);
              startGameA(3000, 500, 2, 50,20, () => {
                fadeOutIn(() => {
                  startRandomEvent(['event57']);
                });
              });
          });
        } else if (score === 21) {
          // スペシャル: score がちょうど 21 の場合、ノーツは流さずフラグ C を立てる
          flagC = true;
          showTextTypingEffect("ブラックジャック！やるじゃない♡\nこれ、持っていくといいわ。", () => {
            showTextTypingEffect("ロザリオを手に入れた！", () => {
              hideSceneImage();
            fadeOutIn(() => {
              startRandomEvent(['event57']);
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
        showTextTypingEffectS('【バニー】',"あら、やめるのね。そしたら合計"+ score + "だから、"+noteCount+"回、清算お願いね♡", () => {
          startGameNone(1250, noteCount, () => {
            hideSceneImage();
            fadeOutIn(() => {
              startRandomEvent(['event57']);
            });
          });
        });
    };
    
    buttonGroup.appendChild(drawBtn);
    buttonGroup.appendChild(stopBtn);
    buttonGroup.classList.remove('hidden');
  }
}
