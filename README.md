# Hurry Backend
## A backend for The Hurry Project


# Usuários

## MÉTODO POST | https://hurrybackend.herokuapp.com/users/interests |
#### Rota para filtro de eventos baseado no gosto musical do usuário
***ROTA AUTENTICADA***

Sem necessidade de corpo (body)


Retorno esperado, exemplo: 
  
```json
[
  {
    "id": "e46a5c1c-a67f-419f-836c-efdc2b275143",
    "name": "Emicida",
    "provider_id": "8c245d45-2071-49ae-bed7-d3593ccdc951",
    "artists_ids": null,
    "musicstyle_id": "9b0edf57-1001-4b14-9d07-2d1780ddb4bb",
    "eventtype_id": "ceafbdf5-3ee5-4528-a0cc-34f2921afbb1",
    "date": "2020-11-10T23:30:53.975Z",
    "eventImage_url": "https://hurryawsbucket.s3.sa-east-1.amazonaws.com/1b3ffa8917259792d5f2c981ee7d1e27amilia.png",
    "eventImage_id": "545be535-f91c-4caf-80b6-2b0935d8d8e6",
    "tickets": "100",
    "state": "sp",
    "city": "são paulo",
    "street": "avenida paulista, 223",
    "created_at": "2020-11-10T23:30:55.746Z",
    "updated_at": "2020-11-10T23:33:33.755Z"
  }
]
```

## MÉTODO POST | https://hurrybackend.herokuapp.com/users/eventTypes |
#### Rota para filtro de eventos baseado no tipo de evento
***ROTA AUTENTICADA***

### body
```json
{
    "eventType_id": "ceafbdf5-3ee5-4528-a0cc-34f2921afbb1"
}

```

Retorno esperado, exemplo: 
  
```json
[
  {
    "id": "e46a5c1c-a67f-419f-836c-efdc2b275143",
    "name": "Emicida",
    "provider_id": "8c245d45-2071-49ae-bed7-d3593ccdc951",
    "artists_ids": null,
    "musicstyle_id": "9b0edf57-1001-4b14-9d07-2d1780ddb4bb",
    "eventtype_id": "ceafbdf5-3ee5-4528-a0cc-34f2921afbb1",
    "date": "2020-11-10T23:30:53.975Z",
    "eventImage_url": "https://hurryawsbucket.s3.sa-east-1.amazonaws.com/1b3ffa8917259792d5f2c981ee7d1e27amilia.png",
    "eventImage_id": "545be535-f91c-4caf-80b6-2b0935d8d8e6",
    "tickets": "100",
    "state": "sp",
    "city": "são paulo",
    "street": "avenida paulista, 223",
    "created_at": "2020-11-10T23:30:55.746Z",
    "updated_at": "2020-11-10T23:33:33.755Z"
  }
]
```

## MÉTODO DELETE | https://hurrybackend.herokuapp.com/users/deleteUser/:id |
#### Rota para delete de usuário.
***ROTA AUTENTICADA***


Sem necessidade de corpo (body)

Retorno esperado, exemplo: 
  
```json
{
  "message": "User sucessful deleted"
}
```

## MÉTODO POST | https://hurrybackend.herokuapp.com/users/resetPassword |
#### Rota para reset de password enviado para email
***ROTA NÃO AUTENTICADA***

### body

```json
{
  "email": "email do usuário logado."
}
```


Retorno esperado, exemplo: 
  
```json
{
  "message": "A new password was sended to your email"
}
```

## MÉTODO POST | https://hurrybackend.herokuapp.com/users/uploadAvatar |
#### Rota de atualização de avatar
***ROTA AUTENTICADA***

### MULTIPART (INSOMNIA)

avatar : FILE(exemplo: profile.jpg)


Retorno esperado, exemplo: 
  
```json
{
  "key": "7446394e175403dc340eac342d7e4dc4profile.jpg",
  "name": "profile.jpg",
  "size": 36965,
  "url": "https://hurryawsbucket.s3.amazonaws.com/7446394e175403dc340eac342d7e4dc4profile.jpg",
  "id": "dc9fd327-66d7-4c08-a269-57ae3a0cf16e",
  "created_at": "2020-12-08T00:35:27.041Z",
  "updated_at": "2020-12-08T00:35:27.041Z"
}
```

