/**
 * @description: 初始化
 */
function initCards() {
  const cards = [];
  const suits = ['♠', '♥', '♣', '♦'];
  const values = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  }
  for (index in suits) {
    for (let i = 1; i <= 13; i++) {
      let obj = {
        'suit': suits[index],
        'value': values[i] != undefined ? values[i] : i
      }
      cards.push(obj);
    }
  }
  return cards;
}
/**
 * @description: 洗牌
 * @param {*} cards
 */
function shuffle(cards) {
  const len = cards.length;
  for (let i = 0; i < len - 1; i++) {
    let index = parseInt(Math.random() * (len - i));
    let temp = cards[index];
    cards[index] = cards[len - i - 1];
    cards[len - i - 1] = temp;
  }
  return cards;
}
