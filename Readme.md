# Documentação da API de Autenticação
Esta API permite que os usuários se registrem e façam login em um sistema, fornecendo credenciais de autenticação. A seguir, estão descritas as rotas disponíveis na API:

## Rota de Registro:
A rota de registro permite que um usuário crie uma conta em um sistema. O corpo da solicitação deve incluir os seguintes parâmetros:

Requisição
`POST /user/register`

```json
{
  "username": "cadu",
  "email": "cadu@gmail.com",
  "avatar": "basic_man" | "basic_woman",
  "password": "123456",
  "accentColor": "#9d12f7"
}
```

| Parâmetro   |  Tipo  |               Descrição              |
|-------------|--------|--------------------------------------|
| username    | string | O nome de usuário do novo usuário    |
| email       | string | O endereço de e-mail do novo usuário |
| avatar      | string | O nome do avatar do novo usuário     |
| password    | string | A senha do novo usuário              |
| accentColor | string | A cor de destaque do novo usuário    |

## Resposta
A resposta da solicitação inclui um token de autenticação que pode ser usado para fazer login no sistema.

```json
{
  "sucess": true,
  "message": "Usuário registrado com sucesso",
  "token": "TOKEN_DE_AUTENTICAÇÃO"
}
```
## Rota de Login:
A rota de login permite que um usuário faça login no sistema. O corpo da solicitação deve incluir os seguintes parâmetros:

## Requisição
`POST /user/login`

```json
{
  "email": "cadu0970@gmail.com",
  "password": "123456"
}
```

| Parâmetro   |  Tipo  |               Descrição              |
|-------------|--------|--------------------------------------|
| email       | string | O endereço de e-mail do novo usuário |
| password    | string | A senha do novo usuário              |

## Resposta
A resposta da solicitação inclui um token de autenticação que pode ser usado para acessar recursos protegidos do sistema.

```json
{
  "sucess": true,
  "message": "Login realizado com sucesso",
  "token": "TOKEN_DE_AUTENTICAÇÃO"
}
```
Caso haja algum erro durante a solicitação, a resposta conterá uma mensagem de erro.

```json
{
  "sucess": false,
  "message": "Mensagem de erro"
}
```