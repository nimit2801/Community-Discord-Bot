// let ran = [1, 6, 2, 3, 5, 7, 9];
let random_ = [];
let number;
let max = 11;
let arrL = 10 >= max ? (max % 2 == 0 ? max - 2 : max - 1) : 10;
console.log(arrL);
for (let i = 0; random_.length != arrL; i++) {
  number = Math.floor(Math.random() * (max - 1));
  if (!random_.includes(number)) random_.push(number);
}
console.log(random_);
random_.sort();
console.log(random_);
