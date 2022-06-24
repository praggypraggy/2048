var mainDiv = document.getElementById('mainTable');

var board = [];
var buf = [];
var score = 0;
var gameOvercheck = false;

const randCoord = () => {
  var p, q;
  let flag = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) flag = 1;
    }
  }
  if (flag === 0)
    return
  while (true) {
    p = Math.floor(Math.floor(Math.random() * 10) % 4);
    q = Math.floor(Math.floor(Math.random() * 10) % 4);
    if (board[p][q] === 0) {
      board[p][q] = 2;
      break;
    }
  }
};

const isGameOver = () => {
  gameOvercheck = true;
  let flag = 0;
  let boardTemp = [];
  for (let i = 0; i < board.length; i++) {
    boardTemp[i] = [...board[i]];
  }
  const array = { 0: moveUp, 1: moveLeft, 2: moveDown, 3: moveRight };
  for (let k = 0; k < 4; k++) {
    array[k]([]);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          flag = 1;
        }
      }
    }
    for (let i = 0; i < boardTemp.length; i++) {
      board[i] = [...boardTemp[i]];
    }
  }
  if (flag === 0) {
    console.log('GAME OVER\n');

    document.getElementById('gOver').innerHTML = '<h2 style="color:red">GAME OVER</h2>';
    let x = document.getElementById("myTable").getElementsByTagName("td");
    Array.from(x).forEach((item) => {
      item.style.backgroundColor = "red";
      item.style.color = "white";
    });

  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] > 1024) {
        document.getElementById('gOver').innerHTML = '<h2 style="color:green">YOU WIN</h2>';
        return
      }
    }
  }
  gameOvercheck = false;
};

const callback = (callbackStack, move) => {
  Array.from(callbackStack).forEach((item) => {
    item(move);
  });
};

const newBuf = () => {
  let buf = [];
  for (let i = 0; i < 4; i++) {
    buf[i] = 0;
  }
  return buf;
};

const showBuf = () => {
  console.log(buf);
};

const newGame = (callbackStack, move) => {
  score = 0;
  setScore(score);
  gameOvercheck = false;
  mainDiv = document.getElementById('mainTable');
  document.getElementById('gOver').innerHTML = '';

  for (let i = 0; i < 4; i++) {
    board[i] = newBuf();
  }
  callback(callbackStack, move);
};

const setScore = (val) => {
  score = val;
  document.getElementById('Score').innerHTML = score;
}

const scoreUpdate = (val) => {
  if (!gameOvercheck) {
    score += val;
    setScore(score);
  }
}

const showBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

async function cellAnimation(x, move) {
  const fade = { 'W': 'fade-in-bottom', 'A': 'fade-in-right', 'S': 'fade-in-top', 'D': 'fade-in-left', 'N': 'fade-in' };
  if (move === 'W') {
    for (let i = 0; i <= 3; i++) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('fade-in-text'), 50)
      });
      let result = await promise;
      for (let j = 0; j <= 3; j++) {
        x[i].children[j].children[0].classList.add(fade[move]);
      }
    }
  }
  if (move === 'S') {
    for (let i = 3; i >= 0; i--) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('fade-in-text'), 50)
      });
      let result = await promise;
      for (let j = 0; j <= 3; j++) {
        x[i].children[j].children[0].classList.add(fade[move]);
      }
    }
  }
  if (move === 'A') {
    for (let i = 0; i <= 3; i++) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('fade-in-text'), 50)
      });
      let result = await promise;
      for (let j = 0; j <= 3; j++) {
        x[j].children[i].children[0].classList.add(fade[move]);
      }
    }
  }
  if (move === 'D') {
    for (let i = 3; i >= 0; i--) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('fade-in-text'), 50)
      });
      let result = await promise;
      for (let j = 0; j <= 3; j++) {
        x[j].children[i].children[0].classList.add(fade[move]);
      }
    }
  }
  if (move === 'N') {
    for (let i = 3; i >= 0; i--) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('fade-in-text'), 50)
      });
      let result = await promise;
      for (let j = 0; j <= 3; j++) {
        x[j].children[i].children[0].classList.add(fade[move]);
      }
    }
  }
}

const showBoardDOM = (move) => {
  mainDiv.innerHTML = ``;
  var table = document.createElement('table');

  for (let i = 0; i < board.length; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < board[i].length; j++) {
      let x = board[i][j];
      let td = document.createElement('td');
      let span = document.createElement('span');
      if (x > 512) {
        td.style.backgroundColor = 'red';
      } else if (x > 128) {
        td.style.backgroundColor = '#ff6969';
      } else if (x > 32) {
        td.style.backgroundColor = 'orange';
      } else if (x > 8) {
        td.style.backgroundColor = 'yellow';
      } else if (x > 4) {
        td.style.backgroundColor = '#7fce7f';
      } else {
        td.style.backgroundColor = '#b1ff03';
      }
      if (x === 0) x = " ";
      span.innerHTML = x;
      span.className = 'spanBox';
      td.style.border = "1px solid red";
      td.className = 'box';
      td.appendChild(span);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  table.id = 'myTable';
  mainDiv.appendChild(table);
  var x = table.children;
  cellAnimation(x, move);
};

const closeGame = () => {
  mainDiv.innerHTML = `<h3 style='color:red'>Game closed</h3>`
};

const moveUp = (callbackStack, move) => {
  for (let j = 0; j < 4; j++) {
    buf = newBuf();
    let k = 0;
    for (let i = 0; i < 4; i++) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k - 1]) {
          buf[k - 1] += board[i][j];
          scoreUpdate(buf[k - 1]);
        }
        else {
          buf[k] = board[i][j];
          k++;
        }
      }
    }
    for (let i = 0; i < buf.length; i++) {
      board[i][j] = buf[i];
    }
  }
  callback(callbackStack, move);
};

