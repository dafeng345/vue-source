(function(window) {
	function njQuery(selector) {
		//不用调用init也可以实现初始化
		return new njQuery.prototype.init(selector);
	}
	njQuery.prototype = {
		constructor: njQuery,
		init: function(selector) {

			selector = njQuery.trim(selector);
			if(!selector) { //1.传入null  undefined NaN false 0   ""
				return this;
				//传入函数
			} else if(njQuery.isFunction(selector)) {
				//监听DOM元素加载完成之后执行
				njQuery.ready(selector);
			}
			//2传入字符串
			else if(njQuery.isString(selector)) {
				//2.1传入代码片段
				if(njQuery.isHTML(selector)) {
					//根据代码片段创建所有元素
					var temp = document.createElement('div'); //temp是真数组
					temp.innerHTML = selector;
					//将创建好的一级元素放入到jquery中
					//					for(var i=0;i<temp.children.length;i++){
					//						this[i]=temp.children[i];
					//					}
					//					//给jquery对象添加length属性
					//					this.length=temp.children.length;  
					//					将真数组转化为伪数组
					[].push.apply(this, temp.children);
					//返回加工好的jquery对象
					//					return this;
				} else { //2.2传入选择器
					var temp = document.querySelectorAll(selector); //temp是伪数组
					//					console.log(temp,3456 ,({}).toString.apply(temp));
					[].push.apply(this, temp);
					//					return this;
				}
			}
			//3.传入数组
			//else if (typeof selector==='object' && 'length' in selector && selector !==window) {
			else if(njQuery.isArray(selector)) {

				//3.1传入真数组
				//				if(({}).toString.apply(selector) === '[object Array]') {
				//					[].push.apply(this, selector);
				//					return this;
				//				}
				//3.2传入伪数组
				//				else {
				//					//将自定义伪数组转化为真数组
				//					var arr = [].slice.call(selector);
				//					[].push.apply(this, arr);
				//					return this;
				//				}
				var arr = [].slice.call(selector); //首先不管原来是真数组还是伪数组，转化为真数组
				[].push.apply(this, arr);
				//				return this;
			}
			//其他情况
			else {
				this[0] = selector;
				this.length = 1;
				//				return this;
			}
			return this; //合并返回的jquery对象
		},

		//njQuery上的属性
		jquery: '1.1.0',
		selector: '',
		length: 0,
		//[].push先找到数组中的push方法，push方法将有njQuery对象来调用，相当于[].push.apply(this)
		push: [].push,
		sort: [].sort,
		splice: [].splice,
		toArray: function() { //将伪数组转化为真数组
			return [].slice.apply(this);
		},
		get: function(num) {
			if(arguments.length === 0) { //未传递参数时，返回真数组   $(arr)返回的是一个伪数组
				return this.toArray();
			} else if(num >= 0) {
				return this[num]; //返回原生的dom元素
			} else {
				return this[num + this.length];
			}
		},
		eq: function(num) { //返回包装的jquery对象
			if(arguments.length == 0) {
				return new njQuery();
			} else {
				return new njQuery(this.get(num));
			}
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(-1);
		},
		each: function(fn) {
			return njQuery.each(this, fn);
		}

	}
	//定义njQuery的extend方法
	njQuery.extend = njQuery.prototype.extend = function(obj) { //定义extend方法
		for(var key in obj) {
			//njQuery调用时this是njQuery--静态方法
			//			，njQuery.prototype调用时this是njQuery对象{}--实例方法
			this[key] = obj[key];
		}
	}
	//调用njQuery的extend方法
	njQuery.extend({
		isString: function(str) { //判断传入的是否是字符串
			return typeof str === 'string';
		},
		isHTML: function(str) { //判断传入的是否是代码片段
			return str.charAt(0) === '<' && str.charAt(str.length - 1) === ">" && str.length >= 3
		},
		trim: function(str) {
			if(!njQuery.isString(str)) {
				return str;
			}
			if(str.trim) {
				return str.trim();
			} else { //去除以空格开头或者结尾的字符
				return str.replace(/^\s+|\s+$/g, '');
			}
		},
		isObject: function(sele) {
			return typeof sele === 'object';
		},
		isWindow: function(sele) {
			return sele === 'Window';
		},
		isArray: function(sele) { //判断是否是数组
			if(njQuery.isObject(sele) && !njQuery.isWindow(sele) && 'length' in sele) {
				return true;
			} else {
				return false;
			}
		},
		isFunction: function(sele) {
			return typeof sele === 'function';
		},
		ready: function(fn) { //监听dom元素加载完成之后执行
			if(document.readyState === 'complete') {
				fn();
			} else if(document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function() {
					fn();
				})
			} else {
				document.attachEvent('onreadystatechange', function() {
					if(document.readyState === 'complete') {
						fn();
					}

				})
			}
		},
		//$.each(obj,fn)
		each: function(obj, fn) {
			//遍历数组--真数组与伪数组
			if(njQuery.isArray(obj)) {
				for(var i = 0; i < obj.length; i++) {
					//回调函数的调用传实参
					//					var res= fn(i,obj[i]);
					//修改回调函数中this指向，为value
					var res = fn.call(obj[i], i, obj[i])
					if(res === true) {
						continue;
					} else if(res === false) {
						break;
					}
				}
			} else if(njQuery.isObject(obj)) { //遍历对象
				for(var key in obj) {
					//					var res= fn(key, obj[key]);
					var res = fn.call(obj[key], key, obj[key]);
					if(res === true) {
						continue;
					} else if(res === false) {
						break;
					}
				}
			}
			return obj;
		},
		map: function(obj, fn) {
			var res = [];
			if(njQuery.isArray(obj)) {
				for(var i = 0; i < obj.length; i++) {
					var temp = fn(obj[i], i);
					if(temp) {
						res.push(temp);
					}
				}
			} else if(njQuery.isObject(obj)) {
				for(var key in obj) {
					var temp = fn(obj[key], key);
					if(temp) {
						res.push(temp);
					}
				}
			}
			return res;
		}
	})

	//jquery中dom操作的方法
	njQuery.prototype.extend({
		empty: function() {
			this.each(function(key, value) {
				value.innerHTML = '';
			});
			//谁调用返回谁，方便链式调用。
			return this;
		},
		remove: function(sele) {
			if(arguments.length === 0) {
				this.each(function(key, value) {
					var parent = value.parentNode;
					//					console.log(this,value,parent);
					parent.removeChild(value);
				})
			} else {
				var that = this; //that是调用者  $(that).remove(sele)
				//根据传入的选择器找到对应的元素
				$(sele).each(function(key, value) {
					// vaue 是dom对象
					var type = value.tagName;
					//遍历对应的元素，获得类型
					that.each(function(k, v) {
						//获得指定元素对应的类型
						var t = v.tagName;
						if(t === type) {
							//							console.log(value, v);
							var parent = value.parentNode;
							if(parent) {
								parent.removeChild(value);
							}

						}
					})
				})

				//
			}
		},
		html: function(content) {
			if(arguments.length == 0) {
				//				console.log(this,this[0]);
				return this[0].innerHTML;
			} else {
				this.each(function(key, value) {
					value.innerHTML = content;

				})
			}
		},
		text: function(content) {
			if(arguments.length == 0) {
				var res = '';
				this.each(function(key, value) {
					res += value.innerText;
				});
				return res;
			} else {
				this.each(function(key, value) {
					value.innerText = content;
				});
			}
		},
		appendTo: function(sele) {
			//统一将传入的数据转化为jquery对象
			var $target = $(sele);
			var $this = this;
			var res = [];
			$.each($target, function(key, value) {

				$.each($this, function(k, v) {
					if(key === 0) {
						value.appendChild(v);
						res.push(v);
					} else {
						var temp = v.cloneNode(true);
						value.appendChild(temp);
						res.push(v);
					}
				});
			});
			return $(res);
		},
		append: function(sele) {
			//			console.log(this, this[0]);
			if(njQuery.isString(sele)) {
				//				this[0].innerHTML+=sele;
				$.each(this, function(key, value) {
					value.innerHTML += sele;
				});

			} else {
				$(sele).appendTo(this);
			}
			return this;
		},
		prependTo: function(sele) {
			//统一将传入的数据转化为jquery对象
			var $target = $(sele);
			var $this = this;
			var res = [];
			$.each($target, function(key, value) {

				$.each($this, function(k, v) {
					if(key === 0) {
						value.insertBefore(v, value.firstChild);
						res.push(v);
					} else {
						var temp = v.cloneNode(true);
						value.insertBefore(temp, value.firstChild);
						res.push(v);
					}
				});
			});
			return $(res);
		},
		prepend: function(sele) {
			if(njQuery.isString(sele)) {
				$.each(this, function(key, value) {
					value.innerHTML = sele + value.innerHTML;
				});
			} else {
				$(sele).prependTo(this);
			}
			return this;
		},
		insertBefore: function(sele) {
			//统一将传入的数据转化为jquery对象
			var $target = $(sele);
			var $this = this;
			var res = [];
			$.each($target, function(key, value) {
				var parent = value.parentNode;
				$.each($this, function(k, v) {
					if(key === 0) {
						parent.insertBefore(v, value);
						res.push(v);
					} else {
						var temp = v.cloneNode(true);
						parent.insertBefore(temp, value);
						res.push(v);
					}
				});
			});
			return $(res);
		},
		replaceAll: function(sele) {
			//统一将传入的数据转化为jquery对象
			var $target = $(sele);
			var $this = this;
			var res = [];
			$.each($target, function(key, value) {
				var parent = value.parentNode;
				$.each($this, function(k, v) {
					if(key === 0) {
						console.log(v , value, key);
						$(v).insertBefore(value); //将v 插入到value的前面
						$(value).remove();
						res.push(v);
					} else {
						console.log(v , value, key);
						var temp = v.cloneNode(true);
						$(temp).insertBefore(value);  //将temp插入到value的前面
						$(value).remove();
						res.push(v);
					}
				});
			});
			return $(res);
		}
	});
	njQuery.prototype.init.prototype = njQuery.prototype;
	window.njQuery = window.$ = njQuery;
})(window)