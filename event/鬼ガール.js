function startEvent58() {
  currentEvent = 'event58';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(20, 25);
  showSceneImage('./image/鬼ガール.png');
  showTextTypingEffect('鬼ガールが現れた！', () => {
    showTextTypingEffectS('鬼','また一人ザコがノコノコと現れたな…\n私が捻りつぶしてやるよ！', () => {
      spawnBlueNoteOnce();
      showTextTypingEffectS('鬼','その青色のノーツが流れたら根本を固定してしごくこと。いいな？', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/鬼ガール.png';
    initializeMonster(79);
    startGameBlue(4000, 2000, 3, 30, 1, () => {
      startGameBlue(4000, 1500, 3, 25, 1, () => {  
        startGameBlue(4000, 1000, 3, 20, 1, () => { 
      showTextTypingEffect(`鬼ガールを倒した！`, () => {
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
    });
    });
    });
    });
  });
  });
}


function spawnBlueNoteOnce() {
  // ノーツ生成数を1に設定
  let circleCount = 0;
  let maxCircles = 1;
  let circles = [];

  function spawnCircleBlue() {
    if (circleCount >= maxCircles) return;
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.backgroundColor = '#00aaff'; // 青色

    gameArea.appendChild(circle);
    circles.push(circle);
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = elapsed / fallDuration;
      if (progress < 1) {
        const startX = gameArea.clientWidth;
        const endX = -80;
        const posX = startX + (endX - startX) * progress;
        circle.style.left = posX + 'px';
        requestAnimationFrame(animate);
      } else {
        circle.remove();
        circles = circles.filter(c => c !== circle);
      }
    }
    requestAnimationFrame(animate);
    circleCount++;
  }

  spawnCircleBlue();
}


function startGameBlue(speed1, speed2, count1, count2, sets, onEnd) {
  // ボタン群は非表示
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed1 / 1000}秒⇔${speed2 / 1000}秒で反復${sets}セット攻撃`);

  // ノーツの初期化
  circleCount = 0;
  maxCircles = sets * (count1 + count2);
  circles = [];
  let skipEnded = false;

  // ゲーム終了時のコールバックをグローバルに保持
  gameOnEndCallback = onEnd;

  // 生成済みノーツ数（0～maxCircles-1）
  let noteIndex = 0;

  // ノーツを再帰的に生成する関数
  function spawnNextB() {
    if (skipOnEndProcessingB) {
      if(speed2 == 1000){defeatMonster();}
      skipOnEndProcessingB = false;
      updateSkipImageVisibility();
      skipEnded = true;
      showTextTypingEffect("ロザリオの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (noteIndex < maxCircles) {
      let indexInSet = (noteIndex) % (count1 + count2);
      let delay, color;
      if (indexInSet < count1) {
        delay = speed1;
        color = '#fff'; // 白色
      } else {
        delay = speed2;
        color = '#00aaff'; // 青色
      }
      spawnCircleTBlue({ color });
      noteIndex++;
      setTimeout(spawnNextB, delay);
    }
  }
  // 最初のノーツを生成
  spawnNextB();

  // すべてのノーツがレーンから消えたかどうかをチェック
  const checkEnd = () => {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      if (!skipEnded) { // スキップ時はonEndを呼ばない
        onEnd();
      }
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}

function spawnCircleTBlue(options = {}) {
  if (circleCount >= maxCircles) return;
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.backgroundColor = options.color || circlecolor;

  gameArea.appendChild(circle);
  circles.push(circle);
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = elapsed / fallDuration;
    if (progress < 1) {
      const startX = gameArea.clientWidth;
      const endX = -80;
      const posX = startX + (endX - startX) * progress;
      circle.style.left = posX + 'px';
      const judgeX = gameArea.clientWidth * 0.2;
      const center = posX + 40;
      if (!circle.played && center - judgeX < 0) {
        hitSound.currentTime = 0;
        hitSound.play().catch(error => console.error('音声再生エラー:', error));
        circle.played = true;

        if (options.isExtra) {
          if (options.extraGroupTracker && !options.extraGroupTracker.damageApplied) {
            monsterHP--;
            options.extraGroupTracker.damageApplied = true;
            updateMonsterHPBar();
            if (monsterHP === 0) defeatMonster();
          }
        } else {
          if (monsterHP > 0) {
            monsterHP--;
            updateMonsterHPBar();
            if (monsterHP === 0) defeatMonster();
          }
        }
        circle.remove();
      }
      requestAnimationFrame(animate);
    } else {
      circle.remove();
      circles = circles.filter(c => c !== circle);
    }
  }
  requestAnimationFrame(animate);
  circleCount++;
}