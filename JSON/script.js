// Seleciona elementos
const container = document.getElementById('tenis');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

let tenisData = [];

function renderList(items) {
    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.innerHTML = '<p style="color:#555">Nenhum item para exibir.</p>';
        return;
    }
    items.forEach(item => {
        const div = document.createElement('div');
        div.style.border = '1px solid #eee';
        div.style.padding = '12px';
        div.style.marginBottom = '8px';
        div.style.borderRadius = '6px';
        div.innerHTML = `
            <h2 style="margin:0 0 6px 0;font-size:18px">Categoria: ${item.categoria}</h2>
            <h3 style="margin:0 0 6px 0;font-size:16px">Nome: ${item.nome}</h3>
            <p style="margin:0">Marca: ${item.marca} — Tamanho: ${item.tamanho} — Preço: R$ ${item.preco}</p>
        `;
        container.appendChild(div);
    });
}

// Usa fetch para buscar o arquivo JSON e armazenar os dados
fetch('tenis.json')
    .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.json();
    })
    .then(data => {
        tenisData = data;
        renderList(tenisData);
    })
    .catch(error => {
        console.error('Falha ao buscar ou processar o arquivo JSON:', error);
        container.innerHTML = '<p style="color:crimson">Falha ao carregar dados.</p>';
    });

// Busca um item unicamente (match exato por nome ou marca). Se não houver match exato, tenta includes e lida com múltiplos.
function searchUnique() {
    const q = searchInput.value.trim();
    if (q === '') {
        renderList(tenisData);
        return;
    }

    const ql = q.toLowerCase();

    // tentativa de match exato por nome
    let found = tenisData.find(item => item.nome.toLowerCase() === ql);
    // se não achou, match exato por marca
    if (!found) found = tenisData.find(item => item.marca.toLowerCase() === ql);

    if (found) {
        renderList([found]);
        return;
    }

    // se não encontrou exato, tenta includes (busca parcial)
    const matches = tenisData.filter(item => item.nome.toLowerCase().includes(ql) || item.marca.toLowerCase().includes(ql));
    if (matches.length === 1) {
        renderList(matches);
    } else if (matches.length > 1) {
        container.innerHTML = `<p style="color:#333">Encontrados ${matches.length} itens (mostrando todos). Resultado exato não encontrado.</p>`;
        renderList(matches);
    } else {
        container.innerHTML = `<p style="color:#555">Nenhum item encontrado para "${q}"</p>`;
    }
}

// eventos
searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') searchUnique();
});

searchBtn.addEventListener('click', searchUnique);

clearBtn.addEventListener('click', function () {
    searchInput.value = '';
    renderList(tenisData);
    searchInput.focus();
});

// ====== Modal (Adicionar Tênis) ======
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modal');
const btnClose = document.getElementById('btnClose');
const movieForm = document.getElementById('movieForm');

function openModal() {
    modal.classList.add('show');
    movieForm.reset();
    document.getElementById('categoria').focus();
}

function closeModal() {
    modal.classList.remove('show');
    movieForm.reset();
}

addBtn.addEventListener('click', openModal);

btnClose.addEventListener('click', closeModal);

// Fechar ao clicar fora do conteúdo
modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
});

// Submeter o formulário: adiciona o tênis à lista
movieForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const novoTenis = {
        categoria: document.getElementById('categoria').value.trim(),
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        tamanho: parseInt(document.getElementById('tamanho').value) || 0,
        preco: parseFloat(document.getElementById('preco').value) || 0
    };

    if (novoTenis.categoria && novoTenis.nome && novoTenis.marca) {
        tenisData.push(novoTenis);
        renderList(tenisData);
        closeModal();
        console.log('Tênis adicionado:', novoTenis);
    } else {
        alert('Preencha todos os campos obrigatórios!');
    }
});

// adicionar tenis ao JSON
function saveTenisData() {
    fetch('tenis.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tenisData)
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erro ao salvar dados: ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log('Dados salvos com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao salvar dados:', error);
    });
}

// Chamar saveTenisData() sempre que um novo tênis for adicionado
movieForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const novoTenis = {
        categoria: document.getElementById('categoria').value.trim(),
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        tamanho: parseInt(document.getElementById('tamanho').value) || 0,
        preco: parseFloat(document.getElementById('preco').value) || 0
    };
    if (novoTenis.categoria && novoTenis.nome && novoTenis.marca) {
        tenisData.push(novoTenis);
        renderList(tenisData);
        closeModal();
        saveTenisData(); // Salva os dados após adicionar um novo tênis
    }
});
