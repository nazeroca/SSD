function startEvent56() {
  QText = [
  'VS　イース',
  '【ＨＰ】???\n【説明】\n色彩を司る魔物。\n落ち着いて数えれば大したことはないハズ。'
];
  eventCount++;
  updateEventCountDisplay();
  currentEvent = 'event56';

  // パステルカラーの定義（キーとHEXを対応）
  const pastelMap = {
    red: "#FFB6C1",    // パステル赤
    blue: "#ADD8E6",   // パステル青
    yellow: "#FFF1A0", // パステル黄
    green: "#90EE90"   // パステル緑
  };
  const pastelKeys = ["red", "blue", "yellow", "green"];
  // ノーツの色の出現回数を記録するオブジェクト
  let colorCounts = {
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0
  };

  showSceneImage('./image/イース.png');
  showTextTypingEffect("イースが現れた！", () => {
    // パステルカラーのノーツを100個流す
    newStartGameColorNotes(2000, 25, () => {
      showTextTypingEffect("イースが何か身動きをしている…\n最も多かった色はどれだろうか…", () => {
      // すべてのノーツが流れた後、最も多く出現した色を正解とする
      let maxCount = Math.max(...Object.values(colorCounts));
      let correctColors = pastelKeys.filter(color => colorCounts[color] === maxCount);
      console.log("ColorCounts:", colorCounts, "Max:", maxCount, "正解:", correctColors);
      
      // パステルの赤、青、黄、緑のボタンを固定順（左：赤、次：青、次：黄、右：緑）で表示
      buttonGroup.innerHTML = "";
      const buttonOrder = ["red", "blue", "yellow", "green"];
      
      buttonOrder.forEach(function(color) {
        const btn = document.createElement("button");
        btn.className = "start-button";
        btn.style.backgroundColor = pastelMap[color];
        btn.style.width = "15vw";
        btn.style.height = "15vw";
        btn.onclick = () => {
          clearTimeout(autoSelectTimer);
          buttonGroup.classList.add("hidden");
          if (correctColors.includes(color)) {
            showTextTypingEffect("どうやら正解だったようだ…", () => {
              hideSceneImage();
            fadeOutIn(() => {
              startRandomEvent([currentEvent]);
            });
            });
          } else {
            showTextTypingEffect("イースが襲ってきた！", () => {
              hideSceneImage();
              document.getElementById('monster-img').src = './image/イース.png';
    initializeMonster(50);
            // 不正解の場合：白いノーツを50個流す
            startGameNone(500, 50, () => {
              fadeOutIn(() => {
                startRandomEvent([currentEvent]);
              });
            });
            });
          }
        };
        buttonGroup.appendChild(btn);
      });
      
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
 function newStartGameColorNotes(speed, count, onEnd) {
 	let localCircleCount = 0;
 	let localCircles = [];
 	const intervalId = setInterval(() => {
 		newSpawnColorCircle();
 		if (localCircleCount >= count) clearInterval(intervalId);
 	}, speed);

 	function newSpawnColorCircle() {
 		if (localCircleCount >= count) return;
 		const randIndex = Math.floor(secureRandom() * pastelKeys.length);
 		const chosenColor = pastelKeys[randIndex];
 		colorCounts[chosenColor]++;
 		const circle = document.createElement('div');
 		circle.classList.add('circle');
 		circle.style.backgroundColor = pastelMap[chosenColor];
 		gameArea.appendChild(circle);
 		localCircles.push(circle);
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
 				if (!circle.played && (center - judgeX < 0)) {
 					hitSound.currentTime = 0;
 					hitSound.play().catch(error => console.error('音声再生エラー:', error));
 					circle.played = true;
 					circle.remove();
 					localCircles = localCircles.filter(c => c !== circle);
 					return;
 				}
 				requestAnimationFrame(animate);
 			} else {
 				circle.remove();
 				localCircles = localCircles.filter(c => c !== circle);
 			}
 		}
 		requestAnimationFrame(animate);
 		localCircleCount++;
 	}

 	function checkEnd() {
 		const allGone = localCircles.every(c => {
 			const left = parseInt(c.style.left || '9999', 10);
 			return left <= -80;
 		});
 		if (allGone && localCircleCount >= count) {
 			onEnd();
 		} else {
 			setTimeout(checkEnd, 200);
 		}
 	}
 	setTimeout(checkEnd, 1000);
 }
 }