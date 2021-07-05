const moduleA = (function () {
	const obj = {}
	const flag = true
	if (flag) {
		console.log('小红做开发');
	}

	function sum(a, b) {
		return a + b
	}

	obj.flag = flag
	obj.sum = sum

	return obj
})()

module.exports = {
	flag: true,
	sum(a, b) {

	}
}

