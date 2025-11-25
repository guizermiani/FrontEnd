let display = document.getElementById("display");

function addChar(char) {
    if (display.innerText === "0") display.innerText = "";
    display.innerText += char;
}

function clearDisplay() {
    display.innerText = "0";
}

function calculate() {
    try {
        let result = eval(display.innerText);
        display.innerText = result;
    } catch (e) {
        display.innerText = "Erro";
    }
}
