import React, { useState, useEffect, useCallback } from 'react';

// --- Constantes e Dados do Quiz ---
// const APP_ID = 'show-do-saber-ssma-default'; // No longer needed without Firebase
const TIMER_DURATION = 30; // Segundos

const quizData = {
  ambiente: [
    {
      id: 1,
      questionText: "EM CASO DE OCORRÊNCIA AMBIENTAL DENTRO DAS INSTALAÇÕES DA VALE, QUAL NÚMERO DEVE SER OBRIGATORIAMENTE ACIONADO PRIMEIRO?",
      options: [
        { text: "Centro de Controle Operacional (CCO)" },
        { text: "Centro de Controle Ambiental (CCA)" },
        { text: "Corpo de Bombeiros" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🌍" // Ícone de globo
    },
    {
      id: 2,
      questionText: "QUAL O IMPACTO DO DESCARTE INADEQUADO DE EFLUENTES NO MEIO AMBIENTE?",
      options: [
        { text: "Estímulo ao crescimento saudável de espécies aquáticas." },
        { text: "Contaminação de rios e solos, prejudicando a fauna, a flora e a saúde humana." },
        { text: "Purificação natural da água e aumento da qualidade ambiental." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🌱" // Ícone de planta a brotar
    },
    {
      id: 3,
      scenarioText: "JOÃO ESTÁ REALIZANDO O MAPEAMENTO DOS ASPECTOS E IMPACTOS AMBIENTAIS RELACIONADOS À ATIVIDADE DE PINTURA INDUSTRIAL.",
      questionText: "CONSIDERANDO AS POSSÍVEIS CONSEQUÊNCIAS AMBIENTAIS DESSA ATIVIDADE, ASSINALE A ALTERNATIVA QUE APRESENTA CORRETAMENTE O ASPECTO AMBIENTAL, O IMPACTO ASSOCIADO E UMA MEDIDA DE CONTROLE ADEQUADA:",
      options: [
        { text: "Aspecto ambiental: Geração de resíduos não perigosos Impacto ambiental: Alteração da qualidade do solo Medida de controle: Coleta seletiva" },
        { text: "Aspecto ambiental: Emissão de poluentes atmosféricos Impacto ambiental: Alteração da qualidade do ar Medida de controle: Manutenção preventiva de veículos e equipamentos" },
        { text: "Aspecto ambiental: Geração de resíduos perigosos Impacto ambiental: Alteração da qualidade da água e do solo Medida de controle: Acondicionamento adequado de produtos químicos e disponibilização de kit de contenção ambiental" }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "🏭" // Ícone de fábrica
    },
    {
      id: 4,
      questionText: "DE ACORDO COM O PRO 27494 – PROGRAMA DE GESTÃO DE PRODUTOS QUÍMICOS, QUAL É O PROCEDIMENTO CORRETO PARA O FRACIONAMENTO DE PRODUTOS QUÍMICOS?",
      options: [
        { text: "Utilizar garrafa PET, desde que contenha identificação com rotulagem preventiva." },
        { text: "Utilizar recipiente homologado pelo INMETRO, devidamente identificado com rotulagem preventiva conforme normas vigentes." },
        { text: "Utilizar qualquer recipiente, desde que impeça o vazamento do produto." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🧪" // Ícone de tubo de ensaio
    },
    {
      id: 5,
      questionText: "EM QUAL SITUAÇÃO É OBRIGATÓRIO MANTER A GARRAFA LAVA-OLHOS NA FRENTE DE SERVIÇO E QUAL DEVE SER A PERIODICIDADE PARA A TROCA DA ÁGUA?",
      options: [
        { text: "É obrigatório durante a utilização de produtos químicos, e a água deve ser trocada a cada 2 dias." },
        { text: "É obrigatório durante qualquer atividade, e a água deve ser trocada a cada 2 dias." },
        { text: "Não é obrigatório, pois o procedimento foi descontinuado; porém, se estiver disponível na frente de serviço, a água deve ser trocada a cada 3 dias." }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "👁️" // Ícone de olho
    },
    {
      id: 6,
      questionText: "QUAIS SÃO OS 5 SENSOS DO PROGRAMA 5S?",
      options: [
        { text: "Limpeza, Organização, Autodisciplina ,Padronização e sustentabilidade" },
        { text: "Utilização, Organização, Limpeza, Padronização e Autodisciplina" },
        { text: "Organização, Limpeza, Padronização, Manutenção e Controle" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🧹" // Ícone de vassoura
    },
    {
      id: 7,
      questionText: "QUAL É A PRINCIPAL IMPORTÂNCIA DA RECICLAGEM?",
      options: [
        { text: "Substituir totalmente a necessidade de cuidar da natureza" },
        { text: "Aumentar o consumo de produtos industrializados." },
        { text: "Reduzir a quantidade de resíduos e preservar o meio ambiente." }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "♻️" // Ícone de reciclagem
    },
    {
      id: 8,
      questionText: "QUAL É A IMPORTÂNCIA DE MANTER O 5S NO AMBIENTE DE TRABALHO?",
      options: [
        { text: "Criar um ambiente mais confuso e desorganizado." },
        { text: "Garantir um ambiente limpo, organizado e mais produtivo." },
        { text: "Aumentar a quantidade de papéis acumulados e objetos desnecessários." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "✨" // Ícone de brilho/limpeza
    },
    {
      id: 9,
      questionText: "QUAIS SÃO OS 5RS DA SUSTENTABILIDADE?",
      options: [
        { text: "Refazer, Remover, Remeter, Resgatar e Resumir." },
        { text: "Repetir, Renovar, Reembalar, Resfriar e Reformar." },
        { text: "Reduzir, Reutilizar, Reciclar, Repensar e Recusar." }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "💡" // Ícone de lâmpada/ideia
    },
    {
      id: 10,
      questionText: "QUAL O IMPACTO DO DESCARTE INADEQUADO DE RESÍDUOS NO MEIO AMBIENTE?",
      options: [
        { text: "Poluição do solo, da água e do ar, prejudicando a saúde humana e os ecossistemas." },
        { text: "Melhoria na qualidade de vida e preservação dos recursos naturais." },
        { text: "Aumento da biodiversidade e proteção da fauna e flora." }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "🗑️" // Ícone de cesto de lixo
    }
  ],
  seguranca: [
    {
      id: 1,
      questionText: "O QUE É JUNHO VERMELHO?",
      options: [
        { text: "Junho Vermelho é uma campanha de conscientização sobre a importância da doação de medula óssea, realizada anualmente no mês de junho." },
        { text: "Junho Vermelho é uma campanha de conscientização sobre a importância da doação de órgãos, realizada anualmente no mês de junho." },
        { text: "Junho Vermelho é uma campanha de conscientização sobre a importância da doação de sangue, realizada anualmente no mês de junho." }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "🩸"
    },
    {
      id: 2,
      questionText: "POR QUE JUNHO É CONSIDERADO O MÊS VERMELHO?",
      options: [
        { text: "Junho é considerado o mês vermelho porque é um período de conscientização sobre a importância da doação de sangue para salvar vidas." },
        { text: "Junho é considerado o mês vermelho porque é um período de conscientização sobre a importância da hidratação nos dias de calor intenso." },
        { text: "Junho é considerado o mês vermelho porque é um período de conscientização sobre a importância de se prevenir contra o câncer de próstata." }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "📅"
    },
    {
      id: 3,
      questionText: "QUAL É O OBJETIVO PRINCIPAL DA CAMPANHA JUNHO VERMELHO?",
      options: [
        { text: "O objetivo principal é orientar pessoas a doação de sangue e multiplicar os estoques de plaquetas nos bancos de sangue." },
        { text: "O objetivo principal é incentivar a doação de sangue e aumentar os estoques de sangue nos bancos de sangue." },
        { text: "O objetivo principal é incentivar a doação de sangue e aumentar os triglicerídeos estoques de sangue nos bancos de sangue." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🎯"
    },
    {
      id: 4,
      questionText: "QUEM PODE DOAR SANGUE?",
      options: [
        { text: "Pessoas saudáveis, com idade entre 16 e 69 anos, que atendam aos requisitos de peso, saúde e outros critérios estabelecidos pelos bancos de sangue." },
        { text: "Pessoas saudáveis, com idade entre 18 e 60 anos, que atendam aos requisitos de peso, saúde e outros critérios estabelecidos pelos bancos de sangue." },
        { text: "Pessoas saudáveis, com idade entre 18 e 45 anos, que atendam aos requisitos de peso, saúde e outros critérios estabelecidos pelos bancos de sangue." }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "👥"
    },
    {
      id: 5,
      questionText: "QUAIS SÃO OS REQUISITOS BÁSICOS PARA DOAR SANGUE?",
      options: [
        { text: "Estar em boas condições de saúde, ter entre 18 e 60 anos, pesar mais de 10 kg, e não ter doenças ou condições que impeçam a doação." },
        { text: "Estar em boas condições de saúde, ter entre 16 e 69 anos, pesar mais de 50 kg, e não ter doenças ou condições que impeçam a doação." },
        { text: "Estar em boas condições de saúde, ter entre 18 e 70 anos, pesar mais de 60 kg, e não ter doenças ou condições que impeçam a doação." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "✅"
    },
    {
      id: 6,
      questionText: "COMO POSSO PARTICIPAR DA CAMPANHA JUNHO VERMELHO?",
      options: [
        { text: "Você pode participar doando sangue em um banco de sangue ou posto de saúde próximo a você e compartilhando informações sobre a importância da doação de sangue nos hospitais." },
        { text: "Você pode participar doando sangue em uma clínica de hemodiálise ou hemocentro próximo a você e compartilhando informações sobre a importância da doação de sangue nas redes sociais." },
        { text: "Você pode participar doando sangue em um banco de sangue ou hemocentro próximo a você e compartilhando informações sobre a importância da doação de sangue nas redes sociais." }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "🤝"
    },
    {
      id: 7,
      questionText: "QUAIS SÃO OS BENEFÍCIOS DA DOAÇÃO DE SANGUE?",
      options: [
        { text: "Além de salvar vidas, a doação de sangue pode ajudar a emagrecer, matem a pele hidratada e ajuda muitas pessoas." },
        { text: "Além de salvar vidas, a doação de sangue pode ajudar a detectar doenças silenciosas nos doadores e é um ato de solidariedade." },
        { text: "Além de salvar vidas, a doação de sangue pode ajudar a detectar doenças silenciosas nas pessoas com algum tipo de comorbidade." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "❤️"
    },
    {
      id: 8,
      questionText: "A DOAÇÃO DE SANGUE DÓI?",
      options: [
        { text: "A doação de sangue é um procedimento rápido e geralmente doloroso, embora algumas pessoas possam sentir desconforto durante a inserção da agulha." },
        { text: "A doação de sangue é um procedimento demorado e geralmente indolor, embora algumas pessoas possam sentir um muito desconforto durante a inserção da agulha na pele." },
        { text: "A doação de sangue é um procedimento rápido e geralmente indolor, embora algumas pessoas possam sentir um leve desconforto durante a inserção da agulha." }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "💉"
    },
    {
      id: 9,
      questionText: "COM QUE FREQUÊNCIA POSSO DOAR SANGUE?",
      options: [
        { text: "Homens podem doar sangue a cada 50 dias, e mulheres a cada 45 dias, respeitando os limites máximos de doações por ano." },
        { text: "Homens podem doar sangue a cada 60 dias, e mulheres a cada 90 dias, respeitando os limites máximos de doações por ano." },
        { text: "Homens podem doar sangue a cada 60 dias, e mulheres a cada 50 dias, respeitando os limites máximos de doações por ano." }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "⏱️"
    },
    {
      id: 10,
      questionText: "ONDE POSSO ENCONTRAR LOCAIS PARA DOAR SANGUE PERTO DE MIM?",
      options: [
        { text: "HEMOCENTRO" },
        { text: "CLÍNICA DE HEMODIALISE" },
        { text: "POSTO DE SAÚDE" }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "🏥"
    }
  ],
  saude: [
    {
      id: 1,
      questionText: "QUAL É A POSTURA CORRETA PARA LEVANTAR PESO DO CHÃO?",
      options: [
        { text: "Dobrar as costas e manter as pernas esticadas" },
        { text: "Dobrar os joelhos, manter as costas retas e usar a força das pernas" },
        { text: "Levantar rapidamente para não forçar a coluna" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "💪"
    },
    {
      id: 2,
      questionText: "QUAIS SÃO OS BENEFÍCIOS DA GINÁSTICA LABORAL?",
      options: [
        { text: "Aumentar a fadiga e o estresse" },
        { text: "Prevenir lesões, melhorar a postura e reduzir o estresse" },
        { text: "Diminuir a produtividade no trabalho" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🧘"
    },
    {
      id: 3,
      questionText: "QUAL É A IMPORTÂNCIA DAS PAUSAS DURANTE O TRABALHO?",
      options: [
        { text: "Apenas para descansar" },
        { text: "Prevenir fadiga, melhorar a concentração e reduzir riscos de acidentes" },
        { text: "Diminuir a produtividade" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "⏰"
    }
  ]
};


// --- Componentes ---

// Componente: Modal
const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
        <h2 id="modal-title" className="text-white mb-4">{message}</h2>
        <button 
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          aria-label="Fechar modal"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// Componente: Timer
const Timer = ({ timeLeft }) => (
  <div className="flex items-center" role="timer" aria-label={`Tempo restante: ${timeLeft} segundos`}>
    <div className="w-8 h-8 rounded-full border-2 border-red-400 flex items-center justify-center">
      {timeLeft}
    </div>
  </div>
);

// Componente: Ecrã Inicial
const InitialScreen = ({ onStartQuiz, onViewRanking }) => {
  const [participantName, setParticipantName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleStart = () => {
    if (!selectedQuiz) {
      setModalMessage('Por favor, selecione um quiz para começar.');
      setShowModal(true);
      return;
    }
    if (participantName.trim()) {
      onStartQuiz(participantName.trim(), selectedQuiz);
    } else {
      setModalMessage('Por favor, insira o seu nome para começar.');
      setShowModal(true);
    }
  };
  
  const screenBackgroundStyle = "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4";

  return (
    <div className={screenBackgroundStyle}>
      <img src="https://placehold.co/150x80/003366/FFFFFF?text=REDE&font=Inter" alt="Logo Rede Montagens Industriais" className="mb-6 h-20 rounded-lg" />
      <h1 className="text-4xl font-bold mb-2 text-center text-blue-400">Show do Saber SSMA</h1>
      <p className="text-xl mb-8 text-gray-300">Conectados pela REDE</p>
      
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-2xl">
        <input
          type="text"
          placeholder="Digite o seu nome"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          aria-label="Nome do participante"
        />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Escolha seu Quiz</h2>
          <div className="space-y-3">
            <button
              onClick={() => setSelectedQuiz('ambiente')}
              className={`w-full p-3 rounded-lg text-left transition duration-150 ease-in-out ${
                selectedQuiz === 'ambiente' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-600'
              }`}
            >
              Quiz Meio Ambiente
            </button>
            <button
              onClick={() => setSelectedQuiz('seguranca')}
              className={`w-full p-3 rounded-lg text-left transition duration-150 ease-in-out ${
                selectedQuiz === 'seguranca' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-600'
              }`}
            >
              Quiz da Segurança
            </button>
            <button
              onClick={() => setSelectedQuiz('saude')}
              className={`w-full p-3 rounded-lg text-left transition duration-150 ease-in-out ${
                selectedQuiz === 'saude' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-600'
              }`}
            >
              Quiz da Saúde
            </button>
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!participantName.trim() || !selectedQuiz}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Iniciar Quiz"
        >
          Iniciar Quiz
        </button>
        <button
          onClick={onViewRanking}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out"
          aria-label="Ver Ranking"
        >
          Ver Ranking (Top 3)
        </button>
      </div>
      
      <Modal 
        isOpen={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

// Componente: Ecrã do Quiz
const QuizScreen = ({ participantName, selectedQuiz, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const currentQuestion = quizData[selectedQuiz][currentQuestionIndex];

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizData[selectedQuiz].length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(TIMER_DURATION);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      onQuizEnd(score);
    }
  }, [currentQuestionIndex, score, onQuizEnd, selectedQuiz]);

  useEffect(() => {
    if (answered) {
      return;
    }
    if (timeLeft === 0) {
      setAnswered(true);
      setModalMessage('Tempo esgotado!');
      setShowModal(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, answered]);

  const handleAnswer = (optionIndex) => {
    if (answered) return;

    setSelectedOption(optionIndex);
    setAnswered(true);
    const isCorrect = optionIndex === currentQuestion.correctOptionIndex;
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setModalMessage('Resposta correta!');
    } else {
      setModalMessage('Resposta incorreta!');
    }
    setShowModal(true);
  };

  const screenBackgroundStyle = "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4";

  if (!currentQuestion) {
    return <div className={screenBackgroundStyle}><p className="text-white text-center py-10">A carregar pergunta...</p></div>;
  }

  return (
    <div className={screenBackgroundStyle}>
      <div className="w-full max-w-2xl bg-gray-700 p-6 md:p-8 rounded-xl shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-blue-300">Pergunta {currentQuestionIndex + 1} de {quizData[selectedQuiz].length}</span>
          <Timer timeLeft={timeLeft} />
        </div>

        <div className="text-center mb-2">
          <span className="text-5xl">{currentQuestion.decorativeIcon}</span>
        </div>

        {currentQuestion.scenarioText && (
          <p className="text-md text-gray-300 mb-3 text-center italic">{currentQuestion.scenarioText}</p>
        )}
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-100">{currentQuestion.questionText}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full text-left p-3 md:p-4 rounded-lg transition duration-150 ease-in-out text-sm md:text-base ";
            
            if (answered) {
              if (index === currentQuestion.correctOptionIndex) {
                buttonClass += "bg-green-500 hover:bg-green-600 text-white font-semibold";
              } else if (index === selectedOption) {
                buttonClass += "bg-red-500 hover:bg-red-600 text-white font-semibold";
              } else {
                buttonClass += "bg-gray-600 text-gray-300 cursor-not-allowed";
              }
            } else {
              buttonClass += "bg-blue-600 hover:bg-blue-700 text-white";
            }

            if (selectedOption === index && !answered) {
              buttonClass += " ring-2 ring-yellow-400";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={buttonClass}
                aria-label={`Opção ${index + 1}: ${option.text}`}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        {answered && (
          <button
            onClick={handleNextQuestion}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-lg"
          >
            {currentQuestionIndex < quizData[selectedQuiz].length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
          </button>
        )}
      </div>

      <Modal 
        isOpen={showModal}
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
          if (answered) {
            handleNextQuestion();
          }
        }}
      />
    </div>
  );
};

// Componente: Ecrã de Resultados
const ResultsScreen = ({ participantName, score, selectedQuiz, onPlayAgain, onViewRanking }) => {
  const saveResult = () => {
    fetch('https://quiz-api.SEUNOME.workers.dev/ranking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: participantName,
        score,
        date: new Date().toISOString()
      })
    });
  };

  const screenBackgroundStyle = "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4";

  return (
    <div className={screenBackgroundStyle}>
      <img src="https://placehold.co/150x80/003366/FFFFFF?text=REDE&font=Inter" alt="Logo Rede Montagens Industriais" className="mb-6 h-20 rounded-lg" />
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Resultado Final</h2>
        <p className="text-xl mb-2 text-gray-200">Parabéns, <span className="font-semibold text-yellow-400">{participantName}!</span></p>
        <p className="text-2xl mb-6 text-gray-100">
          Você acertou <span className="font-bold text-green-400">{score}</span> de <span className="font-bold text-green-400">{quizData[selectedQuiz].length}</span> perguntas!
        </p>
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out"
          >
            Jogar Novamente
          </button>
          <button
            onClick={onViewRanking}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out"
          >
            Ver Ranking (Top 3)
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente: Ecrã de Ranking
const RankingScreen = ({ onBackToHome }) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch('https://quiz-api.SEUNOME.workers.dev/ranking')
      .then(res => res.json())
      .then(data => setRanking(data));
  }, []);

  const screenBackgroundStyle = "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4";

  return (
    <div className={screenBackgroundStyle}>
        <img src="https://placehold.co/150x80/003366/FFFFFF?text=REDE&font=Inter" alt="Logo Rede Montagens Industriais" className="mb-6 h-20 rounded-lg" />
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Top 3 - Ranking</h2>
        {ranking.length > 0 ? (
          <div className="space-y-4">
            {ranking.map((entry, index) => (
              <div key={index} className="bg-gray-600 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{entry.name}</span>
                  <span className="text-blue-400">{entry.score} pontos</span>
                </div>
                <div className="text-sm text-gray-300">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">Nenhum resultado ainda.</p>
        )}
        <button
          onClick={onBackToHome}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out"
        >
          Voltar ao Ecrã Inicial
        </button>
      </div>
    </div>
  );
};


// --- Componente Principal App ---
function App() {
  const [currentScreen, setCurrentScreen] = useState('initial'); // 'initial', 'quiz', 'results', 'ranking'
  const [participantName, setParticipantName] = useState('');
  const [score, setScore] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleStartQuiz = (name, quiz) => {
    setParticipantName(name);
    setSelectedQuiz(quiz);
    setCurrentScreen('quiz');
  };

  const handleQuizEnd = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('results');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('quiz');
  };

  const handleViewRanking = () => {
    setCurrentScreen('ranking');
  };

  const handleBackToHome = () => {
    setCurrentScreen('initial');
  };

  if (currentScreen === 'initial') {
    return <InitialScreen onStartQuiz={handleStartQuiz} onViewRanking={handleViewRanking} />;
  }
  if (currentScreen === 'quiz') {
    return <QuizScreen participantName={participantName} selectedQuiz={selectedQuiz} onQuizEnd={handleQuizEnd} />;
  }
  if (currentScreen === 'results') {
    return <ResultsScreen 
              participantName={participantName} 
              score={score} 
              selectedQuiz={selectedQuiz}
              onPlayAgain={handlePlayAgain} 
              onViewRanking={handleViewRanking}
            />;
  }
  if (currentScreen === 'ranking') {
    return <RankingScreen onBackToHome={handleBackToHome} />;
  }

  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4"><p>A carregar aplicação...</p></div>;
}

export default App;