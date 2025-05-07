const gameArea = document.getElementById('game-area');
const buttonGroup = document.getElementById('button-group');
const hitSound = document.getElementById('hit-sound');
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

let ange = 1;



let currentEvent = null;

function showBattleImage(imageSrc) {
  const container = document.getElementById("monster-container");
  const img = document.getElementById("monster-img");
  const hpBar = document.getElementById("monster-hp-bar");
  container.classList.remove("hidden");
  img.src = imageSrc;
  if (hpBar) {
    hpBar.style.display = "";
  }
}

function hideBattleImage() {
  const container = document.getElementById("monster-container");
  container.classList.add("hidden");
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
  const defeatSound = document.getElementById('defeat-sound');
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
  speakerDiv.style.position = 'absolute';
  speakerDiv.style.top = '0';
  speakerDiv.style.left = '0';
  speakerDiv.style.padding = '5px';
  speakerDiv.style.fontWeight = 'bold';

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  messageDiv.style.marginTop = '30px';

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
  settingsWindow.style.display = 'block';
  // 初期値の表示（ノーツ音量は内部が 0〜1 のため変換）
  document.getElementById('volume-value').textContent = Math.round(hitSound.volume * 100) + '%';
  document.getElementById('fallduration-value').textContent = fallDuration;
  document.getElementById('other-sounds-toggle').checked = otherSoundsEnabled;
}

function closeSettings() {
  const settingsWindow = document.getElementById('settings-window');
  settingsWindow.style.display = 'none';
}

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
  'event06': startEvent06,
  'event12': startEvent12,
  'event14': startEvent14,
  'event15': startEvent15,
  'event17': startEvent17,
  'event21': startEvent21,
  'event23': startEvent23,
  'event25': startEvent25,
  'event31': startEvent31,
  'event49': startEvent49
};

// 各イベントの重みを設定（数値が大きいほど選ばれやすくなる）
// ここでは special イベントは低い重み(例: 0.2)となっている
const eventWeights = {
  'event01': 3,
  'event02': 3,
  'event06': 3,
  'event12': 3,
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


function showPopupMessage(message, displayTime = 3000) {
  const topScreen = document.querySelector('.top-screen');
  if (!topScreen) return;
  
  // ポップアップ要素作成
  const popup = document.createElement('div');
  popup.className = 'popup-message';
  popup.textContent = message;
  
  // top-screenに追加
  topScreen.appendChild(popup);
  
  // 一定時間後にフェードアウト＆削除
  setTimeout(() => {
    popup.classList.add('fade-out');
    popup.addEventListener('transitionend', () => {
      popup.remove();
    });
  }, displayTime);
}



// ランダムイベントを開始する関数（exclude に指定したものは除外）
// 重み付けでランダム選出する仕組みを実装
function startRandomEvent(exclude = []) {
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
  
  if(eventCount==8){
    addEvent('event26', startEvent26, 4);
    addEvent('event36', startEvent36, 4);
    addEvent('event18', startEvent18, 4);
    addEvent('event13', startEvent13, 4);
    addEvent('event05', startEvent05, 4);
    addEvent('event16', startEvent16, 4);
    addEvent('event08', startEvent08, 4);
    addEvent('event10', startEvent10, 4);
    addEvent('event04', startEvent04, 4);
    addEvent('event09', startEvent09, 4);
    addEvent('event07', startEvent07, 4);
    addEvent('event11', startEvent11, 1);
    addEvent('event22', startEvent22, 4);
    addEvent('event20', startEvent20, 4);
    addEvent('event33', startEvent33, 4);
  }else if(eventCount==16){
    addEvent('event35', startEvent35, 5);
    addEvent('event03', startEvent03, 5);
    addEvent('event32', startEvent32, 5);
    addEvent('event19', startEvent19, 5);
    addEvent('event34', startEvent34, 5);
    addEvent('event37', startEvent37, 5);
    addEvent('event29', startEvent29, 5);
    addEvent('event27', startEvent27, 5);
    addEvent('event28', startEvent28, 5);
  }else if(eventCount==24){
    addEvent('event24', startEvent24, 5);
    addEvent('event60', startEvent60, 10);
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

  if (eventCount === 8) {
    showPopupMessage('8Fに到達！\n新しいモンスターが登場するようになった。');
  }else if(eventCount === 16) {
    showPopupMessage('16Fに到達！\n新しいモンスターが登場するようになった。');
  }else if(eventCount === 24) {
    showPopupMessage('24Fに到達！\n魔王を含む新しいモンスターが登場するようになった。');
  }
}

// // ----- 使用例 -----
// // イベントリストに後から追加する場合：
// function startEvent05() { console.log("Event 05 is running"); }
// addEvent('event05', startEvent05, 1);

// // 特定のイベントを削除する場合：
// removeEvent('event02');

// // もし "special" イベントの出現確率をさらに下げたい場合、
// // eventWeights['special'] = 0.1; などと調整可能

// // ランダムにイベントを開始（excludeに "event03" を指定した例）
// startRandomEvent(['event03']);

// // ランダムに選出されたイベントが重みを反映して呼び出される











// 最初は必ずイベント0を実行する
updateFlagGrid();
startEvent00 ();
