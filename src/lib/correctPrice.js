import numbers from "./numbers";

const correctPrice = (input) => {
    
    const value = input.split('');
    
    const setOnlyToNumbers = value.filter(digit => numbers.includes(digit));

    const endArr = setOnlyToNumbers;

    endArr.splice(endArr.length - 2, 0, ',');

    while (endArr[0] === '0' && endArr.length > 4) endArr.shift();

    const result = endArr.length > 3 ? endArr.join('') : '0,00';

    return result;
};

export default correctPrice;