## MÉTODO GET | https://hurrybackend.herokuapp.com/users/:id |
#### Rota para mostrar perfil único de um usuário
***ROTA AUTENTICADA***


Retorno esperado, exemplo: 
  
```json
{
  "user": {
    "id": "8c245d45-2071-49ae-bed7-d3593ccdc951",
    "name": "Henrique Pires",
    "email": "h.pires06@gmail.com",
    "love": false,
    "state": "SP",
    "city": "Osasco",
    "birthday": "1999-02-06",
    "cpf": "44982764859",
    "cellphone": "11959064037",
    "musicInterest1_id": "3f5eefa3-cdfe-4831-a920-e9f6dd2b57eb",
    "musicInterest2_id": "b0a3a8ef-5abf-49ef-9a57-162a0846f528",
    "musicInterest3_id": "9b0edf57-1001-4b14-9d07-2d1780ddb4bb",
    "avatar_id": "dc9fd327-66d7-4c08-a269-57ae3a0cf16e",
    "avatar_url": "https://hurryawsbucket.s3.amazonaws.com/7446394e175403dc340eac342d7e4dc4profile.jpg",
    "created_at": "2020-11-09T11:09:13.756Z",
    "updated_at": "2020-12-08T00:35:28.277Z"
  }
}
```

## MÉTODO PATCH | https://hurrybackend.herokuapp.com/users/updateUserProfile |
#### Rota para atualizar dados de cadastro do usuário
***ROTA AUTENTICADA***

### body

*** Todos os dados são opcionais, basta não inserir se não quiser atualizar 'x' dado.
```json
{
	"name": "example",
	"email": "email@example.com",
	"musicinterest1_id": "41205dfe-9b70-40f0-94f2-a410849701c0",
	"musicinterest2_id": "a0693e61-d569-4a73-b13a-bc82dd543e3f",
	"musicinterest3_id": "7de73c6f-a705-4188-8d61-20ae1e4c1395",
	"love": true,
	"state": "SP",
	"city": "São Paulo",
	"birthday": "1111-01-01",
	"cpf": "12345678910",
	"cellphone": "11912345678"
}
```

Retorno esperado, exemplo: 
  
```json
{
  "user": {
    "id": "8c245d45-2071-49ae-bed7-d3593ccdc951",
    "name": "Henrique Pires",
    "email": "h.pires06@gmail.com",
    "love": false,
    "state": "SP",
    "city": "Osasco",
    "birthday": "1999-02-06",
    "cpf": "44982764859",
    "cellphone": "11959064037",
    "musicInterest1_id": "3f5eefa3-cdfe-4831-a920-e9f6dd2b57eb",
    "musicInterest2_id": "b0a3a8ef-5abf-49ef-9a57-162a0846f528",
    "musicInterest3_id": "9b0edf57-1001-4b14-9d07-2d1780ddb4bb",
    "avatar_id": "dc9fd327-66d7-4c08-a269-57ae3a0cf16e",
    "avatar_url": "https://hurryawsbucket.s3.amazonaws.com/7446394e175403dc340eac342d7e4dc4profile.jpg",
    "created_at": "2020-11-09T11:09:13.756Z",
    "updated_at": "2020-12-08T00:35:28.277Z"
  }
}
```

## MÉTODO POST | https://hurrybackend.herokuapp.com/users/updatePassword |
#### Rota para atualizar senha do usuário
***ROTA AUTENTICADA***

### body

*** Todos os dados são opcionais, basta não inserir se não quiser atualizar 'x' dado.
```json
{
	"oldPassword" : "senha antiga",
	"newPassword": "senha nova"
}
```

Retorno esperado, exemplo: 
  
```json
{
  "message": "password changed"
}
```


## MÉTODO POST | https://hurrybackend.herokuapp.com/users |
#### Rota para criar usuários
***ROTA NÃO AUTENTICADA***

### body

