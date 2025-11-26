// Seleciona a div onde os dados serão exibidos
const container = document.getElementById('tenis');

// Usa fetch para buscar o arquivo JSON
fetch('tenis.json')
    .then(response => {
        // Verifica se a requisição foi bem sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        // Converte a resposta para JSON
        return response.json();
    })
    .then(data => {
        data.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h2>Categoria: ${item.categoria}</h2>
                <h3>Nome: ${item.nome}</h3>
                <p>Marca: ${item.marca}</p>
                <p>Tamanho: ${item.tamanho}</p>
                <p>Preço: ${item.preco}</p>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Falha ao buscar ou processar o arquivo JSON:', error);
    });
