//
// 1. ALERTA E CONSOLE
//
document.getElementById("btnAlert").addEventListener("click", () => {
    alert("Este é um alerta JS!");
    document.getElementById("feedback1").innerText =
        "Você executou um alert()!";
});

document.getElementById("btnConsole").addEventListener("click", () => {
    console.log("Mensagem registrada pelo aluno!");
    document.getElementById("feedback1").innerText =
        "Abra o console (F12) e veja o log!";
});


//
// 2. DOM
//
document.getElementById("btnDom").addEventListener("click", () => {
    let texto = document.getElementById("textoDom").value;
    document.getElementById("resultadoDom").innerText =
        "Você digitou: " + texto;
});


//
// 3. ESTILOS
//
const box = document.getElementById("boxCor");

document.getElementById("btnCor").addEventListener("click", () => {
    box.style.background = "#" + Math.floor(Math.random() * 16777215).toString(16);
});

document.getElementById("btnTamanho").addEventListener("click", () => {
    box.style.width = "200px";
    box.style.height = "200px";
});

document.getElementById("btnReset").addEventListener("click", () => {
    box.style.width = "150px";
    box.style.height = "150px";
    box.style.background = "#4a4a8c";
});


//
// 4. PAR OU ÍMPAR
//
document.getElementById("btnParImpar").addEventListener("click", () => {
    let num = Number(document.getElementById("numParImpar").value);

    if (isNaN(num)) {
        document.getElementById("resParImpar").innerText =
            "Digite um número válido!";
        return;
    }

    document.getElementById("resParImpar").innerText =
        num % 2 === 0
            ? `O número ${num} é PAR`
            : `O número ${num} é ÍMPAR`;
});


//
// 5. SOMA
//
document.getElementById("btnSomar").addEventListener("click", () => {
    let v1 = Number(document.getElementById("valor1").value);
    let v2 = Number(document.getElementById("valor2").value);

    let soma = v1 + v2;

    document.getElementById("resultadoSoma").innerText =
        "Resultado: " + soma;
});


//
// 6. ALTERAR TEMA
//
document.getElementById("btnTema").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


//
// 7. JOGO: ADIVINHE O NÚMERO
//
let numeroSecreto = Math.floor(Math.random() * 10) + 1;

document.getElementById("btnChutar").addEventListener("click", () => {
    let chute = Number(document.getElementById("numChute").value);

    if (chute === numeroSecreto) {
        document.getElementById("feedbackChute").innerText =
            "🎉 Parabéns! Você acertou!";
        numeroSecreto = Math.floor(Math.random() * 10) + 1;
    } else if (chute > numeroSecreto) {
        document.getElementById("feedbackChute").innerText =
            "Tente um número menor!";
    } else {
        document.getElementById("feedbackChute").innerText =
            "Tente um número maior!";
    }
});
