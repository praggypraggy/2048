var mainDiv = document.getElementById('mainTable');

const isGameOver = () => {
	gameOvercheck = true;
	let flag = 0;
	let boardTemp = boardObj.returnCopy();
	const array = { 0: moveUp, 1: moveLeft, 2: moveDown, 3: moveRight };
	for (let k = 0; k < 4; k++) {
		array[k]([]);
		board.forEach((i) => {
			i.forEach((j) => {
				if (j.val === 0) flag = 1
			});
		});
		boardObj = boardTemp.returnCopy();
		board = boardObj.boardT;
	}
	if (flag === 0) {
		console.log('GAME OVER\n');

		document.getElementById('gOver').innerHTML = '<h2 style="color:red">GAME OVER</h2>';
		let x = Array.from(document.getElementById("myTable").getElementsByTagName("td"));
		boardObj.resetColour(true);
		x.forEach((item) => {
			item.style.backgroundColor = "red";
			item.style.color = "white";
		});
	}
	board.forEach(item => {
		item.forEach(box => {
			if (box.val > 1024) {
				document.getElementById('gOver').innerHTML = '<h2 style="color:green">YOU WIN</h2>';
				return
			}
		})
	});
	gameOvercheck = false;
};

const setScore = (val) => {
	score = val;
	document.getElementById('Score').innerHTML = score;
}

const showBoardDOM = (move) => {
	mainDiv.innerHTML = ``;
	var table = document.createElement('table');

	boardObj.resetColour();
	board.forEach(item => {
		let tr = document.createElement('tr');
		item.forEach(box => {
			let td = document.createElement('td');
			let span = document.createElement('span');
			td.style.backgroundColor = box.bgColor;
			span.innerHTML = box.val;
			if (box.val === 0) span.innerHTML = " ";
			span.className = 'spanBox';
			td.style.border = "1px solid red";
			td.className = 'box';
			td.appendChild(span);
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});

	table.id = 'myTable';
	mainDiv.appendChild(table);
	cellAnimation(table.children, move);
};

const loadBody = () => {
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

	div.appendChild(newButton(main, 'New Game (N)', 'newGame', 'N'));
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
