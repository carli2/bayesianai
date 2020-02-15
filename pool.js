/* Naive Bayes:

Die Idee dahinter: Analyse der Wahrscheinlichkeit.

für jedes Wort W: Speichere Häufigkeit der Klassifizierung

Formel: P(A | X) = P(A) * P(X | A) / P(X)




*/

function Word(word) {
	this.word = word;
	this.total = 0;
	this.results = {};

	this.output = '';
	this.confidentiality = 0.0;

	this.train = function (result) {
		this.total++;
		this.results[result] = (this.results[result] || 0) + 1;
	}
}

module.exports = function Pool() {
	var examples = [];
	var words = {};
	var results = {};

	function processWord(word, result) {
		if (!words[word]) {
			words[word] = new Word(word);
		}
		words[word].train(result);
	}

	this.train = function (dataset, result) {
		results[result] = true;
		examples.push([dataset, result]);
		for (var k in dataset) {
			dataset[k].split(' ').forEach(function (v) {
				processWord(k+':'+v, result);
			});
		}
	}

	this.classify = function (dataset, success) {
		var results2 = {};
		for (var k in results) {
			results2[k] = 1;
		}

		function processWord(word) {
			if (words[word]) {
				word = words[word];
				for (var k in results) {
					var prob = 1 - (word.results[k] || 0) / (1 + word.total);
					results2[k] *= prob;
				}
			}
		}

		for (var k in dataset) {
			dataset[k].split(' ').forEach(function (v) {
				processWord(k+':'+v);
			});
		}
		var total = 0;
		var best = '';
		var bestscore = 1;
		for (var k in results) {
			if (results2[k] < bestscore) {
				best = k;
				bestscore = results2[k];
			}
			total += results2[k];
		}
		console.log(results2);
		success(best, 1 - bestscore / total);
	}
}
