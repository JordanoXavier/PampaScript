# PampaScript

A linguagem PampaScript tem como propósito ser semelhante à língua portuguesa, podendo ser utilizada no contexto educacional para o ensino da programação.
Este é um projeto que utiliza JavaScript e a biblioteca PEG.js para compilar uma DSL (Domain-Specific Language) simples e executar os comandos definidos nessa linguagem.

## Funcionalidades

- **Compilação de DSL**: O projeto é capaz de compilar uma DSL específica definida para realizar operações de atribuição, condições, loops e saída de valores.
- **Execução de Comandos**: Ao rodar a DSL, o sistema executa os comandos correspondentes em JavaScript de acordo com a lógica definida.

## Sintaxe
O arquivo `example.pampa` contém exemplos de uso das funcionalidades implementadas até o momento.
```
X = 10;

SE X > 5 ENTÃO
    Y = X * 2;
FIMSE

ENQUANTO X > 2 FAÇA
    X = X - 1;
FIMENQUANTO

ESCREVA X;
ESCREVA Y;
```

## Como Usar

### Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina.

### Instalação

1. Clone o repositório ou faça o download do código-fonte.
2. Instale as dependências usando o seguinte comando:

    ```bash
    npm install
    ```

### Uso

1. Defina seu código em um arquivo ou use o exemplo `example.pampa`.
2. Execute o programa usando:

    ```bash
    npm run compile example.pampa
    ```
