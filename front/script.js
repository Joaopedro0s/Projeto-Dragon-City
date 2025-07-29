fetch('http://localhost:3000/dragoes')
  .then(response => response.json())
  .then(dragoes => {
    const container = document.getElementById('dragao-container');

    dragoes.forEach(dragao => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${dragao.imagem_url}" alt="${dragao.nome}" />
        <h2>${dragao.nome}</h2>
        <p><strong>Tipo:</strong> ${dragao.tipo}</p>
        <p><strong>Habitat:</strong> ${dragao.habitat}</p>
        <p><strong>Raridade:</strong> ${dragao.raridade}</p>
        <div class="nivel-container" id="nivel-container-${dragao.id}">
          <strong>Nível:</strong>
          <span class="nivel-text" id="nivel-text-${dragao.id}">${dragao.nivel}</span>
          <svg class="edit-icon" id="edit-icon-${dragao.id}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Editar nível" role="img" aria-label="Editar nível">
            <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zm3.92-2.79 7.06-7.05 1.84 1.84-7.06 7.06-1.84-1.85z"/>
          </svg>
        </div>
      `;

      container.appendChild(card);

      // Evento para abrir edição ao clicar no lápis
      const editIcon = document.getElementById(`edit-icon-${dragao.id}`);
      editIcon.addEventListener('click', () => ativarEdicao(dragao.id));
    });
  })
  .catch(error => {
    console.error('Erro ao carregar dragões:', error);
  });

function ativarEdicao(id) {
  const container = document.getElementById(`nivel-container-${id}`);
  const nivelText = document.getElementById(`nivel-text-${id}`);

  const valorAtual = nivelText.textContent;

  container.innerHTML = `
    <strong>Nível:</strong>
    <input type="number" min="1" class="nivel-input" id="nivel-input-${id}" value="${valorAtual}" />
    <button class="save-btn" id="save-btn-${id}">Salvar</button>
  `;

  const input = document.getElementById(`nivel-input-${id}`);
  input.focus();

  const btnSalvar = document.getElementById(`save-btn-${id}`);
  btnSalvar.addEventListener('click', () => {
    const novoNivel = parseInt(input.value);

    if (isNaN(novoNivel) || novoNivel < 1) {
      alert('Por favor, insira um nível válido (mínimo 1).');
      input.focus();
      return;
    }

    fetch(`http://localhost:3000/dragao/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nivel: novoNivel })
    })    
      .then(response => response.json())
      .then(() => {
        container.innerHTML = `
          <strong>Nível:</strong>
          <span class="nivel-text" id="nivel-text-${id}">${novoNivel}</span>
          <svg class="edit-icon" id="edit-icon-${id}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Editar nível" role="img" aria-label="Editar nível">
            <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zm3.92-2.79 7.06-7.05 1.84 1.84-7.06 7.06-1.84-1.85z"/>
          </svg>
        `;

        const editIcon = document.getElementById(`edit-icon-${id}`);
        editIcon.addEventListener('click', () => ativarEdicao(id));
      })
      .catch(error => {
        console.error('Erro ao atualizar nível:', error);
        alert('Erro ao atualizar nível do dragão.');
      });
  });
}
