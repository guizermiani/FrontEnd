import { useState } from 'react';

export default function TodoApp() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
      // Agora adicionamos um OBJETO com id, texto e status
      const novoItem = {
        id: Date.now(),
        texto: novaTarefa,
        concluida: false
      };
      setTarefas([...tarefas, novoItem]);
      setNovaTarefa("");
    }
  };

  // Função para alternar o status (concluída ou não)
  const alternarConcluida = (id) => {
    const tarefasAtualizadas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
  };
const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>To-Do List com Check</h1>
      
      <input 
        type="text" 
        value={novaTarefa} 
        onChange={(e) => setNovaTarefa(e.target.value)} 
        placeholder="Nova tarefa..."
      />
      <button onClick={adicionarTarefa}>Adicionar</button>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} style={{ marginBottom: '10px' }}>
            {/* 1. Estilização condicional */}
            <span 
              onClick={() => alternarConcluida(tarefa.id)}
              style={{ 
                textDecoration: tarefa.concluida ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {tarefa.texto}
            </span>

            <button onClick={() => removerTarefa(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
