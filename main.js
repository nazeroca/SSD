const gameArea = document.getElementById('game-area');
const buttonGroup = document.getElementById('button-group');
const hitSound = document.getElementById('hit-sound');
const infoDisplay = document.getElementById('info');
const textWindow = document.getElementById('text-window');

const fallDuration = 3000;
let intervalId = null;
let circleCount = 0;
let maxCircles = 100;
let circles = [];

let flagA = false
let flagB = false;  // 新たに導入するフラグB
let currentEvent = null;

let gold = 10;  // ゴールド用の変数

// ゴールド表示更新用の関数
function updateGoldDisplay() {
  const goldDisplay = document.getElementById('gold-display');
  if (goldDisplay) {
    goldDisplay.textContent = "🪙: " + gold;
  }
}
// 戦闘専用：HPバーも付き
function showBattleImage(imageSrc) {
  const container = document.getElementById("monster-container");
  const img = document.getElementById("monster-img");
  const hpBar = document.getElementById("monster-hp-bar");
  container.classList.remove("hidden");
  img.src = imageSrc;
  // 戦闘時はHPバーを表示する
  if (hpBar) {
    hpBar.style.display = "";
  }
}

// 戦闘終了時などに呼び出し
function hideBattleImage() {
  const container = document.getElementById("monster-container");
  container.classList.add("hidden");
}

// 戦闘以外のシーン用：画像のみ表示、HPバーは使わない
function showSceneImage(imageSrc) {
  const container = document.getElementById("scene-container");
  const img = document.getElementById("scene-img");
  container.classList.remove("hidden");
  img.src = imageSrc;
}

// 戦闘以外シーンを消す
function hideSceneImage() {
  const container = document.getElementById("scene-container");
  container.classList.add("hidden");
}


function initializeMonster(hp) {
  monsterMaxHP = hp;
  monsterHP = hp;
  const monsterContainer = document.getElementById('monster-container');
  if (monsterContainer) {
    monsterContainer.classList.remove('hidden');
    updateMonsterHPBar();
  }
}

function updateMonsterHPBar() {
  const hpBar = document.getElementById('monster-hp');
  if (hpBar && monsterMaxHP > 0) {
    const percentage = (monsterHP / monsterMaxHP) * 100;
    hpBar.style.width = percentage + '%';
  }
  
  // 新規追加: HPテキストを更新
  const hpText = document.getElementById('monster-hp-text');
  if (hpText) {
    hpText.textContent = `${monsterHP}/${monsterMaxHP}`;
  }
}


function defeatMonster() {
  const monsterContainer = document.getElementById('monster-container');
  if (monsterContainer) {
    monsterContainer.classList.add('hidden');
  }
  // 敵を倒したときの効果音を再生
  const defeatSound = document.getElementById('defeat-sound');
  if (defeatSound) {
    defeatSound.currentTime = 0;
    defeatSound.play().catch(error => console.error("Defeat sound error:", error));
  }
}


function showTextTypingEffect(text, callback, speed = 75) {
  textWindow.classList.remove('hidden');
  textWindow.textContent = '';
  let index = 0;
  
  function typeChar() {
    if (index < text.length) {
      // 1文字取り出して表示
      const char = text.charAt(index);
      textWindow.textContent += char;
      
      // 効果音の再生： typing-sound のオーディオ要素を取得して再生
      const typingSound = document.getElementById('typing-sound');
      if (typingSound) {
        // 毎回再生するため再生位置をリセット
        typingSound.currentTime = 0;
        typingSound.play().catch(err => console.error('Typing sound error:', err));
      }
      
      index++;
      setTimeout(typeChar, speed);
    } else {
      setTimeout(() => {
        textWindow.classList.add('hidden');
        if (callback) callback();
      }, 800);
    }
  }
  typeChar();
}
function showTextTypingEffectS(speaker, text, callback, speed = 75) {
  // テキストウィンドウを表示し、以前の内容をクリアする
  textWindow.classList.remove('hidden');
  textWindow.innerHTML = '';

  // 左上に表示する話者用のエリアを作成
  const speakerDiv = document.createElement('div');
  speakerDiv.className = 'speaker';
  speakerDiv.textContent = speaker;
  // CSSで左上に固定（必要に応じて調整）
  speakerDiv.style.position = 'absolute';
  speakerDiv.style.top = '0';
  speakerDiv.style.left = '0';
  speakerDiv.style.padding = '5px';
  speakerDiv.style.fontWeight = 'bold';
  // 例：背景色や文字色の設定も追加可能
  // speakerDiv.style.backgroundColor = '#222';
  // speakerDiv.style.color = '#fff';

  // 本文表示用のエリアを作成
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  // 本文部分は、話者の表示が邪魔しないように上部にマージンを設定
  messageDiv.style.marginTop = '30px';

  // 話者と本文の要素をテキストウィンドウに追加
  textWindow.appendChild(speakerDiv);
  textWindow.appendChild(messageDiv);

  let index = 0;
  function typeChar() {
    if (index < text.length) {
      messageDiv.textContent += text.charAt(index);

      // タイピングサウンドの再生
      const typingSound = document.getElementById('typing-sound');
      if (typingSound) {
        typingSound.currentTime = 0;
        typingSound.play().catch(err => console.error('Typing sound error:', err));
      }
      index++;
      setTimeout(typeChar, speed);
    } else {
      // すべての文字が表示し終わった後、短い待ち時間の後に非表示にしてコールバックを実行
      setTimeout(() => {
        textWindow.classList.add('hidden');
        if (callback) callback();
      }, 800);
    }
  }
  typeChar();
}


