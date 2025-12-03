// Seleciona elementos
const container = document.getElementById('tenis');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

let tenisData = [];
let editIndex = null;

function renderList(items) {
    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = '<p style="color:#555">Nenhum item para exibir.</p>';
        return;
    }

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.style.border = '1px solid #eee';
        div.style.padding = '12px';
        div.style.marginBottom = '8px';
        div.style.borderRadius = '6px';
        div.innerHTML = `
            <h2 style="margin:0 0 6px 0;font-size:18px">Categoria: ${item.categoria}</h2>
            <h3 style="margin:0 0 6px 0;font-size:16px">Nome: ${item.nome}</h3>
            <p style="margin:0">Marca: ${item.marca} — Tamanho: ${item.tamanho} — Preço: R$ ${item.preco}</p>
            <br>
            <button class="editTenisBtn" data-index="${index}">Editar Tênis</button>
        `;
        container.appendChild(div);
    });

    attachEditEvents();
}

function attachEditEvents() {
    document.querySelectorAll(".editTenisBtn").forEach(btn => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            openEditModal(index);
        });
    });
}

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


// busca item
function searchUnique() {
    const q = searchInput.value.trim();
    if (q === '') {
        renderList(tenisData);
        return;
    }

    const ql = q.toLowerCase();

    let found = tenisData.find(item => item.nome.toLowerCase() === ql);
    if (!found) found = tenisData.find(item => item.marca.toLowerCase() === ql);

    if (found) {
        renderList([found]);
        return;
    }

    const matches = tenisData.filter(item =>
        item.nome.toLowerCase().includes(ql) ||
        item.marca.toLowerCase().includes(ql)
    );

    if (matches.length === 1) {
        renderList(matches);
    } else if (matches.length > 1) {
        container.innerHTML = `<p style="color:#333">Encontrados ${matches.length} itens (mostrando todos). Resultado exato não encontrado.</p>`;
        renderList(matches);
    } else {
        container.innerHTML = `<p style="color:#555">Nenhum item encontrado para "${q}"</p>`;
    }
}

// eventos de busca
searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') searchUnique();
});

searchBtn.addEventListener('click', searchUnique);

clearBtn.addEventListener('click', function () {
    searchInput.value = '';
    renderList(tenisData);
    searchInput.focus();
});

// modal
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modal');
const btnClose = document.getElementById('btnClose');
const movieForm = document.getElementById('movieForm');

function openModal() {
    editIndex = null;
    modal.classList.add('show');
    movieForm.reset();
    document.getElementById('modalTitle').innerText = "Adicionar Tênis";
    document.getElementById('categoria').focus();
}

function closeModal() {
    modal.classList.remove('show');
    movieForm.reset();
}

function openEditModal(index) {
    editIndex = index;
    const tenis = tenisData[index];

    document.getElementById("modalTitle").innerText = "Editar Tênis";

    document.getElementById('categoria').value = tenis.categoria;
    document.getElementById('nome').value = tenis.nome;
    document.getElementById('marca').value = tenis.marca;
    document.getElementById('tamanho').value = tenis.tamanho;
    document.getElementById('preco').value = tenis.preco;

    modal.classList.add("show");
}

// botoes do modal
addBtn.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
});

// salvar o form tenis
movieForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newData = {
        categoria: document.getElementById('categoria').value.trim(),
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        tamanho: parseInt(document.getElementById('tamanho').value) || 0,
        preco: parseFloat(document.getElementById('preco').value) || 0
    };

    if (!newData.categoria || !newData.nome || !newData.marca) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    if (editIndex !== null) {
        tenisData[editIndex] = newData;
        editIndex = null;
    } else {
        tenisData.push(newData);
    }

    renderList(tenisData);
    closeModal();
});
