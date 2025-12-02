const isStringLengthValid = (string, length) => string.length <= length;

console.log('\n Проверка isStringLengthValid: \n ');
// Строка короче 20 символов
console.log(isStringLengthValid('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(isStringLengthValid('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(isStringLengthValid('проверяемая строка', 10)); // false

const isStringPalindrome = (string) => {
  const convertedString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < convertedString.length / 2; i++) {
    if (convertedString[i] !== convertedString[convertedString.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

console.log('\n Проверка isStringPalindrome: \n ');
// Строка является палиндромом
console.log(isStringPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isStringPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isStringPalindrome('Кекс')); // false
// Это палиндром
console.log(isStringPalindrome('Лёша на полке клопа нашёл ')); // true

const extractsNumberFromData = (data) => {
  const processedData = `${data}`;

  let resultString = '';

  for (let i = 0; i < processedData.length; i++) {
    if (!Number.isNaN(parseInt(processedData[i], 10))) {
      resultString = resultString + processedData[i];
    }
  }

  return parseInt(resultString, 10);
};

console.log('\n Проверка extractsNumberFromData: \n ');
console.log(extractsNumberFromData('2023 год')); // 2023
console.log(extractsNumberFromData('ECMAScript 2022')); // 2022
console.log(extractsNumberFromData('1 кефир, 0.5 батона')); // 105
console.log(extractsNumberFromData('агент 007')); // 7
console.log(extractsNumberFromData('а я томат')); // NaN
console.log(extractsNumberFromData(2023)); // 2023
console.log(extractsNumberFromData(-1)); // 1
console.log(extractsNumberFromData(1.5)); // 15
