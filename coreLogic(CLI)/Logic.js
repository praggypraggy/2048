const readline = require("readline-sync");

var board = [];
var buf = [];

const randCoord = () => {
  var p, q;
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
  let flag = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        flag = 1;
      }

      if (board[i][j] === 2048) {
        console.log('You won')
      }
    }
  }
  if (flag === 0) {
    console.log('GAME OVER\n');
  }
  return flag;
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

const newGame = () => {
  for (let i = 0; i < 4; i++) {
    board[i] = newBuf();
  }
  randCoord();
  console.log('New Game\n 𝘜𝘴𝘦 𝘞𝘈𝘚𝘋 𝘧𝘰𝘳 𝘮𝘰𝘷𝘦𝘴\n');
};

const showBoard = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let x = board[i][j];
      if (x === 0) x = "-";

      process.stdout.write(x + " ");
    }
    process.stdout.write("\n");
  }
};

const moveUp = (callback) => {
  console.log('Move Up\n');
  for (let j = 0; j < 4; j++) {
    buf = newBuf();
    let k = 0;
    for (let i = 0; i < 4; i++) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k - 1]) buf[k - 1] += board[i][j];
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
  Array.from(callback).forEach((item) => {
    item();
  });
};

const moveDown = (callback) => {
  console.log('Move Down\n');
  for (let j = 0; j < 4; j++) {
    buf = newBuf();
    let k = 3;
    for (let i = 3; i >= 0; i--) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k + 1]) buf[k + 1] += board[i][j];
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
  Array.from(callback).forEach((item) => {
    item();
  });
};

const moveLeft = (callback) => {
  console.log('Move Left\n');
  for (let i = 0; i < 4; i++) {
    buf = newBuf();
    let k = 0;
    for (let j = 0; j < 4; j++) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k - 1]) buf[k - 1] += board[i][j];
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
  Array.from(callback).forEach((item) => {
    item();
  });
};

const moveRight = (callback) => {
  console.log('Move Right\n');
  for (let i = 0; i < 4; i++) {
    buf = newBuf();
    let k = 3;
    for (let j = 3; j >= 0; j--) {
      if (board[i][j] !== 0) {
        if (board[i][j] === buf[k + 1]) buf[k + 1] += board[i][j];
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
  Array.from(callback).forEach((item) => {
    item();
  });
};

function main() {
  const callback = [isGameOver, randCoord, showBoard];
  var choice = 0, loop = 1;
  const switchStack = { 'W': moveUp, 'A': moveLeft, 'S': moveDown, 'D': moveRight };
  newGame();

  showBoard();
  while (loop === 1) {
    console.log('\n\t    𝐌𝐎𝐕𝐄𝐒');
    console.log('\t      ⬆');
    console.log('\t W)  Up');
    console.log(' ⬅ A) Left\tD) Right ➡');
    console.log('\t S) Down');
    console.log('\t      ⬇');
    console.log('\t❌L) EXIT');
    choice = String(readline.question());
    if (choice === "L") {
      loop = 0;
      console.log('Closing Game');
      break;
    }
    if (choice in switchStack) {
      switchStack[choice](callback);
    }
    else {
      console.log('Enter the correct Move');
      continue;

    }
  }

}

main();

