document.addEventListener('DOMContentLoaded', function() {
    // Get all the necessary elements
    const operationsDisplay = document.querySelector('.operations');
    const numberButtons = document.querySelectorAll('.op:not(#fully-clear):not(#parenthesis):not(#percent):not(#oblus):not(#multiply):not(#minus):not(#plus):not(#plus-minus):not(#result):not(#backspace)');
    const operatorButtons = document.querySelectorAll('#oblus, #multiply, #minus, #plus, #percent');
    const clearButton = document.getElementById('fully-clear');
    const backspaceButton = document.getElementById('backspace');
    const equalsButton = document.getElementById('result');
    const plusMinusButton = document.getElementById('plus-minus');
    const parenthesisButton = document.getElementById('parenthesis');
    const dotButton = document.getElementById('dot');
    
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    let parenthesisOpen = true; // Track if next parenthesis should be open or close

    // Update the display
    function updateDisplay() {
        operationsDisplay.textContent = currentInput;
    }

    // Append a number to the current input
    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Append a decimal point
    function appendDot() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            updateDisplay();
            return;
        }
        if (currentInput.includes('.')) return;
        currentInput += '.';
        updateDisplay();
    }

    // Handle operator selection
    function selectOperator(op) {
        if (operation !== null && !resetScreen) calculate();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }

    // Perform calculation
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    // Clear everything
    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Delete the last character
    function backspace() {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Toggle positive/negative
    function togglePlusMinus() {
        if (currentInput === '0') return;
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    }

    // Handle parentheses
    function appendParenthesis() {
        const parenthesis = parenthesisOpen ? '(' : ')';
        if (resetScreen) {
            currentInput = parenthesis;
            resetScreen = false;
        } else {
            currentInput += parenthesis;
        }
        parenthesisOpen = !parenthesisOpen;
        updateDisplay();
    }

    // Number button event listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    // Operator button event listeners
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            let op;
            switch(button.id) {
                case 'oblus':
                    op = '÷';
                    break;
                case 'multiply':
                    op = '×';
                    break;
                case 'minus':
                    op = '-';
                    break;
                case 'plus':
                    op = '+';
                    break;
                case 'percent':
                    op = '%';
                    break;
                default:
                    return;
            }
            selectOperator(op);
        });
    });

    // Dot button
    dotButton.addEventListener('click', appendDot);

    // Equals button
    equalsButton.addEventListener('click', () => {
        if (operation === null || resetScreen) return;
        calculate();
        resetScreen = true;
    });

    // Clear button
    clearButton.addEventListener('click', clearAll);

    // Backspace button
    backspaceButton.addEventListener('click', backspace);

    // Plus/minus button
    plusMinusButton.addEventListener('click', togglePlusMinus);

    // Parenthesis button
    parenthesisButton.addEventListener('click', appendParenthesis);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
        else if (e.key === '.') appendDot();
        else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
            let op;
            switch(e.key) {
                case '*':
                    op = '×';
                    break;
                case '/':
                    op = '÷';
                    break;
                default:
                    op = e.key;
            }
            selectOperator(op);
        }
        else if (e.key === 'Enter' || e.key === '=') {
            if (operation === null || resetScreen) return;
            calculate();
            resetScreen = true;
        }
        else if (e.key === 'Escape') clearAll();
        else if (e.key === 'Backspace') backspace();
        else if (e.key === '(' || e.key === ')') appendParenthesis();
    });

    // Initialize display
    updateDisplay();
});