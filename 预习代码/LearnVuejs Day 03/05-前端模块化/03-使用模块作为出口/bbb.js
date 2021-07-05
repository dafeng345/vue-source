const moduleB = (function () {
	const obj = {}
	const flag = true
	if (flag) {
		console.log('小明做开发');
	}

	obj.flag = flag

	return obj
})()