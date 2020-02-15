


module.exports = function Pool() {
	var examples = [];

	this.learn = function (dataset, result) {
		this.examples.push([dataset, result]);
	}

	this.classify = function (dataset) {
	}
}
