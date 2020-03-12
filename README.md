# hackathon-stefanini

```
{
  bairros{
    nome
  }
}
```
```
mutation {
  addBairro(nome: "Teste Thiago", cidadeid: 1, flativo: "S"){
    id,
    nome
  }
}
```