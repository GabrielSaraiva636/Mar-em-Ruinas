# Arquitetura

## Organização

- `components/ui`: primitivas visuais reutilizáveis.
- `components/shared`: componentes compartilhados entre funcionalidades.
- `components/layout`: navegação e estrutura global.
- `components/ocean`: visualização decorativa do oceano.
- `features/simulation`: controles, métricas e resíduos.
- `features/food-chain`: bioacumulação.
- `features/quiz`: perguntas, feedback e impacto ambiental.
- `store`: estado e regras da simulação.
- `data`: conteúdo educativo.
- `types`: contratos do domínio.

## Fluxo

O Zustand mantém o estado ambiental. Simulação e quiz alteram esse estado; oceano, métricas e cadeia alimentar reagem aos mesmos dados.

## Regras

- Componentes de domínio ficam em `features`.
- Estado derivado é calculado no store.
- Dados estáticos não ficam dentro de componentes.
- Imports internos usam o alias `@/`.
- Apenas componentes UI utilizados permanecem no projeto.
