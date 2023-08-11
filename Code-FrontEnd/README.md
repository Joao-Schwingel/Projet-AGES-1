## Arquitetura

Neste página, vamos apresentar o passo a passo de como instalar e configurar um ambiente de desenvolvimento local para utilizar o React pré-configurado para TypeScript.

#### O que é React?

O React é uma biblioteca JavaScript que permite criar interfaces com o usuário de forma declarativa, flexível e eficiente. Essa biblioteca é de código aberto e permite a composição de UI's complexas a partir de pequenos e isolados códigos denominados "componentes". Em outras palavras, o React é uma ferramenta que ajuda a construir a interação entre humanos e máquinas por meio de elementos como botões, menus e sons, tornando essa interação mais fácil e intuitiva.

#### O que é TypeScript?

O TypeScript é uma linguagem de programação de código aberto, desenvolvida pela Microsoft, que funciona como um superset de JavaScript. Ele adiciona recursos como tipagem estática opcional à linguagem, tornando-a mais robusta e poderosa, especialmente para projetos complexos. Em outras palavras, o TypeScript é uma ferramenta que amplia as funcionalidades da linguagem JavaScript, proporcionando maior eficiência e produtividade no desenvolvimento de aplicações.

## Requisitos

O editor escolhido é o Visual Studio Code, desenvolvido pela Microsoft para sistemas operacionais Windows, Linux e macOS, possui diversas funcionalidades, tais como suporte para depuração, controle de versionamento Git integrado, realce de sintaxe, complementação inteligente de código, snippets e refatoração de código.

Para utilizarmos o React e rodar as aplicações no navegador será necessário a instalação do NPM (Node Package Manager) que é o responsável pelo gerenciamento dos pacotes de aplicativos, inclusive o próprio React. Para isso, precisaremos instalar o Node.js, que é uma plataforma de desenvolvimento web de alta performance usando JavaScript, e que possuí o NPM como parte do pacote.

* [NPM ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Node.js](https://nodejs.org/en)
* [VS Code](https://code.visualstudio.com/download)

#### Extensões Obrigatórias

* [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### Instalação

Adicionar um arquivo na raiz do projeto com o nome ".env".
O arquivo deve ter como conteúdo:
```
REACT_APP_API='https://link.api.back'; 
```

Execute os seguintes comandos no terminal:
```
npm install
npm start

```

Depois de executar o programa, basta acessar a seguinte URL para ter acesso a aplicação
```
localhost:3001