const moveDown = (callbackStack, move) => {
  for (let j = 0; j < 4; j++) {
    buf = newBuf();
    let k = 3;
    for (let i = 3; i >= 0; i--) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k + 1]) {
          buf[k + 1] += board[i][j];
          scoreUpdate(buf[k + 1]);
        }
        else {
          buf[k] = board[i][j];
          k--;
        }
      }
    }
    for (let i = 0; i < buf.length; i++) {
      board[i][j] = buf[i];
    }
  }
  callback(callbackStack, move);
};

const moveLeft = (callbackStack, move) => {
  for (let i = 0; i < 4; i++) {
    buf = newBuf();
    let k = 0;
    for (let j = 0; j < 4; j++) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k - 1]) {
          buf[k - 1] += board[i][j];
          scoreUpdate(buf[k - 1]);
        }
        else {
          buf[k] = board[i][j];
          k++;
        }
      }
    }
    for (let j = 0; j < buf.length; j++) {
      board[i][j] = buf[j];
    }
  }
  callback(callbackStack, move);
};

const moveRight = (callbackStack, move) => {
  for (let i = 0; i < 4; i++) {
    buf = newBuf();
    let k = 3;
    for (let j = 3; j >= 0; j--) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k + 1]) {
          buf[k + 1] += board[i][j];
          scoreUpdate(buf[k + 1]);
        }
        else {
          buf[k] = board[i][j];
          k--;
        }
      }
    }
    for (let j = 0; j < buf.length; j++) {
      board[i][j] = buf[j];
    }
  }
  callback(callbackStack, move);
};

function main(move) {
  const callbackStack = [randCoord, showBoardDOM, isGameOver];
  var choice = String(move);
  const switchStack = { 'W': moveUp, 'A': moveLeft, 'S': moveDown, 'D': moveRight, 'N': newGame, 'L': closeGame };
  if (choice === "L") {
    loop = 0;
    console.log('Closing Game');
    switchStack[choice](move);
  }
  if (choice in switchStack) {
    switchStack[choice](callbackStack, move);
  }
  else {
    console.log('Enter the correct Move');
  }
}

function loadBody() {
  const newButton = (onClick, innerHtml, classname, param) => {
    var button = document.createElement('button');
    button.onclick = function () { onClick(param) };
    button.innerHTML = String(innerHtml);
    button.className = String(classname);
    return button;
  }

  var dPadDiv = document.createElement('div');
  dPadDiv.className = "Dpad";

  var div = document.createElement('div');

  div.appendChild(newButton(newGame, 'New Game (N)', 'newGame'));
  div.appendChild(newButton(closeGame, 'Close Game (L)', 'closeGame'));
  dPadDiv.appendChild(div);

  dPadDiv.appendChild(newButton(main, '⬆', 'moveButton moveUp', 'W'));

  div = document.createElement('div');
  div.appendChild(newButton(main, '⬅', 'moveButton moveLeft', 'A'));
  div.appendChild(newButton(main, '➡', 'moveButton moveRight', 'D'));
  div.style.width = '180px'
  div.style.display = 'flex'
  div.style.justifyContent = 'space-between';
  dPadDiv.appendChild(div);

  dPadDiv.appendChild(newButton(main, '⬇', 'moveButton moveDown', 'S'));

  document.body.appendChild(dPadDiv);

  div = document.createElement('div');
  div.id = 'mainTable';
  document.body.appendChild(div);

  var div = document.createElement('div');
  div.id = 'gOver';
  document.body.appendChild(div);

  var scoreDiv = document.createElement('div');
  scoreDiv.className = 'scoreDiv';
  var h2 = document.createElement('h2');
  h2.innerHTML = 'Score: '
  var span = document.createElement('span');
  span.id = 'Score';
  span.innerHTML = score;
  h2.appendChild(span);
  scoreDiv.appendChild(h2);
  document.body.appendChild(scoreDiv);
}


document.onkeydown = checkKey;
function checkKey(e) {

  e = e || window.event;
  switch (String(e.keyCode)) {
    case '78':
      main('N');
      console.log('New Game\n');
      break;

    case '76':
      main('L');
      break;

    case '38':
    case '87':
      main('W');
      console.log('Move Up\n');
      break;

    case '40':
    case '83':
      main('S');
      console.log('Move Down\n');
      break;

    case '37':
    case '65':
      main('A');
      console.log('Move Left\n');
      break;

    case '39':
    case '68':
      main('D');
      console.log('Move Right\n');
      break;

    default:
      break;
  }
}