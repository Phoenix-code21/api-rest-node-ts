API REST construída com **Node.js + TypeScript**, que permite autenticar usuários e criar, editar e deletar blogs de forma segura. Utiliza **JWT** para autenticação e **MySQL 8** como banco de dados. Containerizada com **Docker**.

---

## 📦 Stack utilizada

- Node.js + TypeScript
- Express.js
- JWT para autenticação
- MySQL 8
- Docker + Docker Compose
- Camadas organizadas por responsabilidade (Service, Controller, Repository, Middleware, etc)

---

# 🚀 Como subir com Docker

> Requisitos: Docker e Docker Compose instalados

```bash
docker-compose up --build
```

🔑 Autenticação
---
Todas as rotas de criação, edição e exclusão de blog exigem autenticação via JWT.

🔓 Login
POST /api/auth:

Body:
```bash
{
  "username": "phoenix",
  "password": "code21"
}
```
Response:
```bash
{
  "success": true,
  "data": {
    "token": "SEU_TOKEN_JWT_AQUI"
  }
}
```
---
📚 Endpoints da API

📌 Criar Blog
POST /api/create/blog

Body:
```bash
{
  "name": "criando_meu_blog"
}
```
Response:
```bash
{
  "status": 201,
  "success": true,
  "message": "Blog [1] criado com sucesso!"
}
```

✏️ Atualizar Blog
PUT /api/update/blog

Body:
```bash
{
  "id": 1,
  "name": "novo_nome"
}
```
Response:
```bash
{
  "status": 200,
  "success": true,
  "message": "Blog [1] atualizado com sucesso!"
}
```

🗑️ Deletar Blog
DELETE /api/delete/blog


Body:
```bash
{
  "id": 1
}
```
Response:
```bash
{
  "status": 200,
  "success": true,
  "message": "Blog [1] deletado com sucesso!"
}
```

🧪 Banco de Dados
A pasta schema/ contém o script SQL necessário para criar o banco de dados MySQL utilizado na aplicação.
Use-o para preparar o ambiente local ou executar testes com a mesma estrutura de produção.


