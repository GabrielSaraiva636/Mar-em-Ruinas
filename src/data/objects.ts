import type { PollutionObjectDetails } from "@/types/simulation";

export const pollutionObjects: PollutionObjectDetails[] = [
  {
    id: 'bottle',
    name: 'Garrafa Plástica',
    decomposition: '450 anos',
    microplastics: 'alta',
    affected: ['Plâncton', 'Peixes pequenos', 'Tubarões'],
    impact: 'Libera microfibras e fragmentos que entram na cadeia alimentar. Representa ~40% dos resíduos oceânicos.',
    solutions: ['Reciclagem responsável', 'Reduzir uso de plástico', 'Coleta em praias', 'Usar garrafas reutilizáveis']
  },
  {
    id: 'bag',
    name: 'Sacola Plástica',
    decomposition: 'Até 400 anos',
    microplastics: 'média',
    affected: ['Aves marinhas', 'Peixes', 'Tartarugas marinhas'],
    impact: 'Causa engasgo em animais marinhos. Fragmenta-se em microplásticos que atravessam a cadeia alimentar.',
    solutions: ['Substituir por sacolas reutilizáveis', 'Políticas de redução', 'Sacolas de papel ou algodão']
  },
  {
    id: 'net',
    name: 'Rede de Pesca Abandonada',
    decomposition: '600 anos',
    microplastics: 'alta',
    affected: ['Peixes grandes', 'Mamíferos marinhos', 'Humanos'],
    impact: 'Redes de nylon liberam microplásticos contínuamente. Causa morte de animais presos. Contaminação severa.',
    solutions: ['Redes biodegradáveis', 'Regulação de pesca', 'Limpeza de oceanos']
  },
  {
    id: 'tire',
    name: 'Pneu Descartado',
    decomposition: 'Mais de 100 anos',
    microplastics: 'muito alta',
    affected: ['Organismos marinhos', 'Humanos via cadeia alimentar'],
    impact: 'Libera toxinas pesadas e microplásticos. Cria "ilhas" de poluição no fundo do oceano.',
    solutions: ['Reciclagem de pneus', 'Evitar descartes ilegais', 'Tecnologia de recuperação']
  },
  {
    id: 'packaging',
    name: 'Embalagem de Espuma',
    decomposition: 'Mais de 500 anos',
    microplastics: 'alta',
    affected: ['Peixes', 'Aves marinhas', 'Humanos'],
    impact: 'Fragmenta-se em pequenas esferas de poliestireno. Imitam alimentos e causam morte por desnutrição.',
    solutions: ['Embalagens biodegradáveis', 'Reduzir uso de espuma', 'Políticas de embalagem']
  }
];
