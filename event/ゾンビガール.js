function startEvent60() {
  currentEvent = 'event60';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/ゾンビガール.png');
  showTextTypingEffect('ゾンビガールが現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/ゾンビガール.png';
    initializeMonster(30);
    startGameR2(500, 2000, 30, () => {
      if(zombi >0){
      showTextTypingEffect(`ゾンビガールを倒した？`, () => {
        showTextTypingEffectS('【ゾンビ】',`ワタシト一緒ニ…堕チマショウ…？`, () => {
          const df = Math.floor(secureRandom()*3)+2;
          eventCount = eventCount - df;
          zombi = zombi - df
        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
        });
    });
  }else{
    showTextTypingEffect(`ゾンビガールを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  }
  });
  });
}


