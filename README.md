# SEICOMP - Sistema de Eventos do Instituto de Computação da UFBA 

## Sobre o projeto
<div align="justify">
Atualmente o Instituto da Computação não possui nenhum sistema de controle dos seus eventos acadêmicos. O que se vê no Instituto atualmente, são divulgações descentralizadas, as quais são feitas a partir de e-mails, sites, grupos de pesquisa, listas específicas, dificultando a ciência e participação da comunidade nesses eventos.
</div>

<div align="justify">
Visando solucionar esse problema e atender a demanda do Instituto da Computação para a gestão e divulgação dos eventos acadêmicos, o objetivo do projeto é desenvolver um sistema web de eventos acadêmicos, gerido pelos administradores, professores, técnicos e utilizado por toda a comunidade acadêmica.
</div>
<br/>

## Membros e papéis

| Nome  | Papel  |
|---|---|
| Vinícius Trindade  | GESTÃO / FULLSTACK  |
| Cristhian Oliveira Carvalho  | BACKEND|
| Diego Carapiá da Costa | FRONTEND / DESIGN|
| Isaque Santana Copque  | BACKEND|
| - | -|


## Definição da ferramenta de gestão

- [GitHub](https://github.com/orgs/ic0045/projects/1) - para gestao de tarefas e codigo

## Processo de Desenvolvimento
 - Sprint semanal
 - Um dia para cada task
 - Reunião Semanal de Planejamento 
    - terça 21:00h
 - Reuniões Diárias 
    - segunda 20:00h
    - quinta: 21:00h
    - sabado 10:00h

## Documentos

- [Termo de Abertura](./docs/termo_abertura.pdf)
- [Requisitos](https://docs.google.com/spreadsheets/d/15ZO1JtwPHYhsB4rp6Ko_rEEBG1fMr6Br-LRbo9UJFr8/edit?usp=sharing)
- [Tarefas](https://docs.google.com/document/d/1l0lUObPUr0X5t_yZoVqar-2XRVD2W4d-r4NcgbBl2dY/edit?usp=sharing)
- [Rotas de API](https://isaquecopque.stoplight.io/docs/seicomp/branches/main/oneg2aiu3tl21-seicomp)

## Protótipos

- [Versão Web](https://www.figma.com/file/3ILo3QsC6TPdy4VOiiMoJt/Eventos-Comp?node-id=0%3A1&t=tCzSxbbYrjfWyZQc-1)
- [Versão Mobile](https://www.figma.com/file/xLgt4T2XivyfJlt7WlePwk/Untitled?node-id=0%3A1&t=O2nxvHh3li4Y3JHA-1)

## Diagramas

- [Diagrama ER](./docs/diagrama.png)
- [Diagrama de Arquitetura](https://drive.google.com/file/d/10-xVgrojvI21lgaq-59pYKtRhihIcOBN/view?usp=sharing)

## Ambientes

- [Produção](https://seicomp.onrender.com)
- [Desenvolvimento](https://seicomp-dev.onrender.com)

## Tecnologias

### Frontend

- [MaterialUI](https://mui.com/)
- [ReactJS](https://pt-br.reactjs.org/)
- [FlexboxGrid](http://flexboxgrid.com/)

### Backend

- [NodeJS 18](https://nodejs.org/en/download) 
- [TypeOrm](https://typeorm.io/)
- [Typescript](https://www.typescriptlang.org)
- [Docker](https://www.docker.com)
- [NextJS](https://nextjs.org/)

### Banco de dados

- [Postgresql](https://www.postgresql.org)
- [DBeaver](https://dbeaver.io/download/) (gerenciador de banco de dados)

### Cloud

- [Vercel](https://vercel.com/dashboard)
- [Render](https://render.com)

## Instalação


```bash
npm install
# or
yarn install
# or
pnpm install
```

## Execução


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```