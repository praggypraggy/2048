class boardClass {
	constructor() {
		this.boardT = [
			[
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' }
			],
			[
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' }
			],
			[
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' }
			],
			[
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' },
				{ 'val': 0, 'bgColor': '#b1ff03', 'color': 'black' }
			]
		];
	}
	resetColour(setRed = false) {
		this.boardT = this.boardT.map((i) => {
			i.map((j) => {
				if (setRed) {
					j.bgColor = 'red';
					j.color = 'white';
				}
				if (j.val > 512) {
					j.bgColor = 'red';
				} else if (j.val > 128) {
					j.bgColor = '#ff6969';
				} else if (j.val > 32) {
					j.bgColor = 'orange';
				} else if (j.val > 8) {
					j.bgColor = 'yellow';
				} else if (j.val > 4) {
					j.bgColor = '#7fce7f';
				} else {
					j.bgColor = '#b1ff03';
				}
			})
			return (i)
		})
	}
	returnCopy() {
		let dest = new boardClass()
		dest.boardT.forEach((i, iIndex) => {
			i.forEach((j, jIndex) => {
				j.val = this.boardT[iIndex][jIndex].val;
				j.bgColor = this.boardT[iIndex][jIndex].bgColor;
			});
		});
		return dest;
	}
}

let boardObj = new boardClass();

var board = boardObj.boardT;
var buf = [];
var score = 0;
var gameOvercheck = false;

const randCoord = () => {
	var p, q;
	let flag = 0;
	board.forEach((i) => {
		i.forEach((j) => {
			if (j.val === 0) flag = 1
		});
	});
	if (flag === 0)
		return
	while (true) {
		p = Math.floor(Math.floor(Math.random() * 10) % 4);
		q = Math.floor(Math.floor(Math.random() * 10) % 4);
		if (board[p][q].val === 0) {
			board[p][q].val = 2;
			break;
		}
	}
};

const callback = (callbackStack, move) => {
	Array.from(callbackStack).forEach((item) => {
		item(move);
	});
};

const newBuf = () => {
	return [0, 0, 0, 0];
};

const showBuf = () => {
	console.log(buf);
};

const scoreUpdate = (val) => {
	if (!gameOvercheck) {
		score += val;
		setScore(score);
	}
}

const showBoard = () => {
	board.forEach(item => console.log(item));
}

const main = (move) => {
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