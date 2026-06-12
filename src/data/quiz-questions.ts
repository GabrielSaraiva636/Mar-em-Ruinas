import type { QuizQuestion } from "@/types/simulation";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Qual atitude reduz diretamente a entrada de plástico no oceano?",
    answers: ["Reduzir descartáveis", "Queimar embalagens", "Descartar em rios", "Enterrar resíduos"],
    correctAnswer: 0,
    explanation: "Reduzir produtos descartáveis evita o resíduo antes que ele chegue ao ambiente.",
    pollutionImpact: 0.07,
  },
  {
    question: "Como microplásticos entram na cadeia alimentar?",
    answers: ["Pela ingestão de organismos menores", "Apenas pela respiração", "Eles não entram", "Somente pela água potável"],
    correctAnswer: 0,
    explanation: "Plâncton e pequenos animais ingerem os fragmentos e são consumidos por predadores.",
    pollutionImpact: 0.06,
  },
  {
    question: "Quanto tempo uma garrafa plástica pode levar para se decompor?",
    answers: ["Cerca de 450 anos", "Cerca de 5 anos", "Cerca de 20 anos", "Cerca de 50 anos"],
    correctAnswer: 0,
    explanation: "Garrafas plásticas podem permanecer no ambiente por aproximadamente 450 anos.",
    pollutionImpact: 0.06,
  },
  {
    question: "O que acontece com o plástico quando ele se fragmenta no oceano?",
    answers: ["Desaparece completamente", "Vira microplástico", "Transforma-se em alimento", "Purifica a água"],
    correctAnswer: 1,
    explanation: "O plástico se quebra em partículas menores, mas continua presente e contaminando o ambiente.",
    pollutionImpact: 0.08,
  },
  {
    question: "Qual resíduo é conhecido como pesca fantasma?",
    answers: ["Garrafa PET", "Canudo", "Rede de pesca abandonada", "Embalagem de papel"],
    correctAnswer: 2,
    explanation: "Redes abandonadas continuam prendendo e matando animais por muitos anos.",
    pollutionImpact: 0.07,
  },
  {
    question: "Por que tartarugas confundem sacolas plásticas com alimento?",
    answers: ["Parecem águas-vivas", "Têm cheiro de algas", "Brilham no escuro", "Produzem calor"],
    correctAnswer: 0,
    explanation: "Na água, sacolas podem ter forma e movimento semelhantes aos de águas-vivas.",
    pollutionImpact: 0.06,
  },
  {
    question: "Qual prática doméstica ajuda a reduzir microfibras de roupas sintéticas?",
    answers: ["Lavar pequenas cargas diariamente", "Usar filtro coletor e lavar menos", "Aumentar a temperatura", "Descartar roupas no lixo comum"],
    correctAnswer: 1,
    explanation: "Filtros coletores e menos lavagens reduzem a liberação de fibras sintéticas no esgoto.",
    pollutionImpact: 0.05,
  },
  {
    question: "O que significa bioacumulação?",
    answers: ["A limpeza natural do oceano", "O acúmulo de contaminantes nos organismos", "A reprodução de peixes", "A formação de recifes"],
    correctAnswer: 1,
    explanation: "Contaminantes se acumulam nos tecidos e podem aumentar ao longo da cadeia alimentar.",
    pollutionImpact: 0.08,
  },
  {
    question: "Qual é a destinação mais adequada para uma garrafa PET limpa?",
    answers: ["Coleta seletiva", "Praia", "Vaso sanitário", "Queima doméstica"],
    correctAnswer: 0,
    explanation: "A coleta seletiva permite a triagem e a reciclagem adequada do material.",
    pollutionImpact: 0.05,
  },
  {
    question: "Qual escolha causa maior benefício duradouro?",
    answers: ["Trocar descartáveis por reutilizáveis", "Usar mais embalagens", "Descartar lixo longe de casa", "Comprar porções individuais"],
    correctAnswer: 0,
    explanation: "Itens reutilizáveis reduzem continuamente a geração de novos resíduos.",
    pollutionImpact: 0.07,
  },
];
