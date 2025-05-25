function startEvent54() {
  // イベントカウント更新
  QText = [
  'VS　ヨグソトース',
  '【ＨＰ】???\n【説明】\n時間を操る魔物。わずかな時間のズレを感じ取り、正解する必要がある。正解するとロザリオが貰える。'
];
  eventCount++;
  updateEventCountDisplay();
  currentEvent = 'event54';

  // A: 1.1～1.9秒の間で乱数により決定
  const A = 1.1 + secureRandom() * (1.9 - 1.1);
  // B: A ± 0.08秒以内（ただし1.1～1.9秒の範囲内）
  let B_unclamped = A + (secureRandom() * 0.16 - 0.08);
  let B = Math.min(1.9, Math.max(1.1, B_unclamped));
  // C: 60秒～120秒の間で乱数により決定
  const C = 61 + Math.floor(secureRandom() * 58);

  // α = floor(C / A) と β = floor(C / B) を算出
  const alpha = Math.floor(C / A);
  let beta = Math.floor(C / B);

  // α と β が同じ値にならないよう、β（＝B）を再算出（試行回数は上限付き）
  let attempts = 0;
  while (beta === alpha && attempts < 100) {
    B_unclamped = A + (secureRandom() * 0.16 - 0.08);
    B = Math.min(1.9, Math.max(1.1, B_unclamped));
    beta = Math.floor(C / B);
    attempts++;
  }

  console.log(`A: ${A.toFixed(3)} s, B: ${B.toFixed(3)} s, C: ${C.toFixed(3)} s, α: ${alpha}, β: ${beta}`);

  // シーン画像と開始テキストを表示
  showSceneImage('./image/ヨグソトース.png');
  showTextTypingEffect("ヨグソトースが現れた！", () => {

    // 生成間隔 A (秒) で 20個のノーツを流す
    startGameNone(A * 1000, 20, () => {

      // 20個終了後、テキストAを表示
       showTextTypingEffectS('ヨグソトース',`今の間隔で1分${C-60}秒ノーツを流したとき、\nノーツは合計で何個流れるか。`, () => {

        // α と β の選択肢を数値の小さい方が左になるようにソートしてオブジェクト配列として用意
        let choices = [
          { value: "alpha", number: alpha },
          { value: "beta",  number: beta }
        ];
        choices.sort((a, b) => a.number - b.number);

        // ボタン群の作成
        buttonGroup.innerHTML = "";
        choices.forEach((choice, index) => {
          const btn = document.createElement("button");
          btn.className = "start-button";
          // 表示ラベルはそれぞれ「α: 数値」または「β: 数値」とする（choice.value は保持しておく）
          btn.textContent = choice.number + '個';
          // ボタンの背景色は固定：
          // 左のボタン（index 0）は緑、右（index 1）はオレンジ
          btn.style.backgroundColor = index === 0 ? '#33CC99' : '#FF9933';
          btn.onclick = () => {
            clearTimeout(autoSelectTimer);
            buttonGroup.classList.add("hidden");
            // αのボタンを押した場合はイベントを直ちに終了
            if (choice.value === "alpha") {
              showTextTypingEffectS('【ヨグソトース】',`正解である。貴様にこれを授けよう。`, () => {
                flagRB = true;
    updateSkipImageVisibility();
                showTextTypingEffect(`ロザリオを手に入れた！`, () => {
    hideSceneImage();
              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
              });
              });
            }
            // βのボタンを押した場合は、追加で (α - 20) 個のノーツを流してから終了
            else if (choice.value === "beta") {
               showTextTypingEffectS('【ヨグソトース】',`正解はこれだ。`, () => {
              const additionalCount = alpha - 20;
              if (additionalCount > 0) {
                startGameNone(A * 1000, additionalCount, () => {
                  hideSceneImage();
                  fadeOutIn(() => {
                    startRandomEvent([currentEvent]);
                  });
                });
              } else {
                hideSceneImage();
                fadeOutIn(() => {
                  startRandomEvent([currentEvent]);
                });
              }
              });
            }
          };
          buttonGroup.appendChild(btn);
        });

        // 一定時間内に選択が行われなかった場合、自動でランダムに選択
        autoSelectTimer = setTimeout(() => {
          const btns = buttonGroup.querySelectorAll("button");
          if (btns.length > 0) {
            const randomIndex = Math.floor(secureRandom() * btns.length);
            btns[randomIndex].click();
          }
        }, 10000);

        buttonGroup.classList.remove("hidden");
      });
    });
  });
}
