function startEvent06() {
  currentEvent = 'event06';
  showTextTypingEffect('ショップにようこそ', () => {
    showShopButtons();
  });
}

function showShopButtons() {
  buttonGroup.innerHTML = '';

  // ボタン1：魔王の魔導書／200G（数値チェックは内部では20Gになっています）
  const btn1 = document.createElement('button');
  btn1.className = 'start-button';
  btn1.textContent = "魔王の魔導書\n100G";
  btn1.style.backgroundColor = '#FFAAFF';
  btn1.style.display = 'block';
  btn1.style.margin = '10px auto';
  btn1.onclick = () => {
    buttonGroup.classList.add('hidden');
    if (flagB) {
      // 既にアイテム取得済みの場合
      showTextTypingEffect("既に魔導書を持っています。", () => {
        showShopButtons();
      });
    } else {
      if (gold < 100) {
        showTextTypingEffect('ゴールドが足りません。', () => {
          showShopButtons();
        });
      } else {
        gold -= 100;
        updateGoldDisplay();
        flagB = true;
        fadeOutIn(() => {
          startRandomEvent(['event06']);
        });
      }
    }
  };

  const btn2 = document.createElement('button');
  btn2.className = 'start-button';
  btn2.textContent = "魔王の魔導書\n50G";
  btn2.style.backgroundColor = '#FFAAFF';
  btn2.style.display = 'block';
  btn2.style.margin = '10px auto';
  btn2.onclick = () => {
    buttonGroup.classList.add('hidden');
    if (flagB) {
      // 既にアイテム取得済みの場合
      showTextTypingEffect("既に魔導書を持っています。", () => {
        showShopButtons();
      });
    } else {
      if (gold < 50) {
        showTextTypingEffect('ゴールドが足りません。', () => {
          showShopButtons();
        });
      } else {
        gold -= 50;
        updateGoldDisplay();
        flagB = true;
        fadeOutIn(() => {
          startRandomEvent(['event06']);
        });
      }
    }
  };

  // ボタン2：何も買わずに帰る／50G
  const btn3 = document.createElement('button');
  btn3.className = 'start-button';
  btn3.textContent = "安い商品を適当に買う\n20G";
  btn3.style.backgroundColor = '#00AAFF';
  btn3.style.display = 'block';
  btn3.style.margin = '10px auto';
  btn3.onclick = () => {
    buttonGroup.classList.add('hidden');
    if (gold < 20) {
      showTextTypingEffect('テキストH', () => {
        showShopButtons();
      });
    } else {
      gold -= 20;
      updateGoldDisplay();
      buttonGroup.classList.add('hidden');
      fadeOutIn(() => {
        startRandomEvent(['event06']);
      });
    }
  };

  // ボタン3：万引きする
  const btn4 = document.createElement('button');
  btn4.className = 'start-button';
  btn4.textContent = "何も買わずに帰る";
  btn4.style.backgroundColor = '#AAFF00';
  btn4.style.display = 'block';
  btn4.style.margin = '10px auto';
  btn4.onclick = () => {
    buttonGroup.classList.add('hidden');
    showTextTypingEffect('そそくさと店を出ようとすると、ゴブリンに襲われた！', () => {
  // モンスター画像を event3 用の画像に更新
  document.getElementById('monster-img').src = './image/event3.png';
  // モンスターの初期化: ノーツ数40に合わせたHP設定
  initializeMonster(40);
  startGame(500, 40, () => {
    fadeOutIn(() => {
      startRandomEvent(['event03']);
    });
  });
  });
  };


  buttonGroup.appendChild(btn1);
  buttonGroup.appendChild(btn2);
  buttonGroup.appendChild(btn3);
  buttonGroup.appendChild(btn4);
  buttonGroup.classList.remove('hidden');
}
