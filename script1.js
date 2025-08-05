let symbol = document.querySelectorAll(".symbol");
let operand = document.querySelectorAll(".operand");
let operations = document.querySelector(".operations");
let clear = document.querySelector("#fully-clear");
let backspace = document.querySelector("#backspace");
let op = document.querySelectorAll(".op");
let res = document.querySelector("#result");
let Dot = document.querySelector("#dot")


let currVal = 0;

function calculate(val, a, b){
    switch(val){
        case '+':return a+b;
        case '-':return a-b; 
        case '÷':return a/b;
        case '×':return a*b;
        case '%':return a%b; 
        default : return 0;            
    }
}


function handleBackspace() {
    let currentText = operations.innerText;
    
    // If there's only one character or it's "0", reset to "0"
    if (currentText.length === 1 || currentText === "0") {
        operations.innerText = "0";
        currVal = "0";
    } 
    // Otherwise, remove the last character
    else {
        operations.innerText = currentText.slice(0, -1);
        currVal = operations.innerText;
    }
}
backspace.addEventListener("click", handleBackspace);

function clearVal(){
    clear.addEventListener("click", () => {
        currVal = 0;
        operations.innerText = 0; 
    })
}

function result(){
    res.addEventListener("click", () => {
        const text = operations.innerText;
        let index = 0;
        for(const char of text) {
            if(char === '+' || char === '-' || char === '×' || char === '÷' || char === '%') {
                let num1 = Number(text.slice(0,index));
                let num2 = Number(text.slice(index + 1));  // Skips the operator
                let ans = calculate(char, num1, num2);
                operations.innerText = ans;
            }
            index++;
        }
    })
}

function Brackets(){
    let expr = operations.innerText;
    
    // Count existing brackets
    let openBrackets = (expr.match(/\(/g) || []).length;
    let closedBrackets = (expr.match(/\)/g) || []).length;
    if (openBrackets <= closedBrackets || 
        expr.endsWith('+') || 
        expr.endsWith('-') || 
        expr.endsWith('×') || 
        expr.endsWith('÷') || 
        expr.endsWith('%')) {
        operations.innerText = expr === '0' ? '(' : expr + '(';
    } 
    // Otherwise add closing bracket
    else {
        operations.innerText = expr + ')';
    }
    
    // Update current value
    currVal = operations.innerText;
}

//Add +/- before a number:-
function toggleSign() {
    let currentText = operations.innerText;
    
    // If empty or just "0", set to "-0" (some calculators do this)
    if (currentText === "0" || currentText === "") {
        operations.innerText = "-0";
        currVal = "-0";
        return;
    }
    
    // If the last character is an operator, we'll negate the next number instead
    if (currentText.endsWith('+') || 
        currentText.endsWith('-') || 
        currentText.endsWith('×') || 
        currentText.endsWith('÷')) {
        operations.innerText = currentText + "(-";
        return;
    }
    
    // Handle cases where we're in the middle of typing a number
    const lastOperatorIndex = Math.max(
        currentText.lastIndexOf('+'),
        currentText.lastIndexOf('-'),
        currentText.lastIndexOf('×'),
        currentText.lastIndexOf('÷')
    );
    
    const currentNumber = lastOperatorIndex >= 0 
        ? currentText.slice(lastOperatorIndex + 1)
        : currentText;
        
    if (currentNumber.startsWith('-')) {
        // If negative, make positive
        if (lastOperatorIndex >= 0) {
            operations.innerText = currentText.slice(0, lastOperatorIndex + 1) + 
                                currentNumber.slice(1);
        } else {
            operations.innerText = currentNumber.slice(1);
        }
    } else {
        // If positive, make negative
        if (lastOperatorIndex >= 0) {
            operations.innerText = currentText.slice(0, lastOperatorIndex + 1) + 
                                '-' + currentNumber;
        } else {
            operations.innerText = '-' + currentNumber;
        }
    }
    
    currVal = operations.innerText;
}

function Dotfun(){
    let currentText = operations.innerText;
    
    // Split the expression by operators to get the current number
    const parts = currentText.split(/[+\-×÷%]/);
    const currentNumber = parts[parts.length - 1];
    
    // If current number already has a decimal point, do nothing
    if (currentNumber.includes('.')) {
        return;
    }
    
    // If current number is empty (after operator) or "0", start with "0."
    if (currentNumber === '' || currentNumber === '0') {
        operations.innerText = currentText + '0.';
    }
    // Otherwise just add the decimal point
    else {
        operations.innerText = currentText + '.';
    }
    
    currVal = operations.innerText;
}

