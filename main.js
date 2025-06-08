const gameArea = document.getElementById('game-area');
const buttonGroup = document.getElementById('button-group');
const hitSound = document.getElementById('hit');
const soundMap = {
  foot: 'foot',
  kill: 'kill',
  block: 'block',
  heal: 'heal',
  bari: 'bari',
  lit: 'lit',
  roza: 'roza'
};
// 一括取得
const sounds = {};
for (const [key, id] of Object.entries(soundMap)) {
  sounds[key] = document.getElementById(id);
}

// hit以外の音量を半分に設定
for (const [key, audio] of Object.entries(sounds)) {
  if (key !== 'hit') {
    audio.volume = 0.5;
  }
}

const infoDisplay = document.getElementById('info');
const textWindow = document.getElementById('text-window');
const settingsButton = document.getElementById('settings-button');
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

let ange = 0;

let debugModeEnabled = false;

let flagTim = false;
let zombi =7;


let flagRB = true; // スキップ可能状態を管理するフラグ


// グローバルフラグ（ボタンが押されたときに true に設定する）
let skipOnEndProcessingB = false;

let circlecolor = '#fff';



let currentEvent = null;

function play(soundName) {
  const audio = sounds[soundName];
  if (!audio) {
    console.error("サウンドが見つかりません: ", soundName);
    return;
  }
  audio.currentTime = 0;
  audio.play().catch(error => {
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
  const monsterHPContainer = document.getElementById('monster-hp-container');
  // 両方のコンテナを表示する
  if (monsterContainer && monsterHPContainer) {
    monsterContainer.classList.remove('hidden');
    monsterHPContainer.classList.remove('hidden');
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

function defeatMonster(isRosario = false) {
  const monsterContainer = document.getElementById('monster-container');
  const monsterHPContainer = document.getElementById('monster-hp-container');
  // 両方のコンテナを非表示にする
  if (monsterContainer) {
    monsterContainer.classList.add('hidden');
  }
  if (monsterHPContainer) {
    monsterHPContainer.classList.add('hidden');
  }
  // ロザリオ発動時以外のみkillサウンド
  if (!isRosario && otherSoundsEnabled) {
    play('kill');
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
  if (otherSoundsEnabled) {
    play('foot');
  }
  setTimeout(() => {
    // 設定画面が開いている場合はcallbackを保留
    if (settingsOpen) {
      // 設定画面が閉じられるまで待つ
      const waitForSettingsClose = () => {
        if (!settingsOpen) {
          if (callback) callback();
          overlay.style.opacity = '0';
        } else {
          setTimeout(waitForSettingsClose, 200);
        }
      };
      waitForSettingsClose();
    } else {
      if (callback) callback();
      overlay.style.opacity = '0';
    }
  }, 1500);
}

// セーブ・ロードボタンの表示切替とイベントリスナー
function updateSaveLoadButton() {
  // 何もしない（この関数は不要）
}
// セーブ・ロードボタンのイベントリスナー（重複登録防止のため一度だけ）
(function() {
  const saveBtn = document.getElementById('state-action-button');
  const loadBtn = document.getElementById('state-load-button');
  if (saveBtn && !saveBtn.dataset.listener) {
    saveBtn.addEventListener('click', function() {
      // ボタンのラベルで分岐
      if (saveBtn.textContent === 'ロード') {
        loadGameState();
      } else {
        saveGameState();
      }
    });
    saveBtn.dataset.listener = '1';
  }
  if (loadBtn && !loadBtn.dataset.listener) {
    loadBtn.addEventListener('click', function() {
      loadGameState();
    });
    loadBtn.dataset.listener = '1';
  }
})();
// 設定ウインドウを開くたびにボタン表示を更新
if (settingsButton) {
  settingsButton.addEventListener('click', function() {
    updateSkipImageVisibility();
  });
}

// 設定ウインドウ・ボタンのグローバル初期化
const settingsWindow = document.getElementById('settings-window');

// 歯車ボタンで開閉両対応
let settingsOpen = false;
settingsButton.addEventListener('click', function() {
  settingsOpen = !settingsOpen;
  if (settingsOpen) {
    settingsWindow.classList.add('active');
    showSettingsPage(0);
    document.getElementById('other-sounds-toggle').checked = otherSoundsEnabled;
    document.getElementById('debug-toggle').checked = debugModeEnabled;
    const stateActionButton = document.getElementById("state-action-button");
    if (currentEvent == 'event00') {
      stateActionButton.textContent = "ロード";
    } else {
      stateActionButton.textContent = "セーブ";
    }
    updateSkipImageVisibility();
  } else {
    settingsWindow.classList.remove('active');
    otherSoundsEnabled = document.getElementById('other-sounds-toggle').checked;
    debugModeEnabled = document.getElementById('debug-toggle').checked;
    updateSkipImageVisibility();
  }
});
// バツボタンでも閉じる
const closeBtn = document.getElementById('close-settings');
closeBtn.addEventListener('click', function() {
  settingsOpen = false;
  settingsWindow.classList.remove('active');
  otherSoundsEnabled = document.getElementById('other-sounds-toggle').checked;
  debugModeEnabled = document.getElementById('debug-toggle').checked;
  updateSkipImageVisibility();
});


function updateSkipImageVisibility() {
  const bottomScreen = document.getElementById("game-area");
  let skipIcon = document.getElementById("skip-enabled-icon");
  
  // ① 表示するべき状態の場合
  // 条件 1: 通常のロザリオ画像
  if (flagRB && !skipOnEndProcessingB) {
    if (!skipIcon) {
      skipIcon = document.createElement("img");
      skipIcon.id = "skip-enabled-icon";
      bottomScreen.appendChild(skipIcon);
    }
    skipIcon.src = "./image/ロザリオ.png";
  
  // 条件 2: 白いロザリオ画像
  } else if (!flagRB && skipOnEndProcessingB) {
    if (!skipIcon) {
      skipIcon = document.createElement("img");
      skipIcon.id = "skip-enabled-icon";
      bottomScreen.appendChild(skipIcon);
    }
    skipIcon.src = "./image/白ロザリオ.png";
  
  // ② 表示すべき状態でない場合は削除
  } else {
    if (skipIcon) {
      skipIcon.remove();
    }
    return;
  }
  
  // --- 画像の位置とサイズの設定 ---
  skipIcon.style.position = "absolute";
  // 画面の向きに応じた配置
  const settingsButton = document.getElementById("settings-button");
  const bottomRect = bottomScreen.getBoundingClientRect();
  
  if (settingsButton) {
    const settingRect = settingsButton.getBoundingClientRect();
    if (window.innerWidth > window.innerHeight) {
      // 横長の場合：設定ボタンの右側に表示
      skipIcon.style.left = (settingRect.right - bottomRect.left + 5) + "px";
      skipIcon.style.top = (settingRect.top - bottomRect.top) + "px";
    } else {
      // 縦長の場合：設定ボタンの下側に表示
      skipIcon.style.top = (settingRect.bottom - bottomRect.top + 5) + "px";
      skipIcon.style.left = (settingRect.left - bottomRect.left) + "px";
    }
  } else {
    // 万が一設定ボタンが見つからなければ、デフォルト位置
    skipIcon.style.top = "12vmin";
    skipIcon.style.left = "1vmin";
  }
  
  // 画像サイズ（例：幅 12vmin）
  skipIcon.style.width = "12vmin";
  skipIcon.style.height = "auto";
}


// --- 既存のクリック／タッチイベント ---
// bottom領域の右80%（＝判定ラインより右）で flagRB が true の場合に skipOnEndProcessingB を true に設定
const bottomScreen = document.getElementById("game-area");

bottomScreen.addEventListener("click", function(e) {
  if (!flagRB) return;
  const rect = bottomScreen.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  // 判定ラインが CSS で left:20% となっているので、クリックがそれより右の場合
  if (clickX > rect.width * 0.2) {
    flagRB=false;
    skipOnEndProcessingB = true;
    updateSkipImageVisibility();
  }
});

bottomScreen.addEventListener("touchstart", function(e) {
  if (!flagRB) return;
  const rect = bottomScreen.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  if (touchX > rect.width * 0.2) {
    flagRB=false;
    skipOnEndProcessingB = true;
    updateSkipImageVisibility();
  }
});

// --- 例：フラグ変更時の呼び出し ---
// イベントなどで flagRB や skipOnEndProcessingB の値が変更されたときは、必ず updateSkipImageVisibility() を呼んで表示状態を更新してください。
// 例:
// flagRB = true;
// skipOnEndProcessingB = false;
// updateSkipImageVisibility();


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
function addEvent(eventId, eventFunction, weight = 1) {
  eventFunctions[eventId] = eventFunction;
  eventWeights[eventId] = weight;
}

// イベントの削除用関数
function removeEvent(eventId) {
  delete eventFunctions[eventId];
  delete eventWeights[eventId];
}
// いずれかの未取得魔導書フラグを1つだけtrueにする関数
function acquireRandomFlag() {
  const flags = [];
  if (!flagR) flags.push('flagR');
  if (!flagG) flags.push('flagG');
  if (!flagB) flags.push('flagB');
  if (flags.length === 0) return; // すべてtrueなら何もしない
  const selected = flags[Math.floor(secureRandom() * flags.length)];
  if (selected === 'flagR') flagR = true;
  if (selected === 'flagG') flagG = true;
  if (selected === 'flagB') flagB = true;
  updateFlagGrid();
}

