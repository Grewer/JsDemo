const caculator = <HTMLElement>document.getElementById('caculator');

const operation = <HTMLElement>caculator.querySelector('.operation');

const show = <HTMLElement>caculator.querySelector('.show');


let isCalculate: boolean = false;
let lastResult: number = 0;
let lastSigns: string = '';
let hasClickNumber: boolean = false;

const plus = (num1, num2): string => {
    let num1Arr = num1.split('.');
    let num2Arr = num2.split('.');
    let result = (Number(num1) + Number(num2));
    if (num1Arr.length > 1 || num2Arr.length > 1) {
        const length = Math.max(num1Arr[1] && num1Arr[1].length || 0, num2Arr[1] && num2Arr[1].length || 0);
        result = Number(result.toFixed(length));
    }
    return String(result);

};

const multiply = (num1, num2): string => {
    const num1Arr = num1.split('.');
    const num2Arr = num2.split('.');
    const digits1 = num1Arr[1] && num1Arr[1].length * 10 || 1;
    const digits2 = num2Arr[1] && num2Arr[1].length * 10 || 1;
    return String(Number(num1) * Number(num2) * digits1 * digits2 / digits1 / digits2);
};

operation.addEventListener('click', (ev) => {
    const target = <HTMLElement>ev.target;
    if (target.className === 'symbol') {
        if (target.innerText === '=') {
            isCalculate = false;
            const bar = Number(show.innerText);
            switch (lastSigns) {
                case '+':
                    show.innerText = plus(String(lastResult), show.innerText);
                    break;
                case '-':
                    show.innerText = (hasClickNumber ? lastResult - bar : bar - lastResult).toString();
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
        } else {
            isCalculate = true;
            lastSigns = target.innerText;
            lastResult = Number(show.innerText);
        }
    } else {
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
                let value = Number(show.innerText);
                if (!value) break;
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
                        show.innerText = '0'
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

