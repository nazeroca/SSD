function startEvent03() {
  currentEvent = 'event03';
  eventCount++;
  updateEventCountDisplay();
  showSceneImage('./image/天使.png');
  showTextTypingEffect('天使が現れた！', () => {
    hideSceneImage();
    document.getElementById('monster-img').src = './image/天使.png';
    initializeMonster(10);
    startGame(10000, 10, () => {
      showTextTypingEffect(`天使を倒した！`, () => {
        fadeOutIn(() => {
          if(eventCount>8){
          addEvent('event38', startEvent38, 6);
          }
          ange +=1;
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
