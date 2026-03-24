async function buscar() {
  const country = document.getElementById("country").value.trim();
  const year = document.getElementById("year").value;
  const resultado = document.getElementById("resultado");

  if (!country) {
    resultado.innerHTML = "<p>Digite um país!</p>";
    return;
  }

  resultado.innerHTML = "Carregando...";

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/covid19?country=${encodeURIComponent(country)}`, {
      headers: {
        "X-Api-Key": "3CNJzNpJT8HRzLz1Q9kkJyWtVGjoKz2PzlvdcaR5"
      }
    });

    if (!response.ok) {
      resultado.innerHTML = `<p>Erro HTTP: ${response.status}</p>`;
      console.log(await response.text());
      return;
    }

    const data = await response.json();

    console.log("RESPOSTA API:", data); // 👈 DEBUG

    if (!data || data.length === 0) {
      resultado.innerHTML = "<p>Nenhum dado encontrado.</p>";
      return;
    }

    const info = data[0];

    if (!info.cases) {
      resultado.innerHTML = "<p>Dados inválidos da API.</p>";
      return;
    }

    const datas = Object.keys(info.cases);

    const datasDoAno = datas.filter(d => d.startsWith(year));

    if (datasDoAno.length === 0) {
      resultado.innerHTML = "<p>Sem dados para esse ano.</p>";
      return;
    }

    const ultimaData = datasDoAno[datasDoAno.length - 1];

    const casos = info.cases[ultimaData] ?? "N/A";
    const mortes = info.deaths?.[ultimaData] ?? "N/A";

    resultado.innerHTML = `
      <div class="card">
        <h3>${info.country || "N/A"}</h3>
        <div class="stat"><strong>Ano:</strong> ${year}</div>
        <div class="stat"><strong>Data:</strong> ${ultimaData}</div>
        <div class="stat"><strong>Casos:</strong> ${casos}</div>
        <div class="stat"><strong>Mortes:</strong> ${mortes}</div>
      </div>
    `;

  } catch (error) {
    resultado.innerHTML = "<p>Erro ao conectar com a API.</p>";
    console.error("ERRO REAL:", error);
  }
}