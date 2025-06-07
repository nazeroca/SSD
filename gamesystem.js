function startRandomEvent(exclude = []) {
  // デバッグモードが有効の場合、任意のイベント番号入力用のプロンプトを表示
  if (debugModeEnabled) {
  let debugInput = prompt("【デバッグモード】");
  if (debugInput !== null && debugInput.trim() !== "") {
    // 入力値の前後の空白を削除し、全角数字を半角数字に変換
    debugInput = debugInput.trim().replace(/[０-９]/g, function(ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0xFF10 + 0x30);
    });
    // 数字以外の文字は除去（例："abc１23" → "123"）
    const digits = debugInput.replace(/\D/g, "");
    
    // 数字が2桁未満の場合はエラー表示
    if (digits.length < 2) {
      alert("入力形式が誤っています");
      return startRandomEvent(exclude);
    }
    
    // 数字が3桁以上なら、先頭2桁のみ参照する
    const eventNumber = digits.length >= 3 ? digits.substring(0, 2) : digits;

    // 追加: 60が入力された場合、eventCountが5未満ならエラー
    if (eventNumber === "60" && eventCount < 5) {
      alert("ゾンビガールを呼び出せません。");
      return startRandomEvent(exclude);
    }
    
    // "event" + 数字（2桁、足りなければ先頭に0を付与）でフォーマット
    const formattedKey = "event" + eventNumber.padStart(2, "0");
    
    // eventFunctions に存在するか、グローバルスコープ (window) 内に "startEvent" + 数字 で存在するかチェック
    let debugEventFunction = eventFunctions[formattedKey];
    if (!debugEventFunction && typeof window["startEvent" + eventNumber] === "function") {
      debugEventFunction = window["startEvent" + eventNumber];
    }
    if (typeof debugEventFunction === "function") {
      debugEventFunction();
      return;
    } else {
      alert("該当のイベントがありません");
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
    addEvent('event26', startEvent26, 6);
    addEvent('event36', startEvent36, 6);
    addEvent('event18', startEvent18, 6);
    addEvent('event13', startEvent13, 6);
    addEvent('event05', startEvent05, 6);
    addEvent('event16', startEvent16, 6);
    addEvent('event08', startEvent08, 6);
    addEvent('event10', startEvent10, 6);
    addEvent('event12', startEvent12, 6);
    addEvent('event09', startEvent09, 6);
    addEvent('event07', startEvent07, 6);
    addEvent('event11', startEvent11, 3);
    addEvent('event22', startEvent22, 6);
    addEvent('event20', startEvent20, 6);
    addEvent('event45', startEvent45, 6);
    addEvent('event47', startEvent47, 6);
    addEvent('event48', startEvent48, 6);
    addEvent('event49', startEvent49, 1);
    addEvent('event54', startEvent54, 6);
    addEvent('event56', startEvent56, 6);
    addEvent('event57', startEvent57, 6);
  } else if (eventCount == 16) {
    addEvent('event35', startEvent35, 9);
    addEvent('event06', startEvent06, 9);
    addEvent('event32', startEvent32, 9);
    addEvent('event19', startEvent19, 9);
    addEvent('event34', startEvent34, 9);
    addEvent('event37', startEvent37, 9);
    addEvent('event51', startEvent51, 9);
    addEvent('event50', startEvent50, 9);
    addEvent('event46', startEvent46, 9);
    addEvent('event44', startEvent44, 9);
    addEvent('event43', startEvent43, 9);
    addEvent('event42', startEvent42, 9);
    addEvent('event53', startEvent53, 6);
    addEvent('event55', startEvent55, 6);
    addEvent('event33', startEvent33, 6);
    addEvent('event29', startEvent29, 3);
    addEvent('event27', startEvent27, 3);
    addEvent('event28', startEvent28, 3);
  } else if (eventCount == 24) {
    addEvent('event24', startEvent24, 9);
    addEvent('event41', startEvent41, 9);
    addEvent('event40', startEvent40, 9);
    addEvent('event39', startEvent39, 9);
    addEvent('event99', startevent99, 3);
  }
  if(eventCount>24){
    eventWeights['event99'] = eventCount-21;
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

  if (eventCount === 29) {
    startEvent99();
  } else if (eventCount === 14) {
    // 追加: zombiが7でないなら60を確定で呼ぶ
    if (typeof zombi !== 'undefined' && zombi !== 7) {
      startEvent60();
    } else {
      // 58,59,60を等確率でランダムに呼ぶ
      const events = [startEvent58, startEvent59, startEvent60];
      const idx = Math.floor(secureRandom() * 3);
      events[idx]();
    }
  } else {
    // 選ばれたイベントの関数を実行
    eventFunctions[selectedKey]();
  }
  

  // ポップアップの表示
  if (eventCount === 8) {
    showTeletext(`新しい魔物が登場するようになった。`);
  } else if (eventCount === 16) {
    showTeletext(`新しい魔物が登場するようになった。`);
  } else if (eventCount === 24) {
    showTeletext(`魔王を含む新しい魔物が登場するようになった。`);
  }
}

// // ----- 使用例 -----
// // イベントリストに後から追加する場合：
// function startEvent05() { console.log("Event 05 is running"); }
// addEvent('event05', startEvent05, 1);
//
// // 特定のイベントを削除する場合：
// removeEvent('event02');
//
// // もし "special" イベントの出現確率をさらに下げたい場合、
// // eventWeights['special'] = 0.1; などと調整可能
//
// // ランダムにイベントを開始する場合：
// startRandomEvent();
//
// // 除外リストを指定してランダムにイベントを開始する場合：
// startRandomEvent(['event06', 'event08']);
//
// // 除外リストに存在しないイベントを強制的に開始する場合：
// eventFunctions['event07']();

// 最初は必ずイベント0を実行する
updateFlagGrid();
updateSkipImageVisibility();
startEvent00 ();

QText = [
  'オープニング',
  '【説明】\n帰ればいいのに…'
];

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
