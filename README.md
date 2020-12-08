# Hurry Backend
## A backend for The Hurry Project


# Usuários

## MÉTODO POST | https://hurrybackend.herokuapp.com/users/interests |
#### Eventos baseado no gosto musical do usuário
***Usuário baseado no gosto musical do usuário logado.***

Retorno esperado

Exemplo: 
  
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
