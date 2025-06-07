function saveGameState() {
  // eventFunctionsを「イベント名→関数名（文字列）」に変換
  const eventFunctionNames = {};
  for (const key in eventFunctions) {
    if (typeof eventFunctions[key] === "function") {
      eventFunctionNames[key] = eventFunctions[key].name;
    }
  }
  const state = {
    eventCount,
    flagR,
    flagG,
    flagB,
    ange,
    flagRB,
    skipOnEndProcessingB,
    circlecolor,
    currentEvent,
    eventFunctions: eventFunctionNames, // ←関数名のみ
    eventWeights
  };
  localStorage.setItem("gameState", JSON.stringify(state));
  showTeletext("セーブしました");
}
// ロード処理：保存されている変数群を読み込み、所定の関数を呼び出す
function loadGameState() {
  const stateStr = localStorage.getItem("gameState");
  if (!stateStr) {
    console.warn("セーブデータが見つかりません");
    return;
  }
  const state = JSON.parse(stateStr);
  eventCount = state.eventCount;
  flagR = state.flagR;
  flagG = state.flagG;
  flagB = state.flagB;
  ange = state.ange;
  flagRB = state.flagRB;
  skipOnEndProcessingB = state.skipOnEndProcessingB;
  circlecolor = state.circlecolor;
  currentEvent = state.currentEvent;

  // eventFunctionsを関数名から再構築
  Object.keys(eventFunctions).forEach(key => delete eventFunctions[key]);
  for (const key in state.eventFunctions) {
    const funcName = state.eventFunctions[key];
    if (typeof window[funcName] === "function") {
      eventFunctions[key] = window[funcName];
    }
  }

  // eventWeightsはそのまま上書き
  Object.keys(eventWeights).forEach(key => delete eventWeights[key]);
  Object.assign(eventWeights, state.eventWeights);

  console.log("ロード完了:", state);

  // ここで必ずsettingsOpen=falseにしてからsettingsWindow.classList.remove('active')
  settingsOpen = false;
  const settingsWindow = document.getElementById('settings-window');
  settingsWindow.classList.remove('active');

  otherSoundsEnabled = document.getElementById('other-sounds-toggle').checked;
  debugModeEnabled = document.getElementById('debug-toggle').checked;
  updateSkipImageVisibility();

  hideSceneImage();
  buttonGroup.classList.add('hidden');
  updateFlagGrid();
  updateSkipImageVisibility();
  showTextTypingEffect(`${eventCount}階のデータを読み込みました。`, () => {
    fadeOutIn(() => {
      startRandomEvent([currentEvent]);
    });
  });
}

// セーブ・ロードボタンのUI/動作仕様を元に戻す
function updateSaveLoadButton() {
  const saveBtn = document.getElementById('state-action-button');
  const loadBtn = document.getElementById('state-load-button');
  if (saveBtn) {
    saveBtn.onclick = function() {
      saveGameState();
    };
  }
  if (loadBtn) {
    loadBtn.onclick = function() {
      loadGameState();
    };
  }
}

// 設定ウインドウのページ切替（1:ヘルプ, 2:設定）
function showSettingsPage(page) {
  const helpPage = document.getElementById('settings-page-help');
  const mainPage = document.getElementById('settings-page-main');
  const prevBtn = document.getElementById('settings-prev');
  const nextBtn = document.getElementById('settings-next');
  if (!helpPage || !mainPage || !prevBtn || !nextBtn) return;
  if (page === 0) {
    helpPage.style.display = '';
    mainPage.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = '';
    updateHelpPage(); 
  } else {
    helpPage.style.display = 'none';
    mainPage.style.display = '';
    prevBtn.style.display = '';
    nextBtn.style.display = 'none';
  }
  // 現在ページを記憶
  showSettingsPage.current = page;
}
// ページ送りボタンのイベント付与
(function() {
  const prevBtn = document.getElementById('settings-prev');
  const nextBtn = document.getElementById('settings-next');
  if (prevBtn) prevBtn.onclick = function() { showSettingsPage(0); };
  if (nextBtn) nextBtn.onclick = function() { showSettingsPage(1); };
})();

function updateHelpPage() {
  const helpTitle = document.getElementById('help-title');
  const helpBody = document.getElementById('help-body');
  if (helpTitle && helpBody) {
    helpTitle.innerHTML = QText[0];
    helpBody.innerHTML = QText[1];
  }
}