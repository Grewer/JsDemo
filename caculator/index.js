var caculator = document.getElementById('caculator');
var operation = caculator.querySelector('.operation');
var show = caculator.querySelector('.show');
var isCalculate = false;
var lastResult = 0;
var lastSigns = '';
var hasClickNumber = false;
var plus = function (num1, num2) {
    var num1Arr = num1.split('.');
    var num2Arr = num2.split('.');
    var result = (Number(num1) + Number(num2));
    if (num1Arr.length > 1 || num2Arr.length > 1) {
        var length_1 = Math.max(num1Arr[1] && num1Arr[1].length || 0, num2Arr[1] && num2Arr[1].length || 0);
        result = Number(result.toFixed(length_1));
    }
    return String(result);
};
var multiply = function (num1, num2) {
    var num1Arr = num1.split('.');
    var num2Arr = num2.split('.');
    var digits1 = num1Arr[1] && num1Arr[1].length * 10 || 1;
    var digits2 = num2Arr[1] && num2Arr[1].length * 10 || 1;
    return String(Number(num1) * Number(num2) * digits1 * digits2 / digits1 / digits2);
};
operation.addEventListener('click', function (ev) {
    var target = ev.target;
    if (target.className === 'symbol') {
        if (target.innerText === '=') {
            isCalculate = false;
            var bar = Number(show.innerText);
            switch (lastSigns) {
                case '+':
                    show.innerText = plus(String(lastResult), show.innerText);
                    break;
                case '-':
                    show.innerText = (lastResult - bar).toString();
                    break;
                case '*':
                    show.innerText = multiply(show.innerText, String(lastResult));
                    break;
                case '/':
                    show.innerText = (hasClickNumber ? lastResult / bar : bar / lastResult).toString();
                    break;
            }
            if (hasClickNumber) {
                lastResult = bar;
            }
            hasClickNumber = false;
        }
        else {
            isCalculate = true;
            lastSigns = target.innerText;
            lastResult = Number(show.innerText);
        }
    }
    else {
        switch (target.innerText) {
            case 'C':
                show.innerText = '0';
                isCalculate = false;
                lastResult = 0;
                lastSigns = '';
                hasClickNumber = false;
                break;
            case '+/-':
                if (show.innerText[0] === '-') {
                    show.innerText = show.innerText.substring(1);
                    break;
                }
                show.innerText = '-' + show.innerText;
                break;
            case '%':
                var value = Number(show.innerText);
                if (!value)
                    break;
                show.innerText = (value / 100).toString();
                break;
            default:
                if (isCalculate) {
                    show.innerText = '';
                    isCalculate = false;
                }
                if (show.innerText === '0') {
                    show.innerText = '';
                }
                if (target.innerText === '.') {
                    if (show.innerText === '') {
                        show.innerText = '0';
                    }
                    if (show.innerText.indexOf('.') !== -1) {
                        break;
                    }
                }
                hasClickNumber = true;
                show.innerText += target.innerText;
        }
    }
}, false);
//# sourceMappingURL=index.js.map