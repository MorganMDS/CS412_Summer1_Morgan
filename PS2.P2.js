function* words(sentence) {
	let words = sentence.split(' ');
	yield* words;
}

f = words('All I know is something like a bird within her sang')
for (i of f) {
	console.log(i)
}