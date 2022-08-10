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