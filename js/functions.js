// isStringLengthValid
// const isStringLengthValid = (string, length) => string.length <= length;

// window.console.log('\n Проверка isStringLengthValid: \n ');
// // Строка короче 20 символов
// window.console.log(isStringLengthValid('проверяемая строка', 20)); // true
// // Длина строки ровно 18 символов
// window.console.log(isStringLengthValid('проверяемая строка', 18)); // true
// // Строка длиннее 10 символов
// window.console.log(isStringLengthValid('проверяемая строка', 10)); // false

// isStringPalindrome

// первый вариант
// const isStringPalindromeAlt = (string) => {
//   const processedString = string.replaceAll(' ', '').toLowerCase();

//   return processedString === processedString.split('').reverse().join('');
// };

// второй вариант
// const isStringPalindrome = (string) => {
//   const convertedString = string.replaceAll(' ', '').toLowerCase();

//   for (let i = 0; i < convertedString.length / 2; i++) {
//     if (convertedString[i] !== convertedString[convertedString.length - 1 - i]) {
//       return false;
//     }
//   }

//   return true;
// };

// window.console.log('\n Проверка isStringPalindrome: \n ');
// // Строка является палиндромом
// window.console.log(isStringPalindrome('топот')); // true
// // Несмотря на разный регистр, тоже палиндром
// window.console.log(isStringPalindrome('ДовОд')); // true
// // Это не палиндром
// window.console.log(isStringPalindrome('Кекс')); // false
// // Это палиндром
// window.console.log(isStringPalindrome('Лёша на полке клопа нашёл ')); // true

// extractsNumberFromData

// первый вариант
// const extractsNumberFromData = (data) => {
//   const processedData = `${data}`;

//   return parseInt(processedData.split('').filter((item) => !Number.isNaN(parseInt(item, 10))).join(''), 10);
// };

// второй вариант
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

// window.console.log('\n Проверка extractsNumberFromData: \n ');
// window.console.log(extractsNumberFromData('2023 год')); // 2023
// window.console.log(extractsNumberFromData('ECMAScript 2022')); // 2022
// window.console.log(extractsNumberFromData('1 кефир, 0.5 батона')); // 105
// window.console.log(extractsNumberFromData('агент 007')); // 7
// window.console.log(extractsNumberFromData('а я томат')); // NaN
// window.console.log(extractsNumberFromData(2023)); // 2023
// window.console.log(extractsNumberFromData(-1)); // 1
// window.console.log(extractsNumberFromData(1.5)); // 15

// Делу — время
const parseTimeToMinutes = (time) => time.split(':').reduce((total, current, index) => {
  let currentNumber = extractsNumberFromData(current);

  if (index === 0) {
    currentNumber *= 60;
  }

  return total + currentNumber;
}, 0);

const isMeetingWithinWorkHours = (workingStart, workingFinish, meetingStart, meetingDurationInMinutes) => {
  const workingStartInMinutes = parseTimeToMinutes(workingStart);
  const workingFinishInMinutes = parseTimeToMinutes(workingFinish);
  const meetingStartInMinutes = parseTimeToMinutes(meetingStart);

  const isMeetingStartWithin = meetingStartInMinutes >= workingStartInMinutes;

  const isMeetingFinishWithin = meetingStartInMinutes + meetingDurationInMinutes <= workingFinishInMinutes;

  return isMeetingStartWithin && isMeetingFinishWithin;
};

window.console.log('\n Проверка Делу — время: \n ');

window.console.log(isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90)); // true
window.console.log(isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120)); // true
window.console.log(isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90)); // false
window.console.log(isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90)); // false
window.console.log(isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900)); // false
