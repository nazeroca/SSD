function startGame(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed / 1000}秒ごとの${count}回攻撃`);
  circleCount = 0;
  maxCircles = count;
  circles = [];

  // ノーツ生成開始前にテスト用スキップ状態チェック（必要ならここで設定する）
  // ※各イベント開始時に必要なら、flagRB = true; updateSkipButtonVisibility() を呼び出す

  intervalId = setInterval(() => {
    // 【変更】テスト用スキップが有効なら即中断
    if (skipOnEndProcessingB) {
      clearInterval(intervalId);
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      // ノーツ生成直後に「お守りの不思議な力が発動した！」と表示し、即 onEnd を実行
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    spawnCircle();
    if (circleCount >= maxCircles) clearInterval(intervalId);
  }, speed);

  const checkEnd = () => {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}


function startGameR(speed1, speed2, count, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed1/1000}秒～${speed2/1000}秒ごとに${count}回攻撃`);
  circleCount = 0;
  maxCircles = count;
  circles = [];

  // 再帰的にノーツを生成する関数
  function spawnNext() {
    // スキップボタンが押されている場合は即座に強制終了処理
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (circleCount < maxCircles) {
      spawnCircle();
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
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}


function startGameR2(speed1, speed2, count, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`最速${speed1/1000}秒ごとに${count}回攻撃`);
  circleCount = 0;
  maxCircles = count;
  circles = [];

  // ゲーム終了時のコールバックを保持
  gameOnEndCallback = onEnd;

  // 再帰的にノーツを生成する関数
  function spawnNext() {
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (circleCount < maxCircles) {
      spawnCircle();
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
      // もし全てのノーツが消えていて、かつモンスターのHPがまだ残っている場合、強制的に敗北処理を実行
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}


function startGameA(speed1, speed2, type, count1, count2, onEnd) {
  // ノーツ生成の初期化
  buttonGroup.classList.add('hidden');
  if(speed1>speed2){
  showTeletext(`${speed1/1000}秒から${speed2/1000}秒へ加速する攻撃`);
  }else{
    showTeletext(`${speed1/1000}秒から${speed2/1000}秒へ減速する攻撃`);  
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
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (noteIndex < maxCircles) {
      spawnCircle();
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
      // もし全てのノーツが消えていて、かつモンスターのHPがまだ残っている場合、強制的に敗北処理を実行
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}

function startGameA2(speed1, speed2, speed3, type1, count1, type2, count2, onEnd) {
  // ノーツ生成の初期化
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed1/1000}秒⇒${speed2/1000}秒⇒${speed3/1000}秒へ徐々に加減速する攻撃`);
  circleCount = 0;
  maxCircles = count1 + count2;
  circles = [];
  
  // ゲーム終了時のコールバックをグローバルに保持（必要な場合）
  gameOnEndCallback = onEnd;
  
  // noteIndex は生成したノーツの総数として扱う（0～maxCircles-1）
  let noteIndex = 0;
  
  // 再帰的にノーツを生成する関数
  function spawnNext() {
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (noteIndex < maxCircles) {
      spawnCircle();
      noteIndex++;
      
      let delay;
      if (noteIndex <= count1) {
        // 第1フェーズ：speed1 から speed2 へ、count1個、type1乗のease-out
        let t = noteIndex / count1; // tは0〜1の間
        let factor = 1 - Math.pow((1 - t), type1);
        delay = speed1 - (speed1 - speed2) * factor;
      } else {
        // 第2フェーズ：speed2 から speed3 へ、count2個、type2乗のease-out
        let noteIndex2 = noteIndex - count1;  // 第2フェーズの進行状況
        let t = noteIndex2 / count2;
        let factor = 1 - Math.pow((1 - t), type2);
        delay = speed2 - (speed2 - speed3) * factor;
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
      // もし全てのノーツが消えていて、かつモンスターのHPがまだ残っている場合、強制的に敗北処理を実行
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}


function startGameT(speed1, speed2, speed3, count1, count2, count3, onEnd) {
  // ボタン群は非表示
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed1/1000}秒⇒${speed2/1000}秒⇒${speed3/1000}秒の三段階変化する攻撃`);
  // ノーツの初期化
  circleCount = 0;
  maxCircles = count1 + count2 + count3;
  circles = [];


  // ゲーム終了時のコールバックをグローバル変数に保持
  gameOnEndCallback = onEnd;

  // noteIndexは生成済みノーツ数（0～maxCircles-1）
  let noteIndex = 0;

  // ノーツを再帰的に生成する関数
  function spawnNext() {
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (noteIndex < maxCircles) {
      spawnCircle();  // ノーツを生成＆アニメーション開始
      noteIndex++;    // 生成済みカウントをincrement

      let delay;
      if (noteIndex < count1) {
        // 1フェーズ目：count1 個までは speed1 の間隔
        delay = speed1;
      } else if (noteIndex < count1 + count2) {
        // 2フェーズ目：続く count2 個は speed2 の間隔
        delay = speed2;
      } else {
        // 3フェーズ目：残り count3 個は speed3 の間隔
        delay = speed3;
      }

      setTimeout(spawnNext, delay);
    }
  }
  // 最初のノーツ生成開始
  spawnNext();

  // 終了チェック：すべてのノーツ（spawnCircleで生成されたもの）が
  // レーンから消えたかどうかを定期的にチェックし、終了時に onEnd() を呼ぶ
  const checkEnd = () => {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      // もし全てのノーツが消えていて、かつモンスターのHPがまだ残っている場合、強制的に敗北処理を実行
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}

function startGameT2(speed1, speed2, count1, count2, sets, onEnd) {
  // ボタン群は非表示
  buttonGroup.classList.add('hidden');
  showTeletext(`${speed1/1000}秒⇔${speed2/1000}秒で反復${sets}セット攻撃`);

  // ノーツの初期化
  circleCount = 0;
  maxCircles = sets * (count1 + count2);
  circles = [];

  // ゲーム終了時のコールバックをグローバルに保持
  gameOnEndCallback = onEnd;

  // 生成済みノーツ数（0～maxCircles-1）
  let noteIndex = 0;

  // ノーツを再帰的に生成する関数
  function spawnNext() {
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (noteIndex < maxCircles) {
      spawnCircle();  // ノーツを生成＆アニメーション開始
      noteIndex++;

      // 各セット内でのノーツ番号（0～(count1+count2)-1）
      let indexInSet = (noteIndex - 1) % (count1 + count2);
      let delay;
      if (indexInSet < count1) {
        // 1フェーズ目：セット内の先頭 count1 個は speed1 の間隔
        delay = speed1;
      } else {
        // 2フェーズ目：次の count2 個は speed2 の間隔
        delay = speed2;
      }

      setTimeout(spawnNext, delay);
    }
  }
  // 最初のノーツを生成
  spawnNext();

  // すべてのノーツがレーンから消えたかどうかをチェック
  const checkEnd = () => {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone && circleCount >= maxCircles) {
      // モンスターのHPが残っている場合は敗北処理を強制実行
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  };
  setTimeout(checkEnd, 1000);
}


function startGameP(speed1, count1, probability, speed2, count2, onEnd) {
  buttonGroup.classList.add('hidden');
  showTeletext(`${probability*100}%の確率で${speed2/1000}秒${count2}個の追撃発生`);
  circleCount = 0;
  maxCircles = 1000;
  circles = [];


  let mainSpawned = 0; 

  function spawnMain() {
    if (skipOnEndProcessingB) {
      defeatMonster();
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    if (mainSpawned < count1) {
      if (secureRandom() <= probability) {
        // extra group 発生時：spawnExtraGroup 内で count2 のノーツを生成し、
        // そのグループ全体で damaging は1回のみ行う（後で mainSpawned を1増やす）
        spawnExtraGroup(() => {
          mainSpawned++; // extra group 全体を1発としてカウント
          setTimeout(spawnMain, speed1);
        });
        return;
      }
      // 通常のノーツの場合
      spawnCircle();
      mainSpawned++;
      setTimeout(spawnMain, speed1);
    } else {
      // 全ノーツが生成され終わったら、すべてのノーツがレーン外に出たかチェック
      checkEnd();
    }
  }

  // extra group 用のノーツ生成：このグループ全体でダメージは1回だけ適用
  function spawnExtraGroup(callbackExtra) {
    let extraSpawned = 0;
    // グループ内の damage 適用状況を監視するオブジェクト
    let extraGroupTracker = { damageApplied: false };
    function spawnExtraOne() {
      if (skipOnEndProcessingB) {
        skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      defeatMonster();
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
      if (extraSpawned < count2) {
        // extra group の各ノーツ生成時には、オプションとして isExtra と tracker を渡す
        spawnCircle({ isExtra: true, extraGroupTracker: extraGroupTracker });
        extraSpawned++;
        setTimeout(spawnExtraOne, speed2);
      } else {
        callbackExtra();
      }
    }
    spawnExtraOne();
  }

  function checkEnd() {
    const allGone = circles.every(c => {
      const left = parseInt(c.style.left || '9999', 10);
      return left <= -80;
    });
    if (allGone ) {
      // もし全てのノーツが消えていて、かつモンスターのHPがまだ残っている場合、強制的に敗北処理を実行
      if (monsterHP > 0) {
        defeatMonster();
      }
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  }

  spawnMain();
}

function startGameNone(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  if(currentEvent!=='event54'){
  showTeletext(`${speed / 1000}秒で${count}個の攻撃`);
  }
  circleCount = 0;
  maxCircles = count;
  circles = [];
  intervalId = setInterval(() => {
    if (skipOnEndProcessingB) {
      clearInterval(intervalId);
      skipOnEndProcessingB = false;
      updateSkipButtonVisibility();
      // ノーツ生成直後に「お守りの不思議な力が発動した！」と表示し、即 onEnd を実行
      showTextTypingEffect("お守りの不思議な力が発動した！", () => { onEnd(); });
      return;
    }
    spawnCircleNone();
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

function spawnCircleNone(options = {}) {
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


