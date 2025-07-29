
const dragoes = [
    {
      nome: "Fire Dragon",
      elemento: "fire",
      nivel: 5,
      imagem: "https://imgur.com/LFyDNFI.png"
    },
    {
      nome: "Ice Dragon",
      elemento: "ice",
      nivel: 7,
      imagem: "https://imgur.com/KXspc5V.png"
    },
    {
      nome: "Electric Dragon",
      elemento: "electric",
      nivel: 4,
      imagem: "https://imgur.com/b7r8nD7.png"
    },
    {
      nome: "Nature Dragon",
      elemento: "nature",
      nivel: 9,
      imagem: "https://imgur.com/pFHKudj.png"
    },
    {
      nome: "Flame Dragon",
      elemento: "fire",
      nivel: 6,
      imagem: "https://imgur.com/Wo4bntm.png"
    }
  ];
  
  
  const campoBusca = document.getElementById("search");
  const filtroElemento = document.getElementById("element-filter");
  const ordenacao = document.getElementById("sort-level");
  const lista = document.getElementById("dragon-list");
  const stats = document.getElementById("stats");
  const botaoReset = document.getElementById("reset-button");
  
  
  function atualizarLista() {
    let filtrados = [...dragoes];
  
    const busca = campoBusca.value.toLowerCase();
    if (busca) {
      filtrados = filtrados.filter(d => d.nome.toLowerCase().includes(busca));
    }
  
    const elemento = filtroElemento.value;
    if (elemento !== "all") {
      filtrados = filtrados.filter(d => d.elemento === elemento);
    }
  
    if (ordenacao.value === "asc") {
      filtrados.sort((a, b) => a.nivel - b.nivel);
    } else if (ordenacao.value === "desc") {
      filtrados.sort((a, b) => b.nivel - a.nivel);
    }
  
    renderizarDragoes(filtrados);
    atualizarEstatisticas(filtrados);
  }
  
  
  function renderizarDragoes(listaDragoes) {
    lista.innerHTML = "";
    if (listaDragoes.length === 0) {
      lista.innerHTML = "<p style='text-align:center'>Nenhum dragão encontrado.</p>";
      return;
    }
  
    listaDragoes.forEach(d => {
      const card = document.createElement("div");
      card.className = `dragon-card ${d.elemento}`;
      card.innerHTML = `
        <h3>${d.nome}</h3>
        <p>Elemento: ${formatarElemento(d.elemento)}</p>
        <p>Nível: ${d.nivel}</p>
        <img src="${d.imagem}" alt="${d.nome}">
      `;
      lista.appendChild(card);
    });
  }
  
  
  function atualizarEstatisticas(listaDragoes) {
    const total = listaDragoes.length;
    const media =
      total > 0
        ? (listaDragoes.reduce((acc, d) => acc + d.nivel, 0) / total).toFixed(1)
        : 0;
    stats.innerHTML = `
      <h3>📊 Estatísticas</h3>
      <p>Total de Dragões: ${total}</p>
      <p>Nível Médio: ${media}</p>
    `;
  }
  
  
  function formatarElemento(e) {
    const icons = {
      terra: "🪨 Terra",
      fire: "🔥 Fogo",
      água: "💧 Água",
      nature: "🌿 Natureza",
      electric: "⚡ Elétrico",
      ice: "❄️ Gelo",
      metal: "🛡️ Metal",
      sombra: "🌑 Sombra",
      luz: "🌟 Luz",
      guerra: "⚔️ Guerra",
      puro: "🌀 Puro",
      lendario: "🐲 Lendário",
      divino: "✨ Divino",
      primal: "🧬 Primal",
      caos: "☣️ Caos",
      magia: "🔮 Magia",
      tempo: "⏳ Tempo",
      maravilha: "🌌 Maravilha"
    };
    return icons[e] || e;
  }
  
  
  botaoReset.addEventListener("click", () => {
    campoBusca.value = "";
    filtroElemento.value = "all";
    ordenacao.value = "none";
    atualizarLista();
  });
  
  
  campoBusca.addEventListener("input", atualizarLista);
  filtroElemento.addEventListener("change", atualizarLista);
  ordenacao.addEventListener("change", atualizarLista);
  
  
  atualizarLista();