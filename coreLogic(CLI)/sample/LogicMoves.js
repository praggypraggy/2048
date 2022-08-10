const newGame = (callbackStack, move) => {
	score = 0;
	setScore(score);
	gameOvercheck = false;
	mainDiv = document.getElementById('mainTable');
	document.getElementById('gOver').innerHTML = '';

	boardObj = new boardClass();
	board = boardObj.boardT;
	callback([randCoord, randCoord, showBoardDOM], move);
};

const closeGame = () => {
	mainDiv.innerHTML = `<h3 style='color:red'>Game closed</h3>`
};

const moveUp = (callbackStack, move) => {
	for (let j = 0; j < 4; j++) {
		buf = newBuf();
		let k = 0;
		for (let i = 0; i < 4; i++) {
			if (board[i][j].val !== 0) {
				if (board[i][j].val === buf[k - 1]) {
					buf[k - 1] += board[i][j].val;
					scoreUpdate(buf[k - 1]);
				}
				else {
					buf[k] = board[i][j].val;
					k++;
				}
			}
		}
		for (let i = 0; i < buf.length; i++) {
			board[i][j].val = buf[i];
		}
	}
	callback(callbackStack, move);
};

const moveDown = (callbackStack, move) => {
	for (let j = 0; j < 4; j++) {
		buf = newBuf();
		let k = 3;
		for (let i = 3; i >= 0; i--) {
			if (board[i][j].val !== 0) {
				if (board[i][j].val === buf[k + 1]) {
					buf[k + 1] += board[i][j].val;
					scoreUpdate(buf[k + 1]);
				}
				else {
					buf[k] = board[i][j].val;
					k--;
				}
			}
		}
		for (let i = 0; i < buf.length; i++) {
			board[i][j].val = buf[i];
		}
	}
	callback(callbackStack, move);
};

const moveLeft = (callbackStack, move) => {
	for (let i = 0; i < 4; i++) {
		buf = newBuf();
		let k = 0;
		for (let j = 0; j < 4; j++) {
			if (board[i][j].val !== 0) {
				if (board[i][j].val === buf[k - 1]) {
					buf[k - 1] += board[i][j].val;
					scoreUpdate(buf[k - 1]);
				}
				else {
					buf[k] = board[i][j].val;
					k++;
				}
			}
		}
		for (let j = 0; j < buf.length; j++) {
			board[i][j].val = buf[j];
		}
	}
	callback(callbackStack, move);
};

const moveRight = (callbackStack, move) => {
	for (let i = 0; i < 4; i++) {
		buf = newBuf();
		let k = 3;
		for (let j = 3; j >= 0; j--) {
			if (board[i][j].val !== 0) {
				if (board[i][j].val === buf[k + 1]) {
					buf[k + 1] += board[i][j].val;
					scoreUpdate(buf[k + 1]);
				}
				else {
					buf[k] = board[i][j].val;
					k--;
				}
			}
		}
		for (let j = 0; j < buf.length; j++) {
			board[i][j].val = buf[j];
		}
	}
	callback(callbackStack, move);
};