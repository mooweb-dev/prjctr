// 1
const userNames = [
  "Петрик Ольга Іванівна",
  "Гнатюк Петро Антонович",
  "Рудко Андрій Опанасович",
];
const initials = getInitials(userNames);

function getInitials(names) {
  const initialsForNames = names.map((name) => {
    const namePart = name.split(" ");
    const currentInitials = [];

    namePart.forEach((person) => {
      currentInitials.push(person[0]);
    });

    return `${currentInitials.join(".")}.`;
  });

  return initialsForNames.sort();
}

console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]

// 2
const currentMaxValue = 4589;
const reverseMaxValue = reverseNumber(currentMaxValue);

function reverseNumber(number) {
  const reversedValue = number.toString().split("").reverse().join("");

  return reversedValue.indexOf("-") > 0
    ? -parseInt(reversedValue)
    : parseInt(reversedValue);

  /* 
  Поцікавився, як можна реалізувати задачу більш простим способом і підглянув в інтернеті реалізацію за допомогою Math.sign
    return parseInt(reversedValue) * Math.sign(number);
  */
}

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

// 3
const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

productOfArray = resultsArray
  .flat(Infinity)
  .reduce((accumulator, currentValue) => accumulator * currentValue, 1);

console.log(productOfArray);
