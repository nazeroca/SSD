function startEvent55() {
  QText = [
  'VS　ロボット',
  '【ＨＰ】???\n【説明】\n全く世界観にそぐわないロボット。体内時計で1分を計る必要がある。'
];
  currentEvent = 'event55';
  eventCount++;
  updateEventCountDisplay();

  // --- シーン画像とテキストAの表示 ---
  showSceneImage('./image/ロボット.png');
  showTextTypingEffect("侵入者ヲ発見シマシタ。セキュリティ認証ヲ行イマス。\nタイマーヲ1分±0.5秒デ止メテクダサイ。", () => {
    // **ノーツ生成とタイマーを並列に開始**
    startGameNoneR(500, 2000, 400, () => { });

    setTimeout(() => {
      // --- UI生成 ---
      const timerDisplay = document.createElement("div");
      timerDisplay.style.fontSize = "10vmin";
      timerDisplay.style.textAlign = "center";
      timerDisplay.style.opacity = "1";
      timerDisplay.textContent = "00.00";

      // 新しく追加するスタイル
      timerDisplay.style.fontFamily = "'Orbitron', sans-serif"; 
      timerDisplay.style.fontWeight = "bold";
      timerDisplay.style.color = "#000000";
      timerDisplay.style.textShadow = "2px 2px 4px rgba(255, 255, 255, 0.5)";


      const controlButton = document.createElement("button");
      controlButton.className = "start-button";
      controlButton.textContent = 'STOP';
      controlButton.style.backgroundColor = "#444";

      buttonGroup.innerHTML = "";
buttonGroup.style.display = "flex";
buttonGroup.style.flexDirection = "column";
buttonGroup.style.alignItems = "center";
buttonGroup.appendChild(timerDisplay);
buttonGroup.appendChild(controlButton);


      // --- タイマーのカウントアップ開始（内部タイマーは継続） ---
      const UIStartTime = performance.now();
      const timerInterval = setInterval(() => {
        const elapsed = (performance.now() - UIStartTime) / 1000;
        const seconds = Math.floor(elapsed).toString().padStart(2, '0');
        const fraction = (elapsed - Math.floor(elapsed)).toFixed(2).substring(1); // ".XX"
        timerDisplay.textContent = seconds + fraction;

        // 10秒超過後は、フェードアウト効果（1秒間かけてopacityを0へ）を適用しつつカウントは継続
        if (elapsed >= 10) {
          let fadeElapsed = elapsed - 10; // fadeElapsed [秒]
          let newOpacity = fadeElapsed < 1 ? 1 - fadeElapsed : 0;
          // ※ transition の設定は一度だけでも良いですが、ここでは毎回適用しても問題ありません
          timerDisplay.style.transition = "opacity 0.1s linear";
          timerDisplay.style.opacity = newOpacity;
        }
      }, 10);

      // --- ノーツ生成は UI 表示時から既に開始中（ここでは startGameNoneR を並列に起動済み） ---

      // --- ボタン押下時の処理 ---
      controlButton.addEventListener("click", () => {
        flagTim = true;
        const pressedTime = (performance.now() - UIStartTime) / 1000;
        buttonGroup.classList.add("hidden");
        buttonGroup.style.display = "none";

        showTextTypingEffectS("結果", "押された時間: " + pressedTime.toFixed(2) + "秒", () => {
          if (pressedTime >= 59.5 && pressedTime <= 60.5) {
            showTextTypingEffectS('ロボット', "認証ニ成功シマシタ。", () => {
              hideSceneImage();
              fadeOutIn(() => { startRandomEvent([currentEvent]); });
            });
          } else {
            

            showTextTypingEffectS('ロボット', "認証ニ失敗シマシタ。排除システムを起動します。", () => {
              hideSceneImage();
              document.getElementById('monster-img').src = './image/ロボット.png';
              initializeMonster(50);
              startGame(500, 50, () => {
                fadeOutIn(() => { startRandomEvent([currentEvent]); });
              });
            });
          }
        });
      });
    }, 1100);
  });
}


function startGameNoneR(speed1, speed2, count, onEnd) {
  showTeletext(`${speed1 / 1000}秒～${speed2 / 1000}秒ごとに${count}回攻撃`);
  circleCount = 0;
  maxCircles = count;
  circles = [];

  // 再帰的にノーツを生成する関数
  function spawnNext() {
    // スキップボタンが押されている場合は即座に強制終了処理
    if (flagTim) {
      flagTim = false;
      onEnd();
      return;
    }
    if (circleCount < maxCircles) {
      spawnCircleNone();
      // speed1〜speed2 の間でランダムな遅延を算出
      let delay = speed1 + secureRandom() * (speed2 - speed1);
      setTimeout(spawnNext, delay);
    }
  }
  // 最初のノーツ生成開始
  spawnNext();

  // 全ノーツが画面外に出たかチェックするループ
  const checkEnd = () => {
    // スキップボタンの強制終了が押されていれば即座に強制終了処理
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}