```json
{
	"name" : "nome",
	"email" : "example@example.com",
	"password": "password",
	"musicinterest1_id": "3f5eefa3-cdfe-4831-a920-e9f6dd2b57eb", //lembrar de inserir id válido de gosto musical
	"musicinterest2_id": "41205dfe-9b70-40f0-94f2-a410849701c0", //lembrar de inserir id válido de gosto musical
	"musicinterest3_id": "a0693e61-d569-4a73-b13a-bc82dd543e3f", //lembrar de inserir id válido de gosto musical
	"love": false,
	"state": "SP",
	"city": "São Paulo",
	"birthday": "11111-01-01",
	"cpf": "12345678910",
	"cellphone": "11912345678"
}
```

Retorno esperado, exemplo:  
  
```json
{
  "name": "nome",
  "email": "example@example.com",
  "love": false,
  "state": "SP",
  "city": "São Paulo",
  "birthday": "11111-01-01",
  "cpf": "12345678910",
  "cellphone": "11912345678",
  "musicInterest1_id": "3f5eefa3-cdfe-4831-a920-e9f6dd2b57eb",
  "musicInterest2_id": "41205dfe-9b70-40f0-94f2-a410849701c0",
  "musicInterest3_id": "a0693e61-d569-4a73-b13a-bc82dd543e3f",
  "id": "bc7c8ff3-c1b0-46fe-8e3d-937ddee74c0a",
  "created_at": "2020-12-08T00:53:41.424Z",
  "updated_at": "2020-12-08T00:53:41.424Z"
}
```

## MÉTODO GET | https://hurrybackend.herokuapp.com/users |
#### Rota listar usuários existentes
***ROTA AUTENTICADA***

Sem necessidade de corpo (body)

Retorno esperado, exemplo: 
  
```json
[
  {
    "id": "bc7c8ff3-c1b0-46fe-8e3d-937ddee74c0a",
    "name": "nome",
    "email": "example@example.com",
    "love": false,
    "state": "SP",
    "city": "São Paulo",
    "birthday": "11111-01-01",
    "cpf": "12345678910",
    "cellphone": "11912345678",
    "musicInterest1_id": "3f5eefa3-cdfe-4831-a920-e9f6dd2b57eb",
    "musicInterest2_id": "41205dfe-9b70-40f0-94f2-a410849701c0",
    "musicInterest3_id": "a0693e61-d569-4a73-b13a-bc82dd543e3f",
    "avatar_id": null,
    "avatar_url": null,
    "created_at": "2020-12-08T00:53:41.424Z",
    "updated_at": "2020-12-08T00:53:41.424Z"
  }
]
```

# Sessões

## MÉTODO POST | https://hurrybackend.herokuapp.com/sessions |
#### Rota realizar logon na aplicação
***ROTA NÃO AUTENTICADA***

### body

```json
{
	"email" : "example@example.com",
	"password": "password"
}
```

Retorno esperado, exemplo: 
  
```json
{
  "user": {
    "id": "bc7c8ff3-c1b0-46fe-8e3d-937ddee74c0a",
    "name": "nome",
    "email": "example@example.com",
    "love": false,
    "state": "SP",
    "city": "São Paulo",
    "birthday": "11111-01-01",
    "cpf": "12345678910",
    "cellphone": "11912345678",
    "musicInterest1_id": "3f5eefa3-cdfe-4831-a920-e9f6dd2b57eb",
    "musicInterest2_id": "41205dfe-9b70-40f0-94f2-a410849701c0",
    "musicInterest3_id": "a0693e61-d569-4a73-b13a-bc82dd543e3f",
    "avatar_id": null,
    "avatar_url": null,
    "created_at": "2020-12-08T00:53:41.424Z",
    "updated_at": "2020-12-08T00:53:41.424Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDczODkwOTQsImV4cCI6MTYwNzM5NjI5NCwic3ViIjoiYmM3YzhmZjMtYzFiMC00NmZlLThlM2QtOTM3ZGRlZTc0YzBhIn0.m1vdhPCJ-KRP9tWKHjt4ANVUkyO5rOzXSfZhIEp4Kz0"
}
```

