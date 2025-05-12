function startEvent53() {
  // イベントカウントと表示更新
  eventCount++;
  updateEventCountDisplay();
  currentEvent = 'event53';

  // Step 1: テキストAを表示
  showSceneImage('./image/スフィンクス.png');
  showTextTypingEffect("スフィンクスが現れた！", () => {
    // Step 2: ランダムな2桁×2桁の計算式を生成
    let num1 = Math.floor(secureRandom() * 90) + 10; // 10～99
    let num2 = Math.floor(secureRandom() * 90) + 10; // 10～99
    let equation = num1 + " × " + num2 ;
    
    // テキストBとして計算式を表示
    showTextTypingEffectS('【スフィンクス】',equation+'の各位の総和を計算し、その一の位を答えよ。', () => {
      // 計算して答えを求める
      let product = num1 * num2;
      // 各桁の和を求める（文字列に変換して各文字を数値へ）
      let digitSum = String(product)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);
      // 答え N は和の1の位
      let correctAnswer = digitSum % 10;
      console.log("問題:", equation, "答え:", product, "桁和:", digitSum, "正解N:", correctAnswer);
      
      // Step 3: 1000ms間隔で20個のノーツを流す
      startGameNone(2000, 20,  () => {
        showTextTypingEffectS('【スフィンクス】','まだ考える時間が必要か…？', () => {
        addThinkOrAnswerButtons(correctAnswer) 
        });
      });
    });
  });
}


function showChoiceButtons(correctAnswer) {
  // 既存ボタンをクリア
  buttonGroup.innerHTML = "";

  // まず正解を含む3つの選択肢を作る
  const choices = [correctAnswer];

  // ダミー選択肢を2個追加（0～9の中から、正解と被らないもの）
  while (choices.length < 3) {
    let rnd = Math.floor(secureRandom() * 10);
    if (!choices.includes(rnd)) {
      choices.push(rnd);
    }
  }
  // 選択肢の順番をランダムにシャッフル
  choices.sort(() => secureRandom() - 0.5);

  // ボタンを作成して buttonGroup に追加
  choices.forEach(function(choice) {
    let button = document.createElement("button");
    button.className = "start-button";
    button.style.backgroundColor = '#222222';
    button.textContent = String(choice);
    button.onclick = () => {
      clearTimeout(autoSelectTimer);
      buttonGroup.classList.add("hidden");
      if (choice === correctAnswer) {
        // 正解の場合
        showTextTypingEffectS('【スフィンクス】',"よかろう、ここを通れ。\nついでにこれを授けよう。", () => {
          flagRB = true;
    updateSkipButtonVisibility();
    showTextTypingEffect("ロザリオを手に入れた！", () => {
          hideSceneImage();
          fadeOutIn(() => {
            startRandomEvent([currentEvent]);
          });
        });
        });
      } else {
        // 不正解の場合：500ms間隔で30個のノーツを流す（ペナルティ）
        showTextTypingEffect("この凡愚め…貴様に罰を下す…", () => {
          hideSceneImage();
          document.getElementById('monster-img').src = './image/スフィンクス.png';
          initializeMonster(50);
          startGame(500, 50, () => {
            showTextTypingEffect("スフィンクスを倒した！", () => {
            fadeOutIn(() => {
              startRandomEvent([currentEvent]);
            });
          });
          });
        });
      }
    };
    buttonGroup.appendChild(button);
  });
  
  // タイマーはループ終了後に1回だけ設定する
  autoSelectTimer = setTimeout(() => {
    const buttons = buttonGroup.querySelectorAll('button');
    if (buttons.length > 0) {
      const randomIndex = Math.floor(secureRandom() * buttons.length);
      buttons[randomIndex].click();
    }
  }, 10000);
  
  buttonGroup.classList.remove("hidden");
}

function addThinkOrAnswerButtons(correctAnswer) {
  // ボタン領域をクリアする場合
  buttonGroup.innerHTML = "";
  
  // 「もう少し考える」ボタンを作成
  const btnThink = document.createElement("button");
  btnThink.className = "start-button";
  btnThink.textContent = "考える";
  btnThink.style.backgroundColor = '#33CC99';
  // プレースホルダーのクリック処理（後で実装する）
  btnThink.onclick = () => {
    buttonGroup.classList.add("hidden");
    clearTimeout(autoSelectTimer);
    startGameNone(1000, 30,  () => {
      showTextTypingEffect("汝の答えを聞こう…", () => {
      showChoiceButtons(correctAnswer)
    });
    });
  };

  // 「答える」ボタンを作成
  const btnAnswer = document.createElement("button");
  btnAnswer.className = "start-button";
  btnAnswer.textContent = "答える";
  btnAnswer.style.backgroundColor = '#FF9933';
  btnAnswer.onclick = () => {
    clearTimeout(autoSelectTimer);
    buttonGroup.classList.add("hidden");
    showTextTypingEffect("汝の答えを聞こう…", () => {
    showChoiceButtons(correctAnswer)
  });
  };

  // ボタン領域に追加
  buttonGroup.appendChild(btnThink);
  buttonGroup.appendChild(btnAnswer);
  buttonGroup.classList.remove("hidden");
  autoSelectTimer = setTimeout(() => {
    const buttons = buttonGroup.querySelectorAll('button');
    if (buttons.length > 0) {
      const randomIndex = Math.floor(secureRandom() * buttons.length);
      buttons[randomIndex].click();
    }
  }, 10000);
}

