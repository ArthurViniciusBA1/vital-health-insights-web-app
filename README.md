# Vital Health Insights

![Vital Health Insights Logo (se houver)](/public/VitalHeathLogo.svg)

Este projeto é uma aplicação web desenvolvida com **Next.js** que visa otimizar o processo de entrada de acompanhantes em hospitais, reduzindo filas e agilizando o acesso. Futuramente, planejamos incorporar o reconhecimento facial para aprimorar ainda mais a eficiência do sistema.

## Visão Geral do Projeto

O Vital Health Insights oferece as seguintes funcionalidades principais:

* **Cadastro de Usuários**: Permite que novos usuários (acompanhantes) se cadastrem no sistema.
* **Autenticação de Usuários**: Sistema de login seguro para acesso às funcionalidades do dashboard.
* **Dashboard do Usuário**: Área onde o acompanhante pode visualizar suas informações cadastrais.
* **Painel Administrativo (Provisório)**: Uma interface para visualização de todos os usuários cadastrados (será aprimorado com funcionalidades de autenticação e autorização robustas no futuro).
* **Gerenciamento de Sessão**: Utiliza cookies para manter a sessão do usuário.

## Informações Técnicas e de Segurança

Este projeto emprega diversas tecnologias e práticas para garantir a segurança e a funcionalidade.

### Autenticação e Autorização

* **JSON Web Tokens (JWT)**: A autenticação é realizada através de JWTs. Após um login bem-sucedido, um token é gerado e armazenado em um cookie `httpOnly` e `secure` (em produção), garantindo que ele não seja acessível via JavaScript no navegador.
  * **Secret do JWT**: O `JWT_SECRET` é uma variável de ambiente crucial para a assinatura e verificação dos tokens. É essencial que esta chave seja mantida em segredo e configurada de forma segura no ambiente de produção para evitar ataques de falsificação de token.
  * **Validade do Token**: O token tem uma duração de 7 dias, após os quais o usuário precisará fazer login novamente.

* **Middleware de Autenticação**: Um middleware no Next.js (`src/app/middleware.ts`) intercepta as requisições para proteger rotas privadas. Ele verifica a validade do token JWT presente nos cookies. Se o token for inválido ou inexistente em uma rota protegida, o usuário é redirecionado para a página de login. Rotas públicas de autenticação (como `/entrar` e `/cadastro`) redirecionam o usuário para o dashboard se ele já estiver autenticado.

### Criptografia de Dados Sensíveis

* **Criptografia AES-256-CBC para CPF**: O CPF, sendo um dado sensível, é criptografado antes de ser armazenado no banco de dados. Utiliza-se o algoritmo AES-256-CBC.
  * **Chave de Criptografia**: A `ENCRYPTION_KEY` é uma chave de 32 bytes (representada como 64 caracteres hexadecimais) usada para criptografar e descriptografar o CPF. É crucial que esta chave seja uma variável de ambiente segura e que nunca seja exposta.
  * **IV Fixo**: Atualmente, um *Initialization Vector* (IV) fixo é utilizado para a criptografia. Para aumentar a segurança e proteger contra ataques de repetição, é recomendável implementar um IV aleatório e armazená-lo junto com o dado criptografado no futuro.

### Hash de Senha

* **Bcrypt.js**: As senhas dos usuários são armazenadas no banco de dados como hashes, utilizando a biblioteca `bcryptjs`. Isso garante que as senhas em texto puro nunca sejam armazenadas, mesmo em caso de violação do banco de dados, protegendo contra ataques de força bruta e dicionário.

### Banco de Dados

* **Prisma ORM**: O Prisma é utilizado como Object-Relational Mapper (ORM) para interagir com o banco de dados. A estrutura do banco de dados é definida no esquema Prisma e as migrações geram as tabelas SQL, como a tabela `Usuario` que armazena informações como `id`, `name`, `cpf` (criptografado), `birthDate`, `address` e `password` (hashed).
  * `src/lib/prisma.ts` configura o PrismaClient para evitar múltiplas instâncias em desenvolvimento, otimizando o hot-reloading.
  * `src/lib/user.ts` contém funções para procurar usuários por CPF (criptografado) e por ID no banco de dados.

### Validação de Dados

* **Zod**: A validação de esquemas de entrada (como dados de cadastro e login) é realizada utilizando a biblioteca Zod. Isso garante que os dados recebidos pelas APIs estejam em conformidade com as expectativas, prevenindo dados maliciosos ou mal formatados.

