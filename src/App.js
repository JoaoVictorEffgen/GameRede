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
      id: 11,
      questionText: "Qual os documentos necessários/obrigatórios para realização de atividade a quente?",
      options: [
        { text: "ART, Checklist, autorização de trabalho a quente, abertura de PTS" },
        { text: "Checklist, Carteirinha de operação de ponte rolante" },
        { text: "Cartão de bloqueio, passaporte" }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "📄" // Ícone de documento
    },
    {
      id: 12,
      questionText: "Quais os EPI's necessários para realização de atividade a quente?",
      options: [
        { text: "Blusão de raspa, avental de raspa, perneira de raspa, luva de raspa cano longo, óculos de lente clara, máscara de solda com visor escuro, botina manobreiro, protetor auditivo." },
        { text: "Avental de PVC, protetor solar, luva nitrílica, óculos, protetor facial incolor" },
        { text: "Macacão Tyvek, perneira, luva de vaqueta, protetor facial incolor." }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "🧤" // Ícone de luvas
    },
    {
      id: 13,
      questionText: "Qual documento podemos identificar as medidas de controle para uma atividade?",
      options: [
        { text: "PEL (Plano de emergência local)" },
        { text: "ART (Análise de risco da tarefa)" },
        { text: "Anexo 3 (Autorização de trabalho a quente)" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "📋" // Ícone de prancheta
    },
    {
      id: 14,
      questionText: "Qual item abaixo ajuda a prevenir incêndios em trabalhos a quente?",
      options: [
        { text: "Cortina de ar" },
        { text: "Tapete antiderrapante" },
        { text: "Manta antichamas" }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "🛡️" // Ícone de escudo
    },
    {
      id: 15,
      questionText: "Quais das atividades são exemplos de trabalho a quente?",
      options: [
        { text: "Soldagem, corte com maçarico e esmerilhamento" },
        { text: "Pintura, limpeza e manutenção elétrica" },
        { text: "Limpeza de escritório com aspirador de pó" }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "🔥" // Ícone de fogo
    },
    {
      id: 16,
      questionText: "Quais riscos estão associados ao trabalho a quente?",
      options: [
        { text: "Queda de altura, ruído e iluminação insuficiente" },
        { text: "Choque térmico e frio extremo" },
        { text: "Incêndios, explosões e queimaduras" }
      ],
      correctOptionIndex: 2,
      decorativeIcon: "⚠️" // Ícone de aviso
    },
    {
      id: 17,
      questionText: "Qual é a função do extintor próximo ao local do trabalho a quente?",
      options: [
        { text: "Atuar rapidamente em caso de princípio de incêndio" },
        { text: "Decorar o ambiente" },
        { text: "Ser usado somente em treinamentos" }
      ],
      correctOptionIndex: 0,
      decorativeIcon: "🚨" // Ícone de sirene
    },
    {
      id: 18,
      questionText: "O que é uma área classificada?",
      options: [
        { text: "São locais destinados especificamente para o trabalho a quente" },
        { text: "Área na qual uma atmosfera explosiva está presente" },
        { text: "São aquelas que possuem menor potencial de risco de incêndio" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "☢️" // Ícone de risco radiativo (usado para áreas perigosas)
    },
    {
      id: 19,
      questionText: "Não é proibida a instalação de adaptadores entre o cilindro e o regulador de pressão!",
      options: [
        { text: "Verdadeiro" },
        { text: "Falso" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "🚫" // Ícone de proibido
    },
    {
      id: 20,
      questionText: "Os cilindros de gás devem ser mantidos em que posição?",
      options: [
        { text: "Instalados de forma a se tornar parte de circuito elétrico, mesmo que acidentalmente" },
        { text: "Mantidos em posição vertical, fixados e distantes de chamas, fontes de centelhamento, calor ou de produtos" },
        { text: "Quando inoperantes e/ou vazios, mantidos com as válvulas abertas e guardados com o protetor de válvulas (capacete rosqueado" }
      ],
      correctOptionIndex: 1,
      decorativeIcon: "📦" // Ícone de caixa (representando armazenamento)
    }
  ],
  saude: [
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
  const [participantCPF, setParticipantCPF] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleCPFChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setParticipantCPF(value);
    }
  };

  const handleStart = () => {
    if (!selectedQuiz) {
      setModalMessage('Por favor, selecione um quiz para começar.');
      setShowModal(true);
      return;
    }

    if (!participantCPF) {
      setModalMessage('Por favor, digite seu CPF.');
      setShowModal(true);
      return;
    }

    const existingRanking = JSON.parse(localStorage.getItem('quizRanking') || '[]');
    const hasPlayed = existingRanking.some(
      entry => entry.cpf === participantCPF && entry.quiz === selectedQuiz
    );

    if (hasPlayed) {
      setModalMessage('Você já completou este quiz. Por favor, escolha outro quiz.');
      setShowModal(true);
      return;
    }

    onStartQuiz(participantName, selectedQuiz, participantCPF);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white p-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/menu.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md bg-gray-700 bg-opacity-90 p-8 rounded-xl shadow-2xl">
        <input
          type="text"
          placeholder="Digite o seu nome"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Digite seu CPF (apenas números)"
          value={participantCPF}
          onChange={handleCPFChange}
          maxLength={11}
          className="w-full p-3 mb-6 border border-gray-600 rounded-lg bg-gray-800 text-white"
        />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Escolha seu Quiz</h2>
          <div className="space-y-3">
            {Object.keys(quizData).map((quizKey) => {
              const existingRanking = JSON.parse(localStorage.getItem('quizRanking') || '[]');
              const hasPlayed = existingRanking.some(
                entry => entry.cpf === participantCPF && entry.quiz === quizKey
              );
              
              return (
                <button
                  key={quizKey}
                  onClick={() => setSelectedQuiz(quizKey)}
                  disabled={hasPlayed}
                  className={`w-full p-3 rounded-lg text-left ${
                    selectedQuiz === quizKey 
                      ? 'bg-green-600 text-white' 
                      : hasPlayed
                      ? 'bg-gray-500 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {quizKey === 'ambiente' ? 'Quiz Meio Ambiente' :
                   quizKey === 'seguranca' ? 'Quiz da Segurança' :
                   'Quiz da Saúde'}
                  {hasPlayed && ' (Já completado)'}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
        >
          Iniciar Quiz
        </button>
        <button
          onClick={onViewRanking}
          className="w-full mt-4 bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
        >
          Ver Ranking
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
  const [totalTime, setTotalTime] = useState(0);

  const currentQuestion = quizData[selectedQuiz][currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData[selectedQuiz].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(TIMER_DURATION);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      onQuizEnd(score, totalTime);
    }
  };

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
      setTimeLeft((prevTime) => {
        setTotalTime(prev => prev + 1);
        return prevTime - 1;
      });
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

  if (!currentQuestion) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <p className="text-white text-center py-10">A carregar pergunta...</p>
    </div>;
  }

  const getBackgroundImage = () => {
    switch (selectedQuiz) {
      case 'saude':
        return `url(${process.env.PUBLIC_URL}/images/saude.png)`;
      case 'ambiente':
        return `url(${process.env.PUBLIC_URL}/images/meio_ambiente.png)`;
      case 'seguranca':
        return `url(${process.env.PUBLIC_URL}/images/seguranca.png)`;
      default:
        return `url(${process.env.PUBLIC_URL}/images/quiz.png)`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-2xl bg-gray-700 bg-opacity-90 p-6 md:p-8 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-blue-300">Pergunta {currentQuestionIndex + 1} de {quizData[selectedQuiz].length}</span>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border-2 border-red-400 flex items-center justify-center">
              {timeLeft}
            </div>
          </div>
        </div>

        <div className="text-center mb-2">
          <span className="text-5xl">{currentQuestion.decorativeIcon}</span>
        </div>

        {currentQuestion.scenarioText && (
          <p className="text-md text-gray-300 mb-3 text-center italic">{currentQuestion.scenarioText}</p>
        )}
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-100">{currentQuestion.questionText}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`w-full text-left p-3 md:p-4 rounded-lg text-sm md:text-base ${
                answered
                  ? index === currentQuestion.correctOptionIndex
                    ? 'bg-green-500 text-white'
                    : index === selectedOption
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-600 text-gray-300'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {answered && (
          <button
            onClick={handleNextQuestion}
            className="w-full mt-6 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
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
const ResultsScreen = ({ participantName, score, selectedQuiz, onPlayAgain, onViewRanking, participantCPF, totalTime }) => {
  useEffect(() => {
    const existingRanking = JSON.parse(localStorage.getItem('quizRanking') || '[]');
    existingRanking.push({
      name: participantName,
      cpf: participantCPF,
      quiz: selectedQuiz,
      score,
      time: totalTime,
      date: new Date().toISOString()
    });
    existingRanking.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    });
    localStorage.setItem('quizRanking', JSON.stringify(existingRanking));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/results.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Resultado Final</h2>
        <p className="text-xl mb-2 text-gray-200">Parabéns, <span className="font-semibold text-yellow-400">{participantName}!</span></p>
        <p className="text-2xl mb-2 text-gray-100">
          Você acertou <span className="font-bold text-green-400">{score}</span> de <span className="font-bold text-green-400">{quizData[selectedQuiz].length}</span> perguntas!
        </p>
        <p className="text-xl mb-6 text-gray-200">
          Tempo total: <span className="font-bold text-yellow-400">{totalTime}</span> segundos
        </p>
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
          >
            Jogar Novamente
          </button>
          <button
            onClick={onViewRanking}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
          >
            Ver Ranking
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
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
    const storedRanking = JSON.parse(localStorage.getItem('quizRanking') || '[]');
    
    // Agrupar resultados por CPF
    const groupedResults = storedRanking.reduce((acc, entry) => {
      if (!acc[entry.cpf]) {
        acc[entry.cpf] = {
          name: entry.name,
          cpf: entry.cpf,
          totalScore: 0,
          totalTime: 0,
          quizzes: {},
          lastDate: entry.date
        };
      }
      
      // Somar pontuação e tempo
      acc[entry.cpf].totalScore += entry.score;
      acc[entry.cpf].totalTime += entry.time;
      
      // Guardar resultado individual do quiz
      acc[entry.cpf].quizzes[entry.quiz] = {
        score: entry.score,
        time: entry.time
      };
      
      // Atualizar data mais recente
      if (new Date(entry.date) > new Date(acc[entry.cpf].lastDate)) {
        acc[entry.cpf].lastDate = entry.date;
      }
      
      return acc;
    }, {});
    
    // Converter para array e ordenar
    const unifiedRanking = Object.values(groupedResults)
      .sort((a, b) => {
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore;
        }
        return a.totalTime - b.totalTime;
      });
    
    setRanking(unifiedRanking);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/ranking.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Ranking Completo</h2>
        {ranking.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {ranking.map((entry, index) => (
              <div key={index} className="bg-gray-600 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-bold mr-2">#{index + 1}</span>
                    <span className="font-bold">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-400 block">{entry.totalScore} pontos totais</span>
                    <span className="text-green-400 text-sm">{entry.totalTime} segundos totais</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <div>Quiz Meio Ambiente: {entry.quizzes.ambiente?.score || 0} pontos</div>
                  <div>Quiz Segurança: {entry.quizzes.seguranca?.score || 0} pontos</div>
                  <div>Quiz Saúde: {entry.quizzes.saude?.score || 0} pontos</div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Última atualização: {new Date(entry.lastDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">Nenhum resultado ainda.</p>
        )}
        <button
          onClick={onBackToHome}
          className="w-full mt-8 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg"
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
  const [participantCPF, setParticipantCPF] = useState('');
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleStartQuiz = (name, quiz, cpf) => {
    setParticipantName(name);
    setParticipantCPF(cpf);
    setSelectedQuiz(quiz);
    setCurrentScreen('quiz');
  };

  const handleQuizEnd = (finalScore, finalTime) => {
    setScore(finalScore);
    setTotalTime(finalTime);
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
      participantCPF={participantCPF}
      totalTime={totalTime}
    />;
  }
  if (currentScreen === 'ranking') {
    return <RankingScreen onBackToHome={handleBackToHome} />;
  }

  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4"><p>A carregar aplicação...</p></div>;
}

export default App;