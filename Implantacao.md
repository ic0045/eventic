# EVENTIC - Sistema de Eventos do Instituto de Computação da UFBA 

## Guia de Implantação

## Requisitos

Esse sistema possui como requisitos os seguintes softwares:

1. NodeJS 18.15.0
1. PostgreSQL


## Instalação

Para instalação basta seguir os seguintes passos:

1. Crie um banco de dados PostgreSQL com o seguinte script:
[Script de Criacao do Banco](./docs/database/create-ufbaeventos-202306051645.sql)

1. Clone git@github.com:ic0045/eventic.git
1. No diretorio eventic execute:

```bash
npm install
```
1. Crie um arquivo .env com o seguinte conteudo:
```bash
DB_NAME="ufbaeventos"
DB_HOST="<INFORMEHOSTDOBANCO>"
DB_PORT="5432"
DB_PASSWORD="<INFORMESENHADOBANCO>"
DB_USERNAME="root"
DEBUG="true"
NODE_ENV="development"
PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
NEXTAUTH_SECRET="<DEFINAUMSEGREDO>"
SENDGRID_API_KEY="<SOLICITE O CODIGO DA API PARA ufba_dcc_ic045_20231_events_team@googlegroups.com>"
SENDGRID_EMAIL="ufba_dcc_ic045_20231_events_team@googlegroups.com"
```

## Execução

Para executar o sistema rode o seguinte comando: 

```bash
npm run dev
```

