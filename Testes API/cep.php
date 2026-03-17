<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscador de CEP</title>
    <style>
    body {
            background: linear-gradient(135deg, #79b7d5ff, #165a6fff);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* Container da calculadora */
        form {
            background: #2c3e50;
            padding: 10px 30px;
            border-radius: 12px;
            box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.3);
            text-align: center;
        }

        /* Título */
        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #ecf0f1;
        }

        /* Labels */
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 8px;
            color: #ecf0f1;
        }

        /* Inputs */
        input[type="number"], input[type="text"] {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: none;
            margin-bottom: 15px;
            outline: none;
            font-size: 16px;
        }
    </style>
</head>
    <body>
    <form>
        <h1>Cadastro de Endereço</h1>
        <label for="cep">Digite o CEP:</label>
        <input type="text" id="cep" name="cep" placeholder="Ex: 12345-678"><br>
        <label for="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" name="logradouro"> <br>
        <label for="bairro">Bairro:</label>
        <input type="text" id="bairro" name="bairro"><br>
        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade"> <br>
        <label for="estado">Estado:</label>
        <input type="text" id="estado" name="estado">
		<label for="estado">Região:</label>
        <input type="text" id="regiao" name="regiao">
</form>

<script>
     // 1. Selecionar o elemento pelo ID
    var campoCep = document.getElementById('cep');
    // 2. Adicionar o event listener para o evento 'blur'(executado quando é retirado o mouse)
    campoCep.addEventListener('blur', function() {
        let valorCep  = campoCep.value; // pegar o valor do campoCep
        fetch("https://viacep.com.br/ws/"+valorCep+"/json/")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf   || '';
				document.getElementById('regiao').value = data.regiao   || '';
                mudaBorda(0)
            })
            .catch(error => mudaBorda(1));
        });

        function mudaBorda(cor) {
            if(cor == 1){
                campoCep.style.border = "4px solid red";
            }else{
                campoCep.style.border = "4px solid green";
            }
        }


</script>
</body>