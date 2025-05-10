const gameArea = document.getElementById('game-area');
const buttonGroup = document.getElementById('button-group');
const hitSound = document.getElementById('hit-sound');
const reflectSound = document.getElementById('reflect-sound');
const healSound = document.getElementById('heal-sound');
const barrierSound = document.getElementById('barrier-sound');
const litSound = document.getElementById('lit-sound');
const defeatSound = document.getElementById('defeat-sound');
const infoDisplay = document.getElementById('info');
const textWindow = document.getElementById('text-window');
// 既存グローバル変数の上部あたりに追加
let eventCount = 0;

// 追加グローバル変数
let otherSoundsEnabled = true;  // hitSound以外の音のON/OFF（初期はON）
let fallDuration = 3000;
let intervalId = null;
let circleCount = 0;
let maxCircles = 100;
let circles = [];

let flagR = false;
let flagG = false;
let flagB = false;  


let flagDR = false;
let flagDG = false;
let flagDB = false; 

let  = true; // スキップ可能状態を管理するフラグ


let ange = 0;

let debugModeEnabled = false;




let flagRB = true; // スキップ可能状態を管理するフラグ


// グローバルフラグ（ボタンが押されたときに true に設定する）
let skipOnEndProcessingB = false;



let currentEvent = null;

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


function showSceneImage(imageSrc) {
  const container = document.getElementById("scene-container");
  const img = document.getElementById("scene-img");
  container.classList.remove("hidden");
  img.src = imageSrc;
}

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

function updateEventCountDisplay() {
  infoDisplay.textContent = `${eventCount}F`;
}


function updateMonsterHPBar() {
  const hpBar = document.getElementById('monster-hp');
  if (hpBar && monsterMaxHP > 0) {
    const percentage = (monsterHP / monsterMaxHP) * 100;
    hpBar.style.width = percentage + '%';
  }
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
  if (defeatSound && otherSoundsEnabled) {
    defeatSound.currentTime = 0;
    defeatSound.play().catch(error => console.error("Defeat sound error:", error));
  }
}

