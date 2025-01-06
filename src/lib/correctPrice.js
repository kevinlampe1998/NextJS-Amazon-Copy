const correctPrice = (event) => {
    const value = event.target.value;

    if (value.length < 4) {
        const removedComma = value.replace(',', '');
        const unshiftZeroComma = removedComma.split('');
        unshiftZeroComma.unshift('0,');
        setUsedItem((prev) => ({ ...prev, price: unshiftZeroComma.join('')}));
        return;
    }

    
    const numbers = '0123456789'.split('');
    
    const lastChar = value.slice(-1);
    
    if (!numbers.includes(lastChar)) {
        setUsedItem((prev) => ({ ...prev, price: value.slice(0, -1)}));
        return;
    }
    
    const removedComma = value.replace(',', '');
    
    const numberArray = removedComma.split('');
    numberArray.splice(numberArray.length - 2, 0, ',');
    
    const under2Digits = numberArray.length < 4 && numberArray.join('').replace(',', '');
    
    const prePrice = under2Digits ? under2Digits : numberArray.join('');
    
    if (prePrice.length > 4 && prePrice[0] === '0') {
        const removedZero = prePrice.split('');
        removedZero.shift();
        setUsedItem((prev) => ({ ...prev, price: removedZero.join('')}));

        return;
    }

    setUsedItem(prev => ({ ...prev, price: prePrice }));
  };