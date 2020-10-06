const util = {
	/**
	 * @description: 初始化
	 */
	initCards: function() {
	  const suits = ['♠', '♥', '♣', '♦'];
	  const numbers = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
	  const cards = [];
	  for (let index in suits) {
		for (let i = 0; i < 13; i++) {
		  let obj = {
			'suit': suits[index],
			'number': numbers[i],
			'value': i + 3,
		  }
		  cards.push(obj);
		}
	  }
	  // 去掉3张2
	  cards.splice(12, 1);
	  cards.splice(37, 1);
	  cards.splice(49, 1);
	  return cards;
	},
	/**
	 * @description: 洗牌
	 * @param {*} cards
	 */
	shuffle: function(cards) {
	  const len = cards.length;
	  for (let i = 0; i < len - 1; i++) {
		let index = parseInt(Math.random() * (len - i));
		let temp = cards[index];
		cards[index] = cards[len - i - 1];
		cards[len - i - 1] = temp;
	  }
	  return cards;
	},
	/**
	 * @description: 发牌
	 * @param {*} cards
	 */
	deal: function(cards) {
		const you = cards.slice(0, 17),
			opponent = cards.slice(17, 34);
		
		you.sort((a, b) => a.value - b.value);
		opponent.sort((a, b) => a.value - b.value);
		
		const n = this.firstPlay(you, opponent);
		
		let obj = {
			you,
			opponent,
			n
		}
		return obj
	},
	/**
	 * @description: 判断出牌顺序
	 * @param {*} cards
	 */
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