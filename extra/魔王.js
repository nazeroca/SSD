function startEvent60() {
  currentEvent = 'event60';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/魔王.png');
  let noteCount = 50;
  showTextTypingEffect('魔王が現れた！', () => {
    showTextTypingEffectS('魔王', 'これでも喰らうがいい！', () => {
      play(litSound);
      if (!flagR == true) {
        showTextTypingEffect('麻痺状態になってしまった…\n麻痺を解除するまで動けない！', () => {    
        startGameMaou(450, noteCount, () => {
          play(healSound);
          showTextTypingEffect('麻痺状態を解除した！', () => {
            startEvent602()
          });
        });
      });
      } else {
        showTextTypingEffect('魔導書の効果で、敵の雷魔法を無効化した！', () => {
          startEvent602();
        });
      }
    });
  });
}

function startEvent602() {
  let N = 0.02;
  if (!flagB) {
    N = 0.2;
    showTextTypingEffectS('魔王', 'ほう…麻痺を解除したか…\nしかし、貴様にこのバリアは割れまい…', () => {
      play(barrierSound);
      showSceneImage('./image/バリア魔王.png');
      stage2(N);
    });
  } else {
    showTextTypingEffectS('魔王', 'ほう…麻痺を解除したか…\nしかし、貴様にこのバリアは割れまい…', () => {
      play(barrierSound);
      showSceneImage('./image/バリア魔王.png');
      showTextTypingEffect('魔導書の効果で、バリアに対する攻撃力があがった！', () => {
        stage2(N);
      });
    });
  }
}

function stage2(N) {
  let noteCount = 20;
  let R = secureRandom();
  startGameR2Maou(400, 1500, noteCount, () => {
    if (R < N) {
      play(defeatSound);
      showTextTypingEffect(`バリアを割った！`, () => {
        hideSceneImage();
        showSceneImage('./image/魔王.png');
        startEvent603();
      });
    } else {
      play(reflectSound);
      showTextTypingEffect(`バリアはまだ割れない！`, () => {
        N += 0.02;
        stage2(N);
      });
    }
  });
}

function startEvent603() {
  let delay = 5000;
  if (flagG) {
    delay = 30000;
    showTextTypingEffectS('魔王', 'ふふ…いまさら小細工など不要か…\nいざ尋常に…！', () => {
      showTextTypingEffect('魔導書の効果で、自身への回復力があがった！', () => {
        stage3(delay);
      });
    });
  } else {
    showTextTypingEffectS('魔王', 'ふふ…いまさら小細工など不要か…\nいざ尋常に…！', () => {
      stage3(delay);
    });

  }

}

function stage3(delay) {
  initializeMonster(285);
  document.getElementById('monster-img').src = './image/魔王.png';
    // テキスト表示完了後、delay ミリ秒待ってから startGameAMaou を呼び出す
    startGameAMaou(4000, 500, 2, 50, 10, () => {
      showTextTypingEffectS('魔王', 'ふはは…やるではないか…', () => {
        // テキスト表示完了後、delay ミリ秒待ってから startGameAMaou を呼び出す
        setTimeout(() => {
          startGameAMaou(3000, 500, 2, 75, 20, () => {
            showTextTypingEffectS('魔王', '我もそろそろ本気を出すとするか…', () => {
              // テキスト表示完了後、delay ミリ秒待ってから startGameAMaou を呼び出す
              setTimeout(() => {
                startGameA(2000, 500, 2, 100, 30, () => {
                  showTextTypingEffect(`魔王を討伐した！！！`, () => { })
                });
              }, delay);
            });
          });
        }, delay);
      });
    });
}


function play(A) {
  if (!A) {
    console.error("要素が見つかりません。");
    return;
  }
  // 毎回 currentTime=0 にリセットして再生
  A.currentTime = 0;
  A.play().catch(error => {
    console.error("再生エラー:", error);
  });
}



function startGameMaou(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed / 1000}秒で${count}個の攻撃`);
  circleCount = 0;
  maxCircles = count;
  circles = [];
  intervalId = setInterval(() => {
    spawnCircleMaou();
    if (circleCount >= maxCircles) clearInterval(intervalId);
  }, speed);

  const checkEnd = () => {
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

function spawnCircleMaou(options = {}) {
  if (circleCount >= maxCircles) return;
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.backgroundColor = options.color || '#fff';

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

function spawnCircleMaou2(options = {}) {
  if (circleCount >= maxCircles) return;
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.backgroundColor = options.color || '#fff';

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
          if (monsterHP === 0) defeatMonster();
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

function startGameAMaou(speed1, speed2, type, count1, count2, onEnd) {
  // ノーツ生成の初期化
  buttonGroup.classList.add('hidden');
  if (speed1 > speed2) {
    showTeletext(`${speed1 / 1000}秒から${speed2 / 1000}秒へ加速`);
  } else {
    showTeletext(`${speed1 / 1000}秒から${speed2 / 1000}秒へ減速`);
  }
  circleCount = 0;
  maxCircles = count1 + count2;
  circles = [];


  // ゲーム終了時のコールバックをグローバルに保持（必要な場合）
  gameOnEndCallback = onEnd;

  // noteIndex は生成したノーツの総数として扱う（0～maxCircles-1）
  let noteIndex = 0;

  // 再帰的にノーツを生成する関数
  function spawnNext() {
    if (noteIndex < maxCircles) {
      spawnCircleMaou2();
      noteIndex++;

      let delay;
      // 1回目の区間：easeOUT的に間隔が短くなる
      if (noteIndex <= count1) {
        // t = noteIndex / count1（0～1）
        let t = noteIndex / count1;
        // Ease-out 関数：f(t) = 1 - (1 - t)^type
        let factor = 1 - Math.pow((1 - t), type);
        // delay を speed1 から speed2 に補間
        delay = speed1 - (speed1 - speed2) * factor;
      } else {
        // 2回目以降は一定間隔 speed2
        delay = speed2;
      }
      setTimeout(spawnNext, delay);
    }
  }
  spawnNext();

  // 終了チェック：全ノーツがレーンから消えているか？
  const checkEnd = () => {
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

function startGameR2Maou(speed1, speed2, count, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed1/1000}秒～${speed2/1000}秒でランダムに${count}個、高速で流れる確率アップ`);
  circleCount = 0;
  maxCircles = count;
  circles = [];

  // ゲーム終了時のコールバックを保持
  gameOnEndCallback = onEnd;

  // 再帰的にノーツを生成する関数
  function spawnNext() {
    if (circleCount < maxCircles) {
      spawnCircleMaou();
      // 以下が変更点
      // 一様乱数 u を取得し、四分円状の変換を適用
      const u = secureRandom();
      const factor = 1 - Math.sqrt(1 - u * u);
      // factor が 0 なら delay は speed1 (最も短い遅延)、1 なら speed2 (最も長い遅延)
      const delay = speed1 + factor * (speed2 - speed1);
      setTimeout(spawnNext, delay);
    }
  }
  // 最初のノーツを生成
  spawnNext();

  // ノーツの全削除（またはレーンからの退出）をチェックするループ
  const checkEnd = () => {
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