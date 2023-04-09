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
let reverseMaxValue = reverseNumber(currentMaxValue);

// тут спочатку зробив через slice, а потім вже більш простим способом (split) :)
function reverseNumber(number) {
  const numberToString = number.toString(),
    newNumberArray = [];

  for (let i = 1; i < numberToString.length + 1; i++) {
    newNumberArray.push(numberToString.slice(i - 1, i));
  }

  return +newNumberArray.reverse().join("");
}

// function reverseNumber(number) {
//   const numberToString = number.toString();

//   return +numberToString.split("").reverse().join("");
// }

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

// 3
const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

productOfArray = resultsArray
  .flat(Infinity)
  .reduce((accumulator, currentValue) => accumulator * currentValue, 1);

console.log(productOfArray);
