/* Naive Bayes:

Die Idee dahinter: Analyse der Wahrscheinlichkeit.

für jedes Wort W: Speichere Häufigkeit der Klassifizierung

Formel: P(A | X) = P(A) * P(X | A) / P(X)




*/

function Word(word) {
	this.word = word;
	this.total = 0;
	this.results = {};

	this.train = function (result) {
		this.total++;
		this.results[result] = (this.results[result] || 0) + 1;
	}
}

module.exports = function Pool() {
	var examples = [];
	var words = {};

	function processWord(word, result) {
		console.log(word, result);
		if (!words[word]) {
			words[word] = new Word(word);
		}
		words[word].train(result);
	}

	this.train = function (dataset, result) {
		examples.push([dataset, result]);
		for (var k in dataset) {
			dataset[k].split(' ').forEach(function (v) {
				processWord(k+':'+v, result);
			});
		}
		console.log(words);
	}

	this.classify = function (dataset, success) {
		success('', 0.0);
	}
}
