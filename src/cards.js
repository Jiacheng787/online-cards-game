class Cards {
	constructor() {
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
		this.deck = cards;
		this.you = [];
		this.opponent = [];
		this.n = "";
	}
	
	shuffle() {
	    const len = this.deck.length;
	    for (let i = 0; i < len - 1; i++) {
		  let index = parseInt(Math.random() * (len - i));
		  let temp = this.deck[index];
		  this.deck[index] = this.deck[len - i - 1];
		  this.deck[len - i - 1] = temp;
	    }
	}
	
	deal() {
		this.you = this.deck.slice(0, 17);
		this.opponent = this.deck.slice(17, 34);
		
		this.you.sort((a, b) => a.value - b.value);
		this.opponent.sort((a, b) => a.value - b.value);
		
		this.n = this.firstPlay();
	}
	
	firstPlay() {
		let min_you, min_opponent;
		// forEach无法通过break或者return跳出循环
		// 这里使用抛出异常的方法跳出循环，然后使用try...catch捕获异常
		// 也可以使用some或者every
		try {
			this.you.forEach(item => {
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
			this.opponent.forEach(item => {
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

module.exports = Cards;