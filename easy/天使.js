function startEvent06() {
  currentEvent = 'event06';
  eventCount++;
  updateEventCountDisplay();
  showTextTypingEffect('天使が現れた！', () => {
    document.getElementById('monster-img').src = './image/天使.png';
    initializeMonster(10);
    startGame(10000, 10, () => {
      showTextTypingEffect(`天使を倒した！`, () => {
        fadeOutIn(() => {
          if(eventCount>8){
          addEvent('event38', startEvent38, 1);
          }
          ange +=1;
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
}
