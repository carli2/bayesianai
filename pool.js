


module.exports = function Pool() {
	var examples = [];

	this.train = function (dataset, result) {
		examples.push([dataset, result]);
	}

	this.classify = function (dataset, success) {
		success('', 0.0);
	}
}
