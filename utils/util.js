const util = {
	firstPlay: function(you, opponent) {
		let min_you, min_opponent;
		// forEach无法通过break或者return跳出循环
		// 这里使用抛出异常的方法跳出循环，然后使用try...catch捕获异常
		// 也可以使用some或者every
		try {
			you.forEach(item => {
				if(item.value == 15) {
					throw new Error();
				}
				if(item.suit == "♥") {
					if(!min_you || min_you > item.value) {
						min_you = item.value;
					}
				}
			})
		} catch(e) {
			return "you"
		}
		
		try {
			opponent.forEach(item => {
				if(item.value == 15) {
					throw new Error();
				}
				if(item.suit == "♥") {
					if(!min_opponent || min_opponent > item.value) {
						min_opponent = item.value;
					}
				}
			})
		} catch(e) {
			return "opponent"
		}
		if(min_you < min_opponent) {
			return "you"
		} else {
			return "opponent"
		}
	}
}

module.exports = util;