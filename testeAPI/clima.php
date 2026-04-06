<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Consulta de Clima - OpenWeatherMap</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(180deg, #0083b0, #00b4db);
      color: #fff;
      text-align: center;
      padding: 40px;
    }
    h1 {
      margin-bottom: 20px;
    }
    input {
      padding: 10px;
      width: 250px;
      border: none;
      border-radius: 5px;
      outline: none;
    }
    button {
      padding: 10px 20px;
      margin-left: 10px;
      border: none;
      border-radius: 5px;
      background-color: #006680;
      color: #fff;
      cursor: pointer;
    }
    button:hover {
      background-color: #0099b8;
    }
    #resultado {
      margin-top: 30px;
      background-color: rgba(0,0,0,0.2);
      padding: 20px;
      border-radius: 10px;
      display: inline-block;
      min-width: 300px;
    }
    .erro {
      color: #ff8080;
    }
  </style>
</head>
<body>
  <h1>Consulta de Clima</h1>
  <input type="text" id="cidadeInput" placeholder="Digite o nome da cidade">
  <button onclick="buscarClima()">Buscar</button>

  <div id="resultado">
    <p>Digite uma cidade para ver o clima atual.</p>
  </div>

  <script>
    const apiKey = "5104515b692a20f0186e41d6757103ee"; 

    function buscarClima() {
      const cidade = document.getElementById("cidadeInput").value.trim();
      const resultado = document.getElementById("resultado");

      if (!cidade) {
        resultado.innerHTML = "<p class='erro'>Por favor, digite uma cidade.</p>";
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

      resultado.innerHTML = "<p>Buscando dados...</p>";
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.cod != 200) {
            resultado.innerHTML = `<p class='erro'>Erro: ${data.message}</p>`;
          } else {
            resultado.innerHTML = `
              <h2>${data.name}, ${data.sys.country}</h2>
              <p><strong>Coordenadas:</strong> ${data.coord.lat}, ${data.coord.lon}</p>
              <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
              <p><strong>Condição:</strong> ${data.weather[0].description}</p>
              <p><strong>Umidade:</strong> ${data.main.humidity}%</p>
              <p><strong>Vento:</strong> ${data.wind.speed} m/s</p>
              <p><strong>Pressão:</strong> ${data.main.pressure} atm</p>
            `;
          }
        })
        .catch(error => {
          console.log("Erro ao buscar clima:"+ error);
          resultado.innerHTML = "<p class='erro'>Erro ao buscar dados. Tente novamente.</p>";
        });
    }
  </script>
</body>
</html>