function showTextTypingEffect(text, callback, speed = 50) {
  textWindow.classList.remove('hidden');
  textWindow.textContent = '';
  let index = 0;
  
  function typeChar() {
    if (index < text.length) {
      const char = text.charAt(index);
      textWindow.textContent += char;
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


function showTextTypingEffectS(speaker, text, callback, speed = 50) {
  textWindow.classList.remove('hidden');
  textWindow.innerHTML = '';

  const speakerDiv = document.createElement('div');
  speakerDiv.className = 'speaker';
  speakerDiv.textContent = speaker;
  speakerDiv.style.top = '0';
  speakerDiv.style.left = '0';
  speakerDiv.style.padding = '0.5vmin';
  speakerDiv.style.fontWeight = 'bold';

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  // ここで発言者と発言の間の空白を広げる（例：'6vmin' に変更）
  messageDiv.style.marginTop = '0.5vmin';

  textWindow.appendChild(speakerDiv);
  textWindow.appendChild(messageDiv);

  let index = 0;
  function typeChar() {
    if (index < text.length) {
      messageDiv.textContent += text.charAt(index);
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



function updateSkipButtonVisibility() {
  const skipButton = document.getElementById('skip-button');
  if (!skipButton) return;
  
  // : ボタン有効条件, skipOnEndProcessing の値によりスタイル調整
  if (!flagRB && !skipOnEndProcessingB) {
    skipButton.style.display = 'none';
  } else {
    skipButton.style.display = 'block';
    if (flagRB && !skipOnEndProcessingB) {
      skipButton.disabled = false;
      play(healSound);
      skipButton.style.opacity = '1';
    } else if (!flagRB && skipOnEndProcessingB) {
      skipButton.disabled = true;
      skipButton.style.opacity = '0.5';
    }
  }
}


function spawnCircle(options = {}) {
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


function showTeletext(message) {
  // 上部領域 (.top-screen) を取得
  const topArea = document.querySelector('.top-screen');
  if (!topArea) {
    console.error('上部領域 (.top-screen) が見つかりません。');
    return;
  }
  
  // すでにテロップが表示されていれば、消失を待ってから再表示する
  if (topArea.querySelector('.teletext')) {
    setTimeout(() => {
      showTeletext(message);
    }, 500); // 500ms 待機して再チェック
    return;
  }
  
  // テロップ要素を作成
  const teletext = document.createElement('div');
  teletext.className = 'teletext';
  teletext.textContent = message;
  
  // 上部領域に追加
  topArea.appendChild(teletext);
  
  // すぐにスライドイン開始
  teletext.classList.add('slide-in');
  
  // スライドイン完了（約1秒）後＋5秒表示＝6秒後にテロップをスライドアウトさせる
  setTimeout(() => {
    teletext.classList.remove('slide-in');
    teletext.classList.add('slide-out');
    
    // スライドアウト完了後（1秒後）にテロップ要素を削除
    setTimeout(() => {
      teletext.remove();
    }, 1000);
  }, 4000);
}






function updateFlagGrid() {
  const grid = document.getElementById("flag-grid");
  if (!grid) return;
  // 既存の内容をクリア
  grid.innerHTML = "";

  // 円形表示用の div を作成
  const circleDiv = document.createElement("div");
  circleDiv.style.width = "100%";
  circleDiv.style.height = "100%";
  circleDiv.style.borderRadius = "50%";

  // 各セグメントの色（true なら対応する色、false なら灰色）
  const colorSegment1 = flagR ? "#FF97C2"   : "grey";   // 例：flagR のセグメント
  const colorSegment2 = flagG ? "#93FFAB" : "grey";   // 例：flagG のセグメント
  const colorSegment3 = flagB ? "#8EB8FF"  : "grey";    // 例：flagB のセグメント

  // conic-gradient を利用して、円を 3 分割（各 120°）する
  circleDiv.style.background = `conic-gradient(
    ${colorSegment1} 0deg 120deg,
    ${colorSegment2} 120deg 240deg,
    ${colorSegment3} 240deg 360deg
  )`;

  grid.appendChild(circleDiv);
}



function fadeOutIn(callback) {
  const overlay = document.getElementById('fade-overlay');
  overlay.style.opacity = '1';
  const footstepSound = document.getElementById('footstep-sound');
  if (footstepSound && otherSoundsEnabled) {
    footstepSound.currentTime = 0;
    footstepSound.play().catch(error => console.error("Footstep sound error:", error));
  }
  setTimeout(() => {
    if (callback) callback();
    overlay.style.opacity = '0';
  }, 1500);
}

function openSettings() {
  const settingsWindow = document.getElementById('settings-window');
  // active クラスを追加して、display を flex に変更
  settingsWindow.classList.add('active');

  document.getElementById('other-sounds-toggle').checked = otherSoundsEnabled;
  // デバッグモードのトグルボタンの状態を反映
  document.getElementById('debug-toggle').checked = debugModeEnabled;
}

function closeSettings() {
  const settingsWindow = document.getElementById('settings-window');
  // active クラスを削除して、設定ウインドウを非表示に戻す
  settingsWindow.classList.remove('active');

  otherSoundsEnabled = document.getElementById('other-sounds-toggle').checked;
  debugModeEnabled = document.getElementById('debug-toggle').checked;
  console.log(debugModeEnabled);
}

const skipButton = document.getElementById('skip-button');
skipButton.addEventListener('click', function() {
  if (flagRB && !skipOnEndProcessingB) {
    skipOnEndProcessingB = true;
    flagRB = false;
    updateSkipButtonVisibility();
  }
});




// ノーツ音量の変更（20%刻み）
document.getElementById('volume-decrease').addEventListener('click', function() {
  let current = Math.round(hitSound.volume * 100);
  if (current > 0) {
    current -= 20;
    hitSound.volume = current / 100;
    document.getElementById('volume-value').textContent = current + '%';
  }
});

document.getElementById('volume-increase').addEventListener('click', function() {
  let current = Math.round(hitSound.volume * 100);
  if (current < 100) {
    current += 20;
    hitSound.volume = current / 100;
    document.getElementById('volume-value').textContent = current + '%';
  }
});

// 落下速度の変更（範囲：1000～5000、間隔500）
document.getElementById('fallduration-decrease').addEventListener('click', function() {
  if (fallDuration > 1000) {
    fallDuration -= 500;
    document.getElementById('fallduration-value').textContent = fallDuration;
  }
});

document.getElementById('fallduration-increase').addEventListener('click', function() {
  if (fallDuration < 5000) {
    fallDuration += 500;
    document.getElementById('fallduration-value').textContent = fallDuration;
  }
});


document.getElementById('settings-button').addEventListener('click', openSettings);
document.getElementById('close-settings').addEventListener('click', closeSettings);


// イベント名と関数の対応表をグローバル変数で定義


// function startRandomEvent(exclude = []) {
//   // 文字列が "event" で始まっていない場合もカバーするための正規化関数
//   const formatKey = key => {
//     // すでに "event" プレフィックスがついているか？
//     if (typeof key === "string" && key.startsWith("event")) {
//       // プレフィックスの後の数字部分を取り出し、2桁に整形
//       const numberPart = key.slice(5);
//       return "event" + numberPart.padStart(2, "0");
//     } else {
//       // 数字のみ、もしくは "event" で始まっていない場合は、"event" を付加して整形
//       return "event" + key.toString().padStart(2, "0");
//     }
//   };

//   // exclude 配列内のすべての項目を正規化
//   const normalizedExclude = exclude.map(formatKey);

//   // eventFunctions のキーリストから、除外対象のものを取り除く
//   const possibleEvents = Object.keys(eventFunctions)
//     .filter(eventKey => !normalizedExclude.includes(eventKey));

//   // もし候補がなければ何もしない
//   if (possibleEvents.length === 0) return;

//   // ランダムにイベントを選び、該当する関数を実行する
//   const nextKey = possibleEvents[Math.floor(secureRandom() * possibleEvents.length)];
//   eventFunctions[nextKey]();
// }

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

const eventFunctions = {
  'event01': startEvent01,
  'event02': startEvent02,
  'event03': startEvent03,
  'event04': startEvent04,
  'event14': startEvent14,
  'event15': startEvent15,
  'event17': startEvent17,
  'event21': startEvent21,
  'event23': startEvent23,
  'event25': startEvent25,
  'event31': startEvent31,
  'event52': startEvent52
};

// 各イベントの重みを設定（数値が大きいほど選ばれやすくなる）
// ここでは special イベントは低い重み(例: 0.2)となっている
const eventWeights = {
  'event01': 3,
  'event02': 3,
  'event03': 3,
  'event04': 3,
  'event14': 3,
  'event15': 3,
  'event17': 3,
  'event21': 3,
  'event23': 3,
  'event25': 3,
  'event31': 3
};

// イベントの追加用関数
function addEvent(eventKey, eventFunction, weight = 1) {
  eventFunctions[eventKey] = eventFunction;
  eventWeights[eventKey] = weight;
}

// イベントの削除用関数
function removeEvent(eventKey) {
  delete eventFunctions[eventKey];
  delete eventWeights[eventKey];
}

function printEventProbabilities() {
  // 全イベントの総重みを計算
  let totalWeight = 0;
  for (const key in eventWeights) {
    totalWeight += eventWeights[key];
  }
  
  // 重みごとにイベントキーをグループ化する
  const groups = {};
  for (const key in eventWeights) {
    const weight = eventWeights[key];
    if (!groups[weight]) {
      groups[weight] = [];
    }
    groups[weight].push(key);
  }
  
  // 各グループごとに、各イベントの確率を計算し、まとめて出力
  for (const weight in groups) {
    const group = groups[weight];
    group.sort();
    // 各イベントの確率は (weight ÷ totalWeight) × 100
    // 小数点以下2桁まで表示
    const probabilityPercent = ((Number(weight) / totalWeight) * 100).toFixed(2);
    console.log(`${group.join(", ")}: ${probabilityPercent}% each`);
  }
}



function startRandomEvent(exclude = []) {
  // デバッグモードが有効の場合、任意のイベント番号入力用のプロンプトを表示
  if (debugModeEnabled) {
    let debugInput = prompt(
      "【デバッグモード】"
    );
    if (debugInput !== null && debugInput.trim() !== "") {
      const formatKey = key => {
        if (typeof key === "string" && key.startsWith("event")) {
          const numberPart = key.slice(5);
          return "event" + numberPart.padStart(2, "0");
        } else {
          return "event" + key.toString().padStart(2, "0");
        }
      };
      const debugKey = formatKey(debugInput.trim());
      // eventFunctions に存在するか、グローバルスコープ (window) に "startEvent" + 数字 で存在するかチェック
      let debugEventFunction = eventFunctions[debugKey];
      if (!debugEventFunction && typeof window["startEvent" + debugInput.trim()] === "function") {
        debugEventFunction = window["startEvent" + debugInput.trim()];
      }
      if (typeof debugEventFunction === "function") {
        debugEventFunction();
        return;
      } else {
        alert("エラー: イベント " + debugKey + " は存在しません。");
        return startRandomEvent(exclude);
      }
    }
  }
  
  // 以下は通常のランダムイベント選択処理

  // 文字列が "event" で始まっていない場合もカバーするための正規化関数
  const formatKey = key => {
    if (typeof key === "string" && key.startsWith("event")) {
      const numberPart = key.slice(5);
      return "event" + numberPart.padStart(2, "0");
    } else {
      return "event" + key.toString().padStart(2, "0");
    }
  };

  // exclude 配列内のすべての項目を正規化
  const normalizedExclude = exclude.map(formatKey);

  // eventFunctions のキーリストから、除外対象のものを取り除く
  const possibleEventKeys = Object.keys(eventFunctions)
    .filter(key => !normalizedExclude.includes(key));

  if (possibleEventKeys.length === 0) return;
  
  if (eventCount == 8) {
    addEvent('event26', startEvent26, 4);
    addEvent('event36', startEvent36, 4);
    addEvent('event18', startEvent18, 4);
    addEvent('event13', startEvent13, 4);
    addEvent('event05', startEvent05, 4);
    addEvent('event16', startEvent16, 4);
    addEvent('event08', startEvent08, 4);
    addEvent('event10', startEvent10, 4);
    addEvent('event12', startEvent12, 4);
    addEvent('event09', startEvent09, 4);
    addEvent('event07', startEvent07, 4);
    addEvent('event11', startEvent11, 2);
    addEvent('event22', startEvent22, 4);
    addEvent('event20', startEvent20, 4);
    addEvent('event33', startEvent33, 4);
    addEvent('event45', startEvent45, 4);
    addEvent('event47', startEvent47, 4);
    addEvent('event48', startEvent48, 4);
    addEvent('event49', startEvent49, 1);
    addEvent('event29', startEvent29, 5);
    addEvent('event27', startEvent27, 5);
    addEvent('event28', startEvent28, 5);
    addEvent('event53', startEvent53, 5);
  } else if (eventCount == 16) {
    addEvent('event35', startEvent35, 5);
    addEvent('event06', startEvent06, 5);
    addEvent('event32', startEvent32, 5);
    addEvent('event19', startEvent19, 5);
    addEvent('event34', startEvent34, 5);
    addEvent('event37', startEvent37, 5);
    addEvent('event51', startEvent51, 5);
    addEvent('event50', startEvent50, 5);
    addEvent('event46', startEvent46, 5);
    addEvent('event44', startEvent44, 5);
    addEvent('event43', startEvent43, 5);
    addEvent('event42', startEvent42, 5);
  } else if (eventCount == 24) {
    addEvent('event24', startEvent24, 5);
    addEvent('event41', startEvent41, 5);
    addEvent('event40', startEvent40, 5);
    addEvent('event39', startEvent39, 5);
    addEvent('event60', startEvent60, 1);
  }
  if(eventCount>24){
    removeEvent('event60');
    addEvent('event60', startEvent60, eventCount-23);
  }
  // 重みでランダムに選ぶための準備
  let totalWeight = 0;
  const weightedEvents = [];
  for (const key of possibleEventKeys) {
    // weightが設定されていない場合はデフォルト1とする
    const weight = eventWeights[key] || 1;
    weightedEvents.push({ key, weight });
    totalWeight += weight;
  }

  // 0〜totalWeight未満の乱数を生成
  let rnd = secureRandom() * totalWeight;
  let selectedKey = possibleEventKeys[0];
  for (const event of weightedEvents) {
    rnd -= event.weight;
    if (rnd <= 0) {
      selectedKey = event.key;
      break;
    }
  }

  // 選ばれたイベントの関数を実行
  eventFunctions[selectedKey]();

  // ポップアップの表示
  if (eventCount === 8) {
    showTeletext(`新しい魔物が登場するようになった。`);
  } else if (eventCount === 16) {
    showTeletext(`新しい魔物が登場するようになった。`);
  } else if (eventCount === 24) {
    showTeletext(`魔王を含む新しい魔物が登場するようになった。`);
  }
  printEventProbabilities()
}

// // ----- 使用例 -----
// // イベントリストに後から追加する場合：
// function startEvent05() { console.log("Event 05 is running"); }
// addEvent('event05', startEvent05, 1);

// // 特定のイベントを削除する場合：
// removeEvent('event02');

// // もし "special" イベントの出現確率をさらに下げたい場合、
// // eventWeights['special'] = 0.1; などと調整可能

// // ランダムにイベントを開始（excludeに "event06" を指定した例）
// startRandomEvent(['event06']);

// // ランダムに選出されたイベントが重みを反映して呼び出される











// 最初は必ずイベント0を実行する
updateFlagGrid();
updateSkipButtonVisibility();
startEvent00 ();
