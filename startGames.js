function startGame(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  circleCount = 0;
  maxCircles = count;
  circles = [];
  intervalId = setInterval(() => {
    spawnCircle();
    if (circleCount >= maxCircles) clearInterval(intervalId);
  }, speed);

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

function startGameR(speed1, speed2, count, onEnd) {
  buttonGroup.classList.add('hidden');
  circleCount = 0;
  maxCircles = count;
  circles = [];

  // ゲーム終了時のコールバックを保持
  gameOnEndCallback = onEnd;

  // 再帰的にノーツを生成する関数
  function spawnNext() {
    if (circleCount < maxCircles) {
      spawnCircle();
      // speed1〜speed2 の間でランダムな遅延を算出
      let delay = speed1 + secureRandom() * (speed2 - speed1);
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

function startGameT(speed1, speed2, speed3, count1, count2, count3, onEnd) {
  // ボタン群は非表示
  buttonGroup.classList.add('hidden');
  
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

function startGameS(speed1, count1, probability, speed2, count2, onEnd) {
  buttonGroup.classList.add('hidden');
  circleCount = 0;
  maxCircles = 1000;
  circles = [];


  let mainSpawned = 0; 

  function spawnMain() {
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
