function startEvent05() {
  currentEvent = 'event05';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/スライム.png');
  // サイクル回数をランダムに決定（5～10回）
  const totalCycles = Math.floor(secureRandom() * 6) + 2;

  // パラメータの定義
  const firstCycleSpeed = 2500;    // 1回目の生成間隔（ミリ秒）
  const firstCycleCount = getSecureRandomInRange(20, 30);     // 1回目のノーツ個数（モンスターのHP）

  const laterCycleSpeed = 1000;    // 2回目以降の生成間隔（ミリ秒）

  // サイクル処理を再帰的に実施する関数
  function runCycle(cycleIndex, totalCycles) {
    const laterCycleCount = getSecureRandomInRange(20, 30);
    // まず「テキストA」を表示
    document.getElementById('monster-img').src = './image/スライム.png';
    showTextTypingEffect("スライムが現れた！", function() {
      hideSceneImage();
      // サイクルごとに、1回目と以降でパラメータを切り替える
      if (cycleIndex === 0) {
        initializeMonster(firstCycleCount);
        startGame(firstCycleSpeed, firstCycleCount, function() {
    showTextTypingEffect(`スライムを倒した！`, () => {


        showTextTypingEffect("向こうから群れを成したスライムが襲ってきた！\n急いで倒さなければ！", function() {
          if (cycleIndex < totalCycles - 1) {
            runCycle(cycleIndex + 1, totalCycles);
          } else {
            fadeOutIn(function() {
              startRandomEvent(['event01','event05']);
            });
          }
        });
          
        });
        });
      } else {
        initializeMonster(laterCycleCount);
        startGame(laterCycleSpeed, laterCycleCount, function() {
          showTextTypingEffect(`スライムを倒した！`, () => {
                if (cycleIndex < totalCycles - 1) {
                  runCycle(cycleIndex + 1, totalCycles);
                } else {
                  showTextTypingEffect('何とか全て倒せたようだ…', () => {
                    fadeOutIn(() => {
                      startRandomEvent(['event01','event05']);
                    });
                  });
                }     
          });
        });
      }
    });
  }

  // 最初のサイクルから開始
  runCycle(0, totalCycles);
}
