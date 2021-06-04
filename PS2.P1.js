// Problem1: 

function* fib(max) {
	let a = 0, b = 1, n = 0;
	while (n < max) {
		yield a;
		[a, b] = [b, a + b];
		n++;
	}
}

function* evenFib(fib, max) {
	let n = 0, val;
	while (n < max) {
		val = fib.next().value;
		if (val % 2 === 0) {
			yield val;
			n++;
		}
	}
}

var fib = fib(100)
var f = evenFib(fib, 6)
for (i of f) {
	console.log(i)
}




