import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title: 'Title',
      url: 'http://localhost',
      techs: ["Nodejs", "React"]
    });
    const repository = response.data;
    setRepositories([...repositories,repository]);

  }

  async function handleRemoveRepository(id) {

    api.delete('repositories/'+id).then(response => {

      api.get('repositories').then(response => { 
        setRepositories(response.data);
      });

    });
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(r => <li key={r.id}>
            {r.title} 
            <button onClick={() => handleRemoveRepository(r.id)}>
            Remover
          </button>
          </li>
          )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
