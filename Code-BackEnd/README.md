# ConnectPharmacy - REST API (backend)

<a href="https://docs.nestjs.com/first-steps">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>
  </a>

<a href="https://swagger.io/">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"/>
  </a>

<a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  </a>

<a href="https://docs.docker.com/">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  </a>


## Configuração inicial:

### Clonar o projeto:
```bash
git clone https://tools.ages.pucrs.br/connectpharmacy/connectpharmacy-backend.git
```

### Instalação do projeto

```bash
$ npm install
```

### Arquivo .env:

Adicionar um arquivo na raiz do projeto com o nome ".env".
O arquivo deve ter como conteúdo:
```
DATABASE_URL="postgresql://<db_username>:<db_passowrd>@<host>:5432/<db_name>"
```

Quando executar o backend com o docker-compose o host será: ```postgres```

O arquivo também deve conter o conteúdo da váriavel JWT_SECRET:
```
JWT_SECRET=3A16A1185C3F214B9B11E884E7E59
```

Parar gerar o valor dessa várivel use o site: https://randomkeygen.com/ no campo ```256-bit WEP Keys```.



## Como rodar o projeto
O projeto está organizado em containers. Para rodar o projeto em ambiente de desenvolvimento:

### Executar o projeto com Docker:

Executar o docker no projeto:
```
$ docker-compose up
```

Quando terminar de utilizar o container
```
$ docker-compose down -v
```
O comando "-v" garante que o docker vai apagar o volume criado pelo container, caso esqueça de utilizar o "-v"
basta utilizar o seguinte comando para apagar volumes que não estão sendo utilizados:
```
$ docker volume prune
```

### Swagger
Depois de executar o programa, basta acessar a seguinte URL para ver o swagger com a explicação de todas as rotas disponibilizadas pela API:

```
localhost:3000/api/
```

### Executar o backend localmente:

Recomendamos que execute o banco de dados sempre pelo docker, para evitar configurações extensas. Caso queria fazer testes ou precise executar o backend localmente siga esse tutorial.

Para executar somente o banco de dados no docker basta comentar a parte entre "######### BACKEND #########"e executar o comando de iniciação do container:
```
$ docker-compose up
```

Após inicializar o docker-compose com o banco de dados para executar o Backend do projeto localmente siga os proximos comandos:

## Instalação do projeto

```bash
$ npm install
```
### Gerando o banco de dados com Prisma:
```bash
# Gera o client do banco de dados no codigo
npx prisma generate

# Gera as migrações do banco de dados
npx prisma migrate dev --name dev 

# Gera dados iniciais no banco de dados
# Esses dados podem ser encontrados em prisma/seed.ts
npx prisma db seed
```

### Executando o app

```bash
# Executar em modo de desenvolvimento
$ npm run start

# Executar em modo de desenvolvimento com watch mode
$ npm run start:dev
```

### Executando o app utilizando Makefile

Conseguimos utilizar o Makefile para executar tanto o banco de dados como o back end de maneira mais otimizada
e fácil. Para isso, primeiramente precisamos instalar o gerenciador de pacotes Chocolatey, depois dessa etapa instalaremos o Make.

Instalando o Chocolatey:

- Abra um terminal Powershell como administrador

- Execute o comando: 

```bash
# Comando a ser executado para instalar.
$ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Comando para verificar a instalação do Chocolatey (verifique se a versão deste aparecerá no terminal). 
$ choco
# Caso não seja possível confirmar a instalação, feche o atual terminal e reabra um novo Powershell como administrador.
```

Instalando o Make:

- Abra um terminal Powershell como administrador

- Execute o comando: 

```bash
# Comando a ser executado para instalar.
$ choco install make

# Comando para verificar a instalação do Make (verifique se a versão deste aparecerá no terminal). 
$ make --version
# Caso não seja possível confirmar a instalação, feche o atual terminal e reabra um novo Powershell como administrador.
```

Após instalar o gerenciador de pacotes Chocolatey e o utilitário Make, os comandos make podem ser 
utilizados para rodar a aplicação.

```bash

# Comando para parar os containers existentes referentes a aplicação
$ make drop
	
# Comando para parar os container referentes a aplicação e deletar as migrations de execuções passadas
# Recomendado para quando existem erros recorrentes ao tentar executar.
$ make drop-force

# Comando para rodar somente o banco de dados da aplicação.
$ make run-database

# Comando para rodar a aplicação e migrações no banco de dados 
# Obs: para este comando funcionar por si só, precisamos ter o banco de dados rodando.
$ make run-server

# Comando que executa o banco de dados, as migrações e o back-end da aplicação ao mesmo tempo.
$ make -j run
# Obs, se já existe um banco de dados com migrações existentes, será necessário, quando os comandos pararem de rodar no terminal (ou seja quando o terminal se estibilizar e nenhum outro dado estiver sendo impresso na tela) apertar a tecla "y"  para confirmar as migrações.
```