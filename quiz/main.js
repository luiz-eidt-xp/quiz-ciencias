const perguntas = [
  {texto: "A madeira sendo queimada.", resposta: "quimica"},
  {texto: "Um papel amassado.", resposta: "fisica"},
  {texto: "O gelo derretendo.", resposta: "fisica"},
  {texto: "Um prego enferrujando.", resposta: "quimica"},
  {texto: "O açúcar dissolvendo na água.", resposta: "fisica"},
  {texto: "O leite azedando.", resposta: "quimica"},
  {texto: "Um vidro quebrando.", resposta: "fisica"},
  {texto: "A respiração celular.", resposta: "quimica"},
  {texto: "Água evaporando.", resposta: "fisica"},
  {texto: "Uma vela queimando.", resposta: "quimica"},
  {texto: "Cortar uma madeira com serra.", resposta: "fisica"},
  {texto: "O ferro sendo aquecido e derretendo.", resposta: "fisica"},
  {texto: "O pão assando no forno.", resposta: "quimica"},
  {texto: "Mistura de areia com água.", resposta: "fisica"},
  {texto: "Oxidação de maçã cortada.", resposta: "quimica"},
  {texto: "Dissolver sal em água.", resposta: "fisica"},
  {texto: "Ferro corroendo lentamente.", resposta: "quimica"},
  {texto: "Quebra de um copo de vidro.", resposta: "fisica"},
  {texto: "Fotossíntese nas plantas.", resposta: "quimica"},
  {texto: "Gelo flutuando na água.", resposta: "fisica"},
  {texto: "Combustão de gasolina.", resposta: "quimica"},
  {texto: "Água congelando.", resposta: "fisica"},
  {texto: "Bicarbonato de sódio reagindo com vinagre.", resposta: "quimica"},
  {texto: "Mistura de óleo e água sem reagir.", resposta: "fisica"},
  {texto: "Fermentação do pão.", resposta: "quimica"},
  {texto: "Rasgar papel.", resposta: "fisica"},
  {texto: "Reação do ferro com ácido.", resposta: "quimica"},
  {texto: "Evaporação da água da chuva.", resposta: "fisica"},
  {texto: "Fusão de metais.", resposta: "fisica"},
  {texto: "Queima de carvão.", resposta: "quimica"},
  {texto: "Amassar uma lata de alumínio.", resposta: "fisica"},
  {texto: "Oxidação do cobre formando uma camada verde.", resposta: "quimica"},
  {texto: "Quebra de um lápis.", resposta: "fisica"},
  {texto: "Reação de permanganato de potássio com glicerina.", resposta: "quimica"},
  {texto: "Diluir suco em água.", resposta: "fisica"},
  {texto: "Fermentação alcoólica.", resposta: "quimica"},
  {texto: "Quebra de um tijolo.", resposta: "fisica"},
  {texto: "Formação de ferrugem.", resposta: "quimica"},
  {texto: "Mistura de areia com sal sem reação.", resposta: "fisica"},
  {texto: "Reação do cloro com água.", resposta: "quimica"},
  {texto: "Derreter chocolate no micro-ondas.", resposta: "fisica"},
  {texto: "Oxidação de ferro em ponte.", resposta: "quimica"},
  {texto: "Dobrar uma folha de alumínio.", resposta: "fisica"},
  {texto: "Fermentação de frutas.", resposta: "quimica"},
  {texto: "Congelar suco de laranja.", resposta: "fisica"},
  {texto: "Combustão de papel.", resposta: "quimica"},
  {texto: "Rasgar tecido.", resposta: "fisica"},
  {texto: "Reação entre ácido e base formando sal e água.", resposta: "quimica"},
  {texto: "Mistura de areia e pedra.", resposta: "fisica"},
  {texto: "Pão mofando.", resposta: "quimica"},
  {texto: "Cortar legumes.", resposta: "fisica"},
  {texto: "Oxidação de bronze.", resposta: "quimica"},
  {texto: "Dissolução de pó de café em água.", resposta: "fisica"},
  {texto: "Queima de gasolina no carro.", resposta: "quimica"},
  {texto: "Desfazer gelo em água.", resposta: "fisica"}
];

    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    function renderHistorico() {
      const historicoDiv = document.getElementById('historico');
      historicoDiv.innerHTML = '';
      alunos.forEach((aluno, index) => {
        const entry = document.createElement('div');
        entry.className = 'historico-entry';
        entry.innerHTML = `
          <span><b>${aluno.nome}</b> - Série: ${aluno.serie} - Nota: ${aluno.nota}/10</span>
          <button class="delete-btn" onclick="deletarAluno(${index})">×</button>
        `;
        historicoDiv.appendChild(entry);
      });
    }

    function deletarAluno(index) {
      alunos.splice(index, 1);
      localStorage.setItem('alunos', JSON.stringify(alunos));
      renderHistorico();
    }

    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('cadastroContainer').classList.add('hidden');
      document.getElementById('historicoContainer').classList.add('hidden');
      document.getElementById('quizContainer').classList.remove('hidden');
      carregarQuiz();
    });

    function carregarQuiz() {
      const quizDiv = document.getElementById('quiz');
      quizDiv.innerHTML = '';
      let perguntasEscolhidas = perguntas.sort(() => 0.5 - Math.random()).slice(0,10);
      perguntasEscolhidas.forEach((p, i) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';
        qDiv.innerHTML = `<p><b>${i+1}. ${p.texto}</b></p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        ["quimica", "fisica"].forEach(opcao => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'option-btn';
          btn.textContent = opcao.charAt(0).toUpperCase() + opcao.slice(1);
          btn.addEventListener('click', () => {
            document.querySelectorAll(`.q${i}`).forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            btn.value = opcao;
          });
          btn.classList.add(`q${i}`);
          optionsDiv.appendChild(btn);
        });

        qDiv.appendChild(optionsDiv);
        quizDiv.appendChild(qDiv);
      });
    }

    document.getElementById('submitQuiz').addEventListener('click', function() {
      let score = 0;
      const quizDiv = document.getElementById('quiz');
      const perguntasDivs = quizDiv.querySelectorAll('.question');
      perguntasDivs.forEach((qDiv, i) => {
        const selected = qDiv.querySelector('.option-btn.selected');
        if(selected && selected.value === perguntas[i].resposta) score++;
      });

      const nome = document.getElementById('nome').value;
      const serie = document.getElementById('serie').value;
      alunos.push({nome, serie, nota: score});
      localStorage.setItem('alunos', JSON.stringify(alunos));

      document.getElementById('quizContainer').classList.add('hidden');

      const resultadoAlert = document.getElementById('resultadoAlert');
      resultadoAlert.textContent = `${nome}, sua nota foi ${score}/10.`;
      resultadoAlert.style.display = 'block';
      setTimeout(() => { resultadoAlert.style.display = 'none'; }, 4000);

      document.getElementById('cadastroContainer').classList.remove('hidden');
      document.getElementById('historicoContainer').classList.remove('hidden');
      document.getElementById('nome').value = '';
      document.getElementById('serie').value = '';

      renderHistorico();
    });

    renderHistorico();