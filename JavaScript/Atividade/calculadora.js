let numeroAtual = "";
let numeroAnterior = "";
let operacao = "";

function addChar(teclas){
    switch (teclas){

        case "=":
            calculate();
            break;
            default:
                document.getElementById("display").innerText += teclas;
                break;

        case "+":
            numeroAnterior = document.getElementById("display").innerText;
            operacao = "+";
            clearDisplay();
            break;

        case "-":
            numeroAnterior = document.getElementById("display").innerText;
            operacao = "-";
            clearDisplay();
            break;

        case "C":
            clearDisplay();
            break;
        
        case "DEL":
            deleteChar();
            break;

        case "*":
            numeroAnterior = document.getElementById("display").innerText;
            operacao = "*";
            clearDisplay();
            break;

        case "/":
            numeroAnterior = document.getElementById("display").innerText;
            operacao = "/";
            clearDisplay();
            break;

        
            
    }
    
}

function clearDisplay(){
    document.getElementById("display").innerText = ""
}

function deleteChar(){
    let currentText = document.getElementById("display").innerText;
    document.getElementById("display").innerText = currentText.slice(0, -1);
}

function calculate(){
   if (operacao === "+"){
        numeroAtual = document.getElementById("display").innerText;
        let resultado = parseFloat(numeroAnterior) + parseFloat(numeroAtual);
        document.getElementById("display").innerText = resultado;
   }
   else if (operacao === "-"){
        numeroAtual = document.getElementById("display").innerText;
        let resultado = parseFloat(numeroAnterior) - parseFloat(numeroAtual);
        document.getElementById("display").innerText = resultado;
   } 
   else if (operacao === "*"){
        numeroAtual = document.getElementById("display").innerText;
        let resultado = parseFloat(numeroAnterior) * parseFloat(numeroAtual);
        document.getElementById("display").innerText = resultado;
   }
   else if (operacao === "/"){
        numeroAtual = document.getElementById("display").innerText;
        let resultado = parseFloat(numeroAnterior) / parseFloat(numeroAtual);
        document.getElementById("display").innerText = resultado;
   }
}

function operar(operador){
    numeroAnterior = document.getElementById("display").innerText;
    operacao = operador;
    clearDisplay();
}

