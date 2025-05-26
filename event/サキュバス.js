function startEvent59() {
      QText = [
  'VS　サキュバス',
  '【ＨＰ】50\n【説明】\n人間の精を喰らう魔物。\n最初にあからさまな弱攻撃を放つが、ロザリオを持っていると強制的に発動させられる。'
];
  let A = false;
  if (flagRB == true) {A = true;}
  currentEvent = 'event59';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/サキュバス.png');
  showTextTypingEffect('サキュバスが現れた！', () => {
    showTextTypingEffectS('【サキュバス】', 'あら、私に挑もうっていうのね。いい度胸じゃない。', () => {
      showTextTypingEffectS('【サキュバス】', 'まずは腕試しといこうかしら。', () => {
        hideSceneImage();
        document.getElementById('monster-img').src = './image/サキュバス.png';
        initializeMonster(50);
        if (A) {
          flagRB=false;
    skipOnEndProcessingB = true;
          updateSkipImageVisibility();
          startGameSC(2000, 10, () => {
            monsterHP = 40;
            updateMonsterHPBar();
            showTextTypingEffectS('【サキュバス】', 'あら、こんな弱い攻撃でソレ使っちゃうんだ。大したことなさそうね。', () => {
              showTextTypingEffectS('【サキュバス】', 'そしたら私の本気の攻撃、喰らうといいわ！', () => {
                startGameSC2(750, 40,() => {
                  showTextTypingEffect(`サキュバスを倒した！`, () => {
                    fadeOutIn(() => {
                      startRandomEvent([currentEvent]);
                    });
                  });
                });
              });
            });
          });
        } else {
          startGameSC(2000, 10, () => {
            showTextTypingEffectS('【サキュバス】', 'ふふ、ここまでは所詮腕試しよ。\n私の本気の攻撃、喰らうといいわ！', () => {
              startGameSC2(750, 40,  () => {
                showTextTypingEffect(`サキュバスを倒した！`, () => {
                  fadeOutIn(() => {
                    startRandomEvent([currentEvent]);
                  });
                });
              });
            });
          });
        }

      });
    });
  });
}


function startGameSC(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  circleCount = 0;
  maxCircles = count;
  circles = [];
  let skipEnded = false;

  intervalId = setInterval(() => {
    // 【変更】テスト用スキップが有効なら即中断
    if (skipOnEndProcessingB) {
      clearInterval(intervalId);
      skipOnEndProcessingB = false;
      updateSkipImageVisibility();
      skipEnded = true;
      showTextTypingEffect("勝手にロザリオの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    spawnCircleSC(); // HPを減らすバージョン
    if (circleCount >= maxCircles) clearInterval(intervalId);
  }, speed);

  const checkEnd = () => {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      if (!skipEnded) { 
        onEnd();
      }
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}


function spawnCircleSC(options = {}) {
  if (circleCount >= maxCircles) return;
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.backgroundColor = circlecolor;

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
        if (monsterHP > 0) {
          monsterHP--;
          updateMonsterHPBar();
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


function spawnCircleSC2(options = {}) {
  if (circleCount >= maxCircles) return;
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.backgroundColor = circlecolor;

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


function startGameSC2(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed / 1000}秒ごとの${count}回攻撃`);
  circleCount = 0;
  maxCircles = count;
  circles = [];
  let skipEnded = false;

  intervalId = setInterval(() => {
    spawnCircleSC2(); // HPを減らすバージョンを使う
    if (circleCount >= maxCircles) clearInterval(intervalId);
  }, speed);

  const checkEnd = () => {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      if (monsterHP > 0) {
        defeatMonster(); // HPが残っていればここでdefeatMonster
      }
      if (!skipEnded) { // スキップ時はonEndを呼ばない
        onEnd();
      }
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}
