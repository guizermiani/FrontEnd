

document.getElementById("somar").addEventListener("click", () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let soma = num1 + num2;

    document.getElementById("resultadoSoma").innerText =
        "Resultado da Soma: " + soma;
});

document.getElementById("sub").addEventListener("click", () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let sub = num1 - num2;

    document.getElementById("resultadoSub").innerText =
        "Resultado da Subtração: " + sub;
});

document.getElementById("mult").addEventListener("click", () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let mult = num1 * num2;

    document.getElementById("resultadoMult").innerText =
        "Resultado da Multiplicação: " + mult;
});

document.getElementById("div").addEventListener("click", () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let div = num1 / num2;

        if (num2 === 0){
            document.getElementById("resultadoDiv").innerText = "Não é possível dividir por zero!"
        }
        else{
            document.getElementById("resultadoDiv").innerText =
            "Resultado da Divisão: " + div;
        }
});

document.getElementById("resto").addEventListener("click", () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let resto = num1 % num2;

    if (num2 === 0){
            document.getElementById("resultadoResto").innerText = 
            "Não é possível dividir por zero!"
        }
        else{
            document.getElementById("resultadoResto").innerText =
            "Resto: " + resto;
        }
});

document.getElementById("exp").addEventListener("click", () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let exp = num1 ** num2;

    document.getElementById("resultadoExp").innerText =
        "Exponenciação: " + exp;
});


