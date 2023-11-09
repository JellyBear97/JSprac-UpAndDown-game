// Title : 랜덤 번호 맞추기
// Description : 1~100 범위의 랜덤 번호 중 5번만에 랜덤 번호 맞추기
// 랜덤번호 지정
// 입력 영역
// 결과영역
// play, reset 버튼
// 기회 5번
// <동작>
//   맞추면 -> 버튼 비활성화
//   기회 없으면 -> 버튼 비활성드화
//   기존에 했던 숫자 -> 기회유지, 다른번호 권유
//   범위 밖의 숫자 -> 기회유지, 외범위 안내
//   '남은기회', 'UP & DOWN', '맞췄는지', 'reset 안내문구' 보여주기
//   reset 버튼 클릭시 => '기회, 기존 도전번호 유지'

// reset ->
// 1. main-game-header에 blinking class 다시 붙이기, Guess the <br />random number이라는 innerHTML붙이기
// 2. chances-area에 chances 5로 변경

// 맞출 때마다 chances-area에 chances 변경

let userInputArea = document.getElementById('userInput-area');
let mainGameHeaderArea = document.getElementById('main-game-header-area');
let chancesArea = document.getElementById('chances-area');
let goButton = document.getElementById('go-button');
let resetButton = document.getElementById('reset-button');
let randomNumber = 0;
let chances = 5;
let guideMessage = ``;
let history = [];

goButton.addEventListener('click', testUserNumber);
resetButton.addEventListener('click', reset);
userInputArea.addEventListener('focus', () => {
  userInputArea.value = '';
});

// 랜덤번호 제조
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log('randomNumber', randomNumber);
}
getRandomNumber();

function reset() {
  goButton.disabled = false;
  guideMessage = `Guess the <br />random number`;
  mainGameHeaderArea.innerHTML = guideMessage;
  mainGameHeaderArea.classList.add('blinking');
  goButton.classList.remove('disabled_button');
  chances = 5;
  history = [];
  userInputArea.value = '';
  getRandomNumber();
  chancesArea.textContent = chances;
}

function testUserNumber() {
  const userNumber = userInputArea.value;
  mainGameHeaderArea.classList.remove('blinking');
  console.log(userNumber);
  console.log(history);
  if (userNumber < 1 || userNumber > 100) {
    guideMessage = `This number is out of range </br>Guess another number`;
    mainGameHeaderArea.innerHTML = guideMessage;
    return false;
  }
  if (history.includes(userNumber)) {
    guideMessage = `You've already tried this number </br>Guess another number`;
    mainGameHeaderArea.innerHTML = guideMessage;
    return false;
  }

  chances--;
  chancesArea.textContent = chances;
  history.push(userNumber);
  if (randomNumber > userNumber) {
    guideMessage = 'Wrong!! "UP" than your number';
  } else if (randomNumber < userNumber) {
    guideMessage = 'Wrong!! "DOWN" than your number';
  } else {
    guideMessage = 'YOU DID IT!';
    goButton.disabled = true;
    goButton.classList.add('disabled_button');
  }
  if (chances < 0) {
    goButton.disabled = true;
  }
  mainGameHeaderArea.innerHTML = guideMessage;
}
