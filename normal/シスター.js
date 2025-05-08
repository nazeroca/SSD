// event13.js

const startEvent13 = () => {
    currentEvent = 'event13';
    eventCount++;
  updateEventCountDisplay();
    // 50〜100 の整数乱数をターゲット値として発生
    const target = getSecureRandomInRange(1, 100);
    showSceneImage('./image/シスター.png');
    showTextTypingEffect('修道女が現れた！', () => {
    // 最初に「テキストA」を流す
    showTextTypingEffectS(`【修道女】`,`人は生まれ落ちた瞬間から業を背負っているのです。\nさぁ、あなたもそこで懺悔なさい。`, () => {
      // ノーツが流れる間、シーン画像 event13.png を表示
      
  
      // 停止ボタンを buttonGroup 内に配置（オープニング.js と同じ例のスタイル）
      buttonGroup.innerHTML = ''; // 既存のボタン類をクリア
      const stopButton = document.createElement('button');
      stopButton.className = 'start-button';
      stopButton.textContent = '懺悔を終える';
      stopButton.style.backgroundColor = '#000000'; // 他のボタンと同一の背景色例
      buttonGroup.appendChild(stopButton);
      buttonGroup.classList.remove('hidden');
  
      // event13 用変数の初期化（グローバル変数: notesCleared, circleCount, maxCircles, circles）
      notesCleared = 0;
      circleCount = 0;
      maxCircles = 100; // 初回フェーズは 100 個のノーツ
      circles = [];
  
      let stopTriggered = false;
      // 共通の停止処理：stopボタン押下時および初回フェーズ終了時に呼び出す
      const triggerStopAction = () => {
        if (stopTriggered) return;
        stopTriggered = true;
        // ノーツ生成インターバルを停止
        clearInterval(spawner);
        // 画面上にあるノーツは削除（未ヒットのノーツはカウントに加えない）
        circles.forEach(c => {
          if (c.parentNode) {
            c.remove();
          }
        });
        circles = [];
        // 停止ボタンを削除し、buttonGroup を非表示
        if (stopButton.parentNode) stopButton.remove();
        buttonGroup.classList.add('hidden');
        
        // 以下、stop 時の表示処理
          if (notesCleared >= target) {
            showTextTypingEffectS(`【修道女】`,`あなたの罪を赦しましょう。`, () => {
                hideSceneImage();
              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
            });
          } else {
            const additionalNotes = target - notesCleared;
            showTextTypingEffectS(`【修道女】`,`なんですか？そのふざけた懺悔は。サルでも出来ますよ？\n罰を下します。`, () => {
              // 追加フェーズ用に変数をリセット
              circleCount = 0;
              maxCircles = additionalNotes;
              circles = [];
              // 追加フェーズは 500ms 間隔でノーツ生成
              startGameG(500, additionalNotes, () => {
                showTextTypingEffectS(`【修道女】`,'終了です。さっさと出ていけ、クズが。', () => {
                    hideSceneImage();
                  fadeOutIn(() => {
                    startRandomEvent([currentEvent]);
                  });
                });
              });
            });
          }
      };
  
      // 停止ボタンがクリックされた場合に triggerStopAction を呼び出す
      stopButton.addEventListener('click', () => {
        triggerStopAction();
      });
  
      // 1000ms 間隔で 100 個のノーツを生成（初回フェーズでは buttonGroup 表示維持のため keepButtonGroup を true に）
      let spawner = startGameG(1000, 100, () => {
        // 1回目のノーツ生成が完了した場合、まだ停止ボタンが押されていなければ自動的に停止処理を実行
        if (!stopTriggered) triggerStopAction();
      }, { keepButtonGroup: true });
    });
  });
  };
  
  const startGameG = (spawnInterval, totalCount, onEnd, options = {}) => {
    // 初回フェーズで buttonGroup を維持する場合はオプションで指定
    if (!options.keepButtonGroup) {
      buttonGroup.classList.add('hidden');
    }
    circleCount = 0;
    maxCircles = totalCount;
    circles = [];
  
    let intervalId = setInterval(() => {
      spawnCircleG();
      if (circleCount >= maxCircles) {
        clearInterval(intervalId);
      }
    }, spawnInterval);
  
    const checkEnd = () => {
      const allGone = circles.every(c => {
        if (!c.parentNode) return true; // 既に削除済みなら true
        const left = parseInt(c.style.left || '9999', 10);
        return left <= -80;
      });
      if (allGone && circleCount >= maxCircles) {
        onEnd();
      } else {
        setTimeout(() => checkEnd(), 200);
      }
    };
    setTimeout(() => checkEnd(), 1000);
    return intervalId;
  };
  
  const spawnCircleG = (options = {}) => {
    if (circleCount >= maxCircles) return;
    const circle = document.createElement('div');
    circle.classList.add('circle');
    gameArea.appendChild(circle);
    circles.push(circle);
    const startTime = performance.now();
  
    const animate = currentTime => {
      if (!circle.parentNode) return;
      const elapsed = currentTime - startTime;
      const progress = elapsed / fallDuration;
      if (progress < 1) {
        const startX = gameArea.clientWidth;
        const endX = -80;
        const posX = startX + (endX - startX) * progress;
        circle.style.left = posX + 'px';
        const judgeX = gameArea.clientWidth * 0.2;
        const center = posX + 40;
        if (!circle.played && Math.abs(center - judgeX) < 5) {
          hitSound.currentTime = 0;
          hitSound.play().catch(error => console.error('音声再生エラー:', error));
          circle.played = true;
          notesCleared++;  // ヒット時のみカウント（stop時に削除したノーツはカウントしない）
          circle.remove();
          return;
        }
        requestAnimationFrame(animate);
      } else {
        // アニメーション完了時もヒットとしてカウント
        notesCleared++;
        circle.remove();
        circles = circles.filter(c => c !== circle);
      }
    };
    requestAnimationFrame(animate);
    circleCount++;
  };
  