### Estrutura do Projeto (Next.js)

* **App Router**: O projeto utiliza o App Router do Next.js, com rotas organizadas por convenção de arquivos e pastas.
* **Componentes Reutilizáveis**: Componentes de UI como `Button`, `InputIcon`, `Dialog` e `Form` são definidos em `src/components/ui/` para promover a reutilização e consistência visual.
* **Estilização**: Utiliza Tailwind CSS com PostCSS e Autoprefixer para uma estilização moderna e responsiva.
* **Context API**: O `UserContext` (`src/context/UserContext.tsx`) é usado para gerenciar o estado do usuário autenticado no lado do cliente, permitindo que os componentes acessem facilmente as informações do usuário.

## Próximos Passos (Desenvolvimento Futuro)

* **Reconhecimento Facial**: Integração com tecnologias de reconhecimento facial para autenticação e verificação de identidade, agilizando ainda mais o processo de entrada.
* **Autenticação e Autorização para o Painel Admin**: Implementar um sistema robusto de autenticação e autorização para o painel administrativo, garantindo que apenas usuários autorizados possam acessar e gerenciar os dados dos acompanhantes.
* **IV Dinâmico para Criptografia**: Migrar de um IV fixo para um IV gerado aleatoriamente e armazenado junto com o dado criptografado para aumentar a segurança do CPF.
* **Internacionalização (i18n)**: Suporte a múltiplos idiomas para uma experiência mais inclusiva.
* **Testes Automatizados**: Implementação de testes unitários, de integração e end-to-end para garantir a estabilidade e qualidade do código.

## Como Começar

Para configurar o projeto em seu ambiente de desenvolvimento:

1. **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd vital-health-insights/web-app
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
    ```

3. **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (na mesma pasta de `package.json`) e adicione as seguintes variáveis:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
    JWT_SECRET="sua_chave_secreta_para_jwt_aqui_minimo_32_caracteres"
    ENCRYPTION_KEY="sua_chave_de_criptografia_de_32_bytes_em_hexadecimal_aqui"
    ```

    * `DATABASE_URL`: Conexão com seu banco de dados PostgreSQL.
    * `JWT_SECRET`: Uma string longa e aleatória para assinar os JWTs. Use uma ferramenta para gerar uma string segura.
    * `ENCRYPTION_KEY`: Uma chave hexadecimal de 64 caracteres (32 bytes) para a criptografia do CPF. Você pode gerar uma usando `openssl rand -hex 32`.

4. **Execute as migrações do Prisma:**

    ```bash
    npx prisma migrate dev --name init
    ```

    Isso criará a tabela `Usuario` no seu banco de dados, conforme definido em `prisma/migrations/20250522182632_init/migration.sql`.

5. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    # ou
    bun dev
    ```

6. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura de Pastas Relevantes

* `src/app/`: Contém as rotas da aplicação Next.js.
  * `(user)/(private)/dashboard/`: Dashboard do usuário autenticado.
  * `(user)/(public)/cadastro/`: Formulário de cadastro.
  * `(user)/(public)/entrar/`: Formulário de login.
  * `api/`: Rotas da API.
    * `admin/usuarios/`: API para gerenciamento de usuários (apenas em modo provisório).
    * `login/`: API de login.
    * `logout/`: API de logout.
    * `usuarios/`: API de cadastro de usuários.
  * `middleware.ts`: Middleware de autenticação para proteção de rotas.
* `src/components/`: Componentes React reutilizáveis.
  * `ui/`: Componentes de UI como `Button`, `InputIcon`, `Dialog`, `Form` etc..
* `src/context/UserContext.tsx`: Contexto React para gerenciar o estado do usuário.
* `src/lib/`: Funções de utilidade e bibliotecas.
  * `encryption.ts`: Funções de criptografia/descriptografia.
  * `jwt.ts`: Funções para geração e validação de JWTs.
  * `prisma.ts`: Configuração do Prisma Client.
  * `schemas/usuarioSchema.ts`: Definições de esquemas de validação com Zod.
  * `user.ts`: Funções para interação com o modelo de usuário do Prisma.
  * `utils.ts`: Funções utilitárias diversas (formatação de CPF, etc.).
* `prisma/`: Esquema do banco de dados e migrações.
  * `schema.prisma`: Definição do modelo de dados.
  * `migrations/`: Histórico de migrações do banco de dados.
