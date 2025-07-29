fetch('http://localhost:3000/dragoes')
  .then(response => response.json())
  .then(dragoes => {
    const container = document.getElementById('dragao-container');

    // Os dragões já vêm ordenados do backend
    dragoes.forEach(dragao => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${dragao.imagem_url}" alt="${dragao.nome}" />
        <h2>${dragao.nome}</h2>
        <p><strong>Tipo:</strong> ${dragao.tipo}</p>
        <p><strong>Habitat:</strong> ${dragao.habitat}</p>
        <p><strong>Nível:</strong> ${dragao.nivel}</p>
        <p><strong>Raridade:</strong> ${dragao.raridade}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar dragões:', error);
  });