op.forEach((val) => {
    val.addEventListener("click", () => {
        if(val.innerText == '0' || val.innerText == '1' || val.innerText == '2' || val.innerText == '3' || val.innerText == '4' || val.innerText == '5' || val.innerText == '6' || val.innerText == '7' || val.innerText == '8' || val.innerText == '9'){
            if(currVal == '0'){
                currVal = val.innerText
            }else{
                currVal = operations.innerText + val.innerText;
            }
            operations.innerText = currVal;
        }else if(val.innerText == '+' || val.innerText == '-' || val.innerText == '÷' || val.innerText == '×' || val.innerText == '%'){
            if(operations.innerText == '0' || operations.innerText == ''){
                operations.innerText = val.innerText;
            }
            else if(operations.innerText.endsWith('+') ||
                    operations.innerText.endsWith('-') ||
                    operations.innerText.endsWith('×') ||
                    operations.innerText.endsWith('÷') || 
                    operations.innerText.endsWith('%')){
                operations.innerText = operations.innerText.slice(0, -1) + val.innerText;
            }
            else{
                operations.innerText = operations.innerText + val.innerText;
            }
        }else if(val.innerText == 'C'){
            clearVal();
        }else if(val.innerText == 'equal'){
            result();
        }else if(val.innerText == '()'){
            Brackets();
        }else if(val.innerText == '+/-'){
            toggleSign();
        }else if(val.innerText == '.'){
            Dotfun();
        }
    })
})



const straightenBtn = document.querySelector(".bar-1 .material-symbols-outlined:nth-child(2)");
const unitConverter = document.querySelector(".unit-converter");
const closeConverter = document.querySelector(".close-converter");
const conversionType = document.getElementById("conversion-type");
const fromValue = document.getElementById("from-value");
const toValue = document.getElementById("to-value");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const convertBtn = document.getElementById("convert-btn");

// Conversion units data
const conversionUnits = {
    length: [
        { name: "Millimeter", value: 0.001 },
        { name: "Centimeter", value: 0.01 },
        { name: "Meter", value: 1 },
        { name: "Kilometer", value: 1000 },
        { name: "Inch", value: 0.0254 },
        { name: "Foot", value: 0.3048 },
        { name: "Yard", value: 0.9144 },
        { name: "Mile", value: 1609.34 }
    ],
    weight: [
        { name: "Milligram", value: 0.001 },
        { name: "Gram", value: 1 },
        { name: "Kilogram", value: 1000 },
        { name: "Tonne", value: 1000000 },
        { name: "Ounce", value: 28.3495 },
        { name: "Pound", value: 453.592 }
    ],
    temperature: [
        { name: "Celsius", value: "c" },
        { name: "Fahrenheit", value: "f" },
        { name: "Kelvin", value: "k" }
    ],
    area: [
        { name: "Square Millimeter", value: 0.000001 },
        { name: "Square Centimeter", value: 0.0001 },
        { name: "Square Meter", value: 1 },
        { name: "Hectare", value: 10000 },
        { name: "Square Kilometer", value: 1000000 },
        { name: "Square Inch", value: 0.00064516 },
        { name: "Square Foot", value: 0.092903 },
        { name: "Square Yard", value: 0.836127 },
        { name: "Acre", value: 4046.86 },
        { name: "Square Mile", value: 2589988.11 }
    ]
};

