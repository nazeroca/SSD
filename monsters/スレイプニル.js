// event3.js
function startEvent03() {
  currentEvent = 'event03';
  eventCount++;
  updateEventCountDisplay();
  let noteCount = getSecureRandomInRange(50, 80);
  showTextTypingEffect('スレイプニルが現れた！', () => {
    document.getElementById('monster-img').src = './image/スレイプニル.png';
    initializeMonster(noteCount+10);
    startGameA(2000,500, 1.2,noteCount,10, () => {
      showTextTypingEffect(`スレイプニルを倒した！`, () => {

        fadeOutIn(() => {
          startRandomEvent([currentEvent]);
        });
    });
  });
  });
  
}
