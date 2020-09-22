let inputResult = document.getElementById("calculator-display");

let calculation = {
    savedValue:null,
    functionForCalculate: null
};

//Inicializar o evento quando a janela carregar
window.addEventListener("load", function() {
    attributeEvents();
});

//Atribuir eventos para os botões
function attributeEvents() {
    document.getElementById("zero").addEventListener("click", insertNumber);
    document.getElementById("one").addEventListener("click", insertNumber);
    document.getElementById("two").addEventListener("click", insertNumber);
    document.getElementById("three").addEventListener("click", insertNumber);
    document.getElementById("four").addEventListener("click", insertNumber);
    document.getElementById("five").addEventListener("click", insertNumber);
    document.getElementById("six").addEventListener("click", insertNumber);
    document.getElementById("seven").addEventListener("click", insertNumber);
    document.getElementById("eight").addEventListener("click", insertNumber);
    document.getElementById("nine").addEventListener("click", insertNumber);
    
    document.getElementById("clear_all").addEventListener("click", clearAll);
    document.getElementById("clear_last").addEventListener("click", clearLast);
    document.getElementById("dot").addEventListener("click", insertDot);
    document.getElementById("btn_equal").addEventListener("click", equalResult);

    document.getElementById("btn_add").addEventListener("click", insertOperator);
    document.getElementById("btn_sub").addEventListener("click", insertOperator);
    document.getElementById("btn_mul").addEventListener("click", insertOperator);
    document.getElementById("btn_div").addEventListener("click", insertOperator);
}

// Retornar o número clicado no display
function insertNumber() {
    //Caso o valor presente no display não seja um número ou se for igual a zero, ele atribui o numero clicado.
    if (isNaN(inputResult.value) || (inputResult.value === 0)){
        inputResult.value = event.target.textContent;
    } else {
        //Se não for nenhuma das opções acima, ele concatena o número clicado com o número que já está no display    
        inputResult.value += event.target.textContent;
        }
}

function add(n1, n2) {
    return (n1 + n2);
}

function subtract(n1, n2) {
    return (n1 - n2);
}

function multiply(n1, n2) {
    return (n1 * n2);
}

function divide(n1, n2) {
    if (n2 == 0) {
        return "Cannot divide by 0 "
    } else {
        return (n1/n2);
    }
} 

//Tecla AC
function clearAll() {
    inputResult.value = "";
    calculation.savedValue = null;
    calculation.functionForCalculate = null;
}

//Tecla <-
function clearLast() {
    inputResult.value = inputResult.value.substring(0, inputResult.value.length - 1);
    
}

function insertDot() {
    if (inputResult.value === "" || isNaN(inputResult.value)) {
        inputResult.value = "0.";
    } else if (!inputResult.value.includes(".")) {
        inputResult.value = inputResult.value + ".";
    }
}

function attributetOperator(operator) {
    switch(operator) {
        case "+":
            calculation.functionForCalculate = add;
            break;
        case "-":
            calculation.functionForCalculate = subtract;
            break;
        case "*":
            calculation.functionForCalculate = multiply;
            break;
        case "/":
            calculation.functionForCalculate = divide;
            break;
    }
}

function insertOperator() {
    if (!isNaN(inputResult.value)) {
        if(calculation.savedValue == null) {
            calculation.savedValue = Number(inputResult.value);
        } else if (calculation.functionForCalculate != null) {
            calculation.savedValue = calculation.functionForCalculate(calculation.savedValue, Number(inputResult.value));
        }
    }

    let oper = event.target.textContent;
    attributetOperator(oper);
    inputResult.value = oper;
}

//Exibe o resultado final quando clicado
function equalResult() {
    if(!isNaN(inputResult.value) && calculation.functionForCalculate != null) {
        let result = calculation.functionForCalculate(calculation.savedValue, Number(inputResult.value));

        //retorna no display o valor
        inputResult.value = result;
        //Guarda esse valor no valor salvo para caso queira utilizá-lo para novo cálculo
        calculation.savedValue = result;

        calculation.functionForCalculate = null;
    }
}