// Populate unit dropdowns based on selected conversion type
function populateUnits() {
    const type = conversionType.value;
    const units = conversionUnits[type];
    
    // Clear existing options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    // Add new options
    units.forEach(unit => {
        const option1 = document.createElement("option");
        option1.value = unit.value;
        option1.textContent = unit.name;
        
        const option2 = document.createElement("option");
        option2.value = unit.value;
        option2.textContent = unit.name;
        
        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    });
    
    // Set default "to" unit different from "from" unit if possible
    if (units.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

// Handle conversion
function convertUnits() {
    const type = conversionType.value;
    const value = parseFloat(fromValue.value);
    
    if (isNaN(value)) {
        toValue.value = "";
        return;
    }
    
    if (type === "temperature") {
        convertTemperature();
    } else {
        convertStandard();
    }
}

// Convert standard units (length, weight, area)
function convertStandard() {
    const fromFactor = parseFloat(fromUnit.value);
    const toFactor = parseFloat(toUnit.value);
    const value = parseFloat(fromValue.value);
    
    // Convert to base unit first, then to target unit
    const result = (value * fromFactor) / toFactor;
    toValue.value = result.toFixed(6);
}

// Convert temperature units
function convertTemperature() {
    const fromType = fromUnit.value;
    const toType = toUnit.value;
    const value = parseFloat(fromValue.value);
    
    let celsius;
    
    // Convert to Celsius first
    switch (fromType) {
        case "c":
            celsius = value;
            break;
        case "f":
            celsius = (value - 32) * 5/9;
            break;
        case "k":
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    let result;
    switch (toType) {
        case "c":
            result = celsius;
            break;
        case "f":
            result = (celsius * 9/5) + 32;
            break;
        case "k":
            result = celsius + 273.15;
            break;
    }
    
    toValue.value = result.toFixed(2);
}

// Toggle converter visibility
function toggleConverter() {
    if (unitConverter.style.display === "none") {
        unitConverter.style.display = "block";
        populateUnits();
    } else {
        unitConverter.style.display = "none";
    }
}

// Event listeners
straightenBtn.addEventListener("click", toggleConverter);
closeConverter.addEventListener("click", toggleConverter);
conversionType.addEventListener("change", populateUnits);
convertBtn.addEventListener("click", convertUnits);
fromValue.addEventListener("input", convertUnits);
fromUnit.addEventListener("change", convertUnits);
toUnit.addEventListener("change", convertUnits);

// Initialize converter
populateUnits();



// History
const historyBtn = document.querySelector(".bar-1 .material-symbols-outlined:nth-child(1)");
const historyPanel = document.querySelector(".history-panel");
const closeHistory = document.querySelector(".close-history");
const historyItems = document.querySelector(".history-items");
const clearHistoryBtn = document.querySelector("#clear-history");

let calculationHistory = [];

// Toggle history panel visibility
function toggleHistoryPanel() {
    if (historyPanel.style.display === "none") {
        historyPanel.style.display = "block";
        renderHistory();
    } else {
        historyPanel.style.display = "none";
    }
}

// Add calculation to history
function addToHistory(expression, result) {
    calculationHistory.unshift({
        expression,
        result
    });
    
    // Keep only the last 10 calculations
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
}

// Render history items
function renderHistory() {
    historyItems.innerHTML = '';
    
    calculationHistory.forEach(item => {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerHTML = `
            <span class="history-expression">${item.expression}</span>
            <span class="history-result">= ${item.result}</span>
            <div style="clear: both;"></div>
        `;
        
        // Clicking a history item puts it back in the calculator
        historyItem.addEventListener("click", () => {
            operations.innerText = item.expression;
            currVal = item.expression;
            historyPanel.style.display = "none";
        });
        
        historyItems.appendChild(historyItem);
    });
}

// Clear history
function clearHistory() {
    calculationHistory = [];
    localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
    renderHistory();
}

// Load history from localStorage
function loadHistory() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        calculationHistory = JSON.parse(savedHistory);
    }
}

// Event listeners
historyBtn.addEventListener("click", toggleHistoryPanel);
closeHistory.addEventListener("click", toggleHistoryPanel);
clearHistoryBtn.addEventListener("click", clearHistory);

// Initialize history
loadHistory();

// Modify your result() function to save to history
function result() {
    res.addEventListener("click", () => {
        const text = operations.innerText;
        let index = 0;
        for(const char of text) {
            if(char === '+' || char === '-' || char === '×' || char === '÷' || char === '%') {
                let num1 = Number(text.slice(0,index));
                let num2 = Number(text.slice(index + 1));
                let ans = calculate(char, num1, num2);
                operations.innerText = ans;
                currVal = ans.toString();
                
                // Add to history
                addToHistory(text, ans);
            }
            index++;
        }
    });
}

// Scientific Calculator
const calculateBtn = document.querySelector(".bar-1 .material-symbols-outlined:nth-child(3)");
const advancedPanel = document.querySelector(".advanced-panel");
const closeAdvanced = document.querySelector(".close-advanced");
const advOps = document.querySelectorAll(".adv-op");

// Toggle advanced panel
function toggleAdvancedPanel() {
    if (advancedPanel.style.display === "none") {
        advancedPanel.style.display = "block";
    } else {
        advancedPanel.style.display = "none";
    }
}

// Handle advanced operations
function handleAdvancedOperation(op) {
    let current = operations.innerText;
    let result;
    
    switch(op) {
        case "sqrt":
            result = `sqrt(${current})`;
            break;
        case "power":
            result = `${current}^`;
            break;
        case "square":
            result = `(${current})²`;
            break;
        case "cube":
            result = `(${current})³`;
            break;
        case "sin":
            result = `sin(${current})`;
            break;
        case "cos":
            result = `cos(${current})`;
            break;
        case "tan":
            result = `tan(${current})`;
            break;
        case "log":
            result = `log(${current})`;
            break;
        case "ln":
            result = `ln(${current})`;
            break;
        case "pi":
            result = current === "0" ? "π" : `${current}π`;
            break;
        case "e":
            result = current === "0" ? "e" : `${current}e`;
            break;
        case "fact":
            result = `fact(${current})`;
            break;
    }
    
    operations.innerText = result;
    currVal = result;
    advancedPanel.style.display = "none";
}

// Event listeners
calculateBtn.addEventListener("click", toggleAdvancedPanel);
closeAdvanced.addEventListener("click", toggleAdvancedPanel);
advOps.forEach(btn => {
    btn.addEventListener("click", () => {
        handleAdvancedOperation(btn.dataset.op);
    });
});

// Update your result() function to handle advanced operations
function result() {
    res.addEventListener("click", () => {
        const text = operations.innerText;
        let result;
        
        // Check for advanced operations
        if (text.includes("sqrt(")) {
            const num = parseFloat(text.match(/sqrt\(([^)]+)\)/)[1]);
            result = Math.sqrt(num);
        } 
        else if (text.includes("^")) {
            const [base, exp] = text.split("^").map(Number);
            result = Math.pow(base, exp);
        }
        else if (text.includes("²")) {
            const num = parseFloat(text.replace("²", ""));
            result = num * num;
        }
        else if (text.includes("³")) {
            const num = parseFloat(text.replace("³", ""));
            result = num * num * num;
        }
        else if (text.includes("sin(")) {
            const num = parseFloat(text.match(/sin\(([^)]+)\)/)[1]);
            result = Math.sin(num * Math.PI / 180); // Convert to radians if needed
        }
        else if (text.includes("cos(")) {
            const num = parseFloat(text.match(/cos\(([^)]+)\)/)[1]);
            result = Math.cos(num * Math.PI / 180);
        }
        else if (text.includes("tan(")) {
            const num = parseFloat(text.match(/tan\(([^)]+)\)/)[1]);
            result = Math.tan(num * Math.PI / 180);
        }
        else if (text.includes("log(")) {
            const num = parseFloat(text.match(/log\(([^)]+)\)/)[1]);
            result = Math.log10(num);
        }
        else if (text.includes("ln(")) {
            const num = parseFloat(text.match(/ln\(([^)]+)\)/)[1]);
            result = Math.log(num);
        }
        else if (text.includes("π")) {
            const parts = text.split("π");
            const num = parts[0] ? parseFloat(parts[0]) : 1;
            result = num * Math.PI;
        }
        else if (text.includes("e")) {
            const parts = text.split("e");
            const num = parts[0] ? parseFloat(parts[0]) : 1;
            result = num * Math.E;
        }
        else if (text.includes("fact(")) {
            const num = parseInt(text.match(/fact\(([^)]+)\)/)[1]);
            result = factorial(num);
        }
        else {
            // Original basic calculation logic
            let index = 0;
            for(const char of text) {
                if(char === '+' || char === '-' || char === '×' || char === '÷' || char === '%') {
                    let num1 = Number(text.slice(0,index));
                    let num2 = Number(text.slice(index + 1));
                    result = calculate(char, num1, num2);
                    break;
                }
                index++;
            }
        }
        
        if (result !== undefined) {
            operations.innerText = result;
            currVal = result.toString();
            addToHistory(text, result);
        }
    });
}

// Helper function for factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