// ① spawnCircle をオプション対応に変更
function spawnCircle(options = {}) {
  if (circleCount >= maxCircles) return;
  const circle = document.createElement('div');
  circle.classList.add('circle');
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
      if (!circle.played && Math.abs(center - judgeX) < 5) {
        hitSound.currentTime = 0;
        hitSound.play().catch(error => console.error('音声再生エラー:', error));
        circle.played = true;

        // extra group の場合は、グループ全体で1回のみダメージを適用
        if (options.isExtra) {
          if (options.extraGroupTracker && !options.extraGroupTracker.damageApplied) {
            monsterHP--;
            options.extraGroupTracker.damageApplied = true;
            updateMonsterHPBar();
            if (monsterHP === 0) defeatMonster();
          }
        } else {
          // 通常のノーツの場合はその都度ダメージ適用
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

function startGame(speed, count, onEnd) {
  buttonGroup.classList.add('hidden');
  circleCount = 0;
  maxCircles = count;
  circles = [];
  infoDisplay.textContent = `特殊効果：なし`;
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
    infoDisplay.textContent = "";
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
  infoDisplay.textContent = `特殊効果：攻撃間隔がランダム`;

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
      infoDisplay.textContent = "";
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
  infoDisplay.textContent = `特殊効果：徐々にスピードアップ`;
  

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
      infoDisplay.textContent = "";
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

  infoDisplay.textContent = `特殊効果：2段階のスピード変化`;

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
      infoDisplay.textContent = "";
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
  circles = [];
  infoDisplay.textContent = `特殊効果：${probability*100}％の確率で追撃発生`;

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
      infoDisplay.textContent = "";
      onEnd();
    } else {
      setTimeout(checkEnd, 200);
    }
  }

  spawnMain();
}

function fadeOutIn(callback) {
  const overlay = document.getElementById('fade-overlay');
  overlay.style.opacity = '1';
  const footstepSound = document.getElementById('footstep-sound');
  if (footstepSound) {
    footstepSound.currentTime = 0;
    footstepSound.play().catch(error => console.error("Footstep sound error:", error));
  }
  setTimeout(() => {
    if (callback) callback();
    overlay.style.opacity = '0';
  }, 1500);
}


// イベント名と関数の対応表をグローバル変数で定義
const eventFunctions = {
  'event01': startEvent01,
  'event02': startEvent02,
  'event03': startEvent03,
  'event04': startEvent04,
  'event05': startEvent05,
  'event06': startEvent06,
  'event07': startEvent07,
  'event08': startEvent08,
  'event09': startEvent09,
  'event10': startEvent10,
  'event11': startEvent11,
  'event12': startEvent12
};

function startRandomEvent(exclude = []) {
  // 文字列が "event" で始まっていない場合もカバーするための正規化関数
  const formatKey = key => {
    // すでに "event" プレフィックスがついているか？
    if (typeof key === "string" && key.startsWith("event")) {
      // プレフィックスの後の数字部分を取り出し、2桁に整形
      const numberPart = key.slice(5);
      return "event" + numberPart.padStart(2, "0");
    } else {
      // 数字のみ、もしくは "event" で始まっていない場合は、"event" を付加して整形
      return "event" + key.toString().padStart(2, "0");
    }
  };

  // exclude 配列内のすべての項目を正規化
  const normalizedExclude = exclude.map(formatKey);

  // eventFunctions のキーリストから、除外対象のものを取り除く
  const possibleEvents = Object.keys(eventFunctions)
    .filter(eventKey => !normalizedExclude.includes(eventKey));

  // もし候補がなければ何もしない
  if (possibleEvents.length === 0) return;

  // ランダムにイベントを選び、該当する関数を実行する
  const nextKey = possibleEvents[Math.floor(secureRandom() * possibleEvents.length)];
  eventFunctions[nextKey]();
}

function secureRandom() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  // 0xFFFFFFFF + 1 = 2^32 を割ることで、0〜1の範囲に正規化
  return array[0] / (0xFFFFFFFF + 1);
}

function getSecureRandomInRange(min, max) {
  const range = max - min + 1;
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  const randomFraction = randomArray[0] / (0xFFFFFFFF + 1);
  return Math.floor(randomFraction * range) + min;
}





// 最初は必ずイベント0を実行する
startEvent00 ();
