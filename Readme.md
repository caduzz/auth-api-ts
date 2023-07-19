# Documentação da API de Autenticação
Esta API permite que os usuários se registrem e façam login em um sistema, fornecendo credenciais de autenticação. A seguir, estão descritas as rotas disponíveis na API:

## Rota de Registro:
A rota de registro permite que um usuário crie uma conta em um sistema. O corpo da solicitação deve incluir os seguintes parâmetros:

## Requisição
`POST /user/register`

```json
{
  "username": "user",
  "email": "user@gmail.com",
  "avatar": "basic_man",
  "password": "123456",
  "accentColor": "#9d12f7"
}
```

| Parâmetro   |  Tipo  |               Descrição                                          |
|-------------|--------|------------------------------------------------------------------|
| username    | string | O nome de usuário do novo usuário                                |
| email       | string | O endereço de e-mail do novo usuário                             |
| avatar      | string | O Avatar exist dois tipos estaticos `basic_man` or `basic_woman` |
| password    | string | A senha do novo usuário                                          |
| accentColor | string | A cor de destaque do novo usuário                                |

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
  "email": "user@gmail.com",
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

## Requisição
`POST /user/infos`

```json
{
  "header": {
    "auth": "Bearer {token}"
  }
}
```

| Parâmetro   |  Tipo  |               Descrição              |
|-------------|--------|--------------------------------------|
| Header      |  Auth  | Bearer Token                         |

## Resposta
A resposta da solicitação inclui as informações do usaurio

```json
{
  {
    "sucess": true,
    "msg": "sucess create user",
    "user": {
      "id": "6ddd3647-686d-4210-add8-caa0f278544b",
      "email": "user@gmail.com",
      "avatar": "profile_basic_man.jpg",
      "accentColor": "#425451",
      "username": "user"
    }
  }
}
```
Caso haja algum erro durante a solicitação, a resposta conterá uma mensagem de erro.

```json
{
  "sucess": false,
  "message": "Mensagem de erro"
}
```

Certamente! Aqui está a documentação atualizada da API, incluindo as rotas adicionais de criação e listagem de posts:

# Rota de Criação de Post:
A rota de criação de post permite que um usuário autenticado crie um novo post no sistema. O corpo da solicitação deve incluir a mensagem do post e o token de autenticação no cabeçalho.

## Requisição

`POST /post/create`

```json
{
  "message": "Conteúdo do post"
}
```

| Parâmetro   |  Tipo  |               Descrição              |
|-------------|--------|--------------------------------------|
| msg         | string | O conteúdo do post                   |

## Resposta
A resposta da solicitação retorna o ID do post criado.

```json
{
  "success": true,
  "message": "Post criado com sucesso",
  "postId": "ID_DO_POST"
}
```
Caso haja algum erro durante a solicitação, a resposta conterá uma mensagem de erro.

```json
{
  "success": false,
  "message": "Mensagem de erro"
}
```
Rota de Listagem de Posts:
A rota de listagem de posts permite que um usuário autenticado obtenha uma lista dos posts existentes no sistema. A solicitação deve incluir o token de autenticação no cabeçalho.

## Requisição

`GET /post/list`

| Parâmetro   |    Tipo     |               Descrição              |
|-------------|-------------|--------------------------------------|
| headers	    | Barer Token | Cabeçalho da solicitação             |

## Resposta

A resposta da solicitação retorna uma lista dos posts existentes.

```json
{
  "success": true,
  "message": "Lista de posts obtida com sucesso",
  "posts": [
    {
      "postId": "ID_DO_POST_1",
      "msg": "Conteúdo do post 1",
      "user": {
        "userId": "ID_DO_USUÁRIO",
        "username": "Nome do Usuário",
        "email": "email@example.com",
        "avatar": "URL_do_Avatar"
      }
    },
    {
      "postId": "ID_DO_POST_2",
      "msg": "Conteúdo do post 2",
      "user": {
        "userId": "ID_DO_USUÁRIO",
        "username": "Nome do Usuário",
        "email": "email@example.com",
        "avatar": "URL_do_Avatar"
      }
    },
  ]
}
```
Caso haja algum erro durante a solicitação, a resposta conterá uma mensagem de erro.

```json
  {
    "success": false,
    "message": "Mensagem de erro"
  }
```
Lembre-se de incluir o token de autenticação no cabeçalho das solicitações para as rotas protegidas.