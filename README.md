# Trabalho de conclusão de curso - AjudaAluno
Segue um exemplo de README para o repositório [TCC-FGA-AjudaAluno/ajuda-aluno-frontend](https://github.com/TCC-FGA-AjudaAluno/ajuda-aluno-frontend):

---

# AjudaAluno Frontend

![Badge de Licença](https://img.shields.io/github/license/TCC-FGA-AjudaAluno/ajuda-aluno-frontend)
![Badge de Versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Layout](#layout)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)


## Sobre o Projeto

O **AjudaAluno Frontend** é a interface web do projeto AjudaAluno, desenvolvido como parte do trabalho de conclusão de curso da FGA. O objetivo do projeto é fornecer uma plataforma que auxilie alunos em suas jornadas acadêmicas, oferecendo recursos como gestão de tarefas, fórum de discussões e acompanhamento de desempenho.

## Funcionalidades

- **Gestão de Tarefas:** Permite que os alunos criem, editem e acompanhem suas tarefas acadêmicas.
- **Fórum de Discussões:** Espaço para interação entre alunos e professores, promovendo debates e esclarecimento de dúvidas.
- **Acompanhamento de Desempenho:** Visualização de métricas e estatísticas sobre o progresso acadêmico do aluno.

## Layout

![Tela Inicial](https://i.imgur.com/TGKsqn1.gif)

> *Nota: Tela inicial e cadastro de novo usuário.*

![Tela Inicial](https://i.imgur.com/9bp2DGn.gif)

> *Agendar eventos como monitorias ou plantões de dúvidas de provas ou trabalhos selecionando uma data e horário de inicio dos eventos.*

![Tela Inicial](https://i.imgur.com/EFNz5jw.gif)

> *Upload de arquivos de matérias.*

![Tela Inicial](https://i.imgur.com/TIz9KNH.gif)

> *Nota: Inscrever-se em matéria.*

<!--![Tela Inicial](https://i.imgur.com/Fv08XSI.gif)!-->

![Tela Inicial](https://i.imgur.com/hQodVS2.gif)


![Tela Inicial](https://i.imgur.com/vv4aPLP.gif)

> *Nota: Criação de postagem em matéria.*

<!--
![Tela Inicial](https://i.imgur.com/V93YGSY.gif)

> *Nota: Insira capturas de tela reais do projeto para ilustrar o layout e as funcionalidades.*

![Tela Inicial](https://i.imgur.com/uRGzfQL.gif)

> *Nota: Insira capturas de tela reais do projeto para ilustrar o layout e as funcionalidades.*

![Tela Inicial](https://i.imgur.com/6MaJgai.gif)

> *Nota: Insira capturas de tela reais do projeto para ilustrar o layout e as funcionalidades.*

![Tela Inicial](https://i.imgur.com/fLcupyL.gif)

> *Nota: Insira capturas de tela reais do projeto para ilustrar o layout e as funcionalidades.*

![Tela Inicial](https://i.imgur.com/UoO88d6.gif)

> *Nota: Insira capturas de tela reais do projeto para ilustrar o layout e as funcionalidades.*

!-->


## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/TCC-FGA-AjudaAluno/ajuda-aluno-frontend.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ajuda-aluno-frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

## Como Usar

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

ou

```bash
yarn dev
```

O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:

```
ajuda-aluno-frontend/
├── public/
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── ...
├── .env
├── .gitignore
├── README.md
└── package.json
```

- **public/**: Contém arquivos estáticos, como imagens e fontes.
- **src/**: Diretório principal do código-fonte.
  - **components/**: Componentes reutilizáveis da interface.
  - **pages/**: Páginas da aplicação.
  - **styles/**: Arquivos de estilização (CSS, SCSS).
- **.env**: Arquivo de variáveis de ambiente.
- **.gitignore**: Lista de arquivos e pastas ignorados pelo Git.
- **README.md**: Documentação do projeto.
- **package.json**: Arquivo de configuração do npm/yarn.

> *Nota: A estrutura de pastas pode variar conforme a necessidade do projeto. É importante mantê-la organizada para facilitar a manutenção e escalabilidade.*

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Axios](https://axios-http.com/)

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.



