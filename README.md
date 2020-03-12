# hackathon-stefanini

https://hackathon-stefanini.herokuapp.com/

```
{
  listarAvaliacao{
    candidato{
      nome
      grupo{
        nome
      }
    }
    avaliador{
      nome
    }
    pergunta{
      nome
      tipo{
        nome
      }
    }
    nota
  }
}
```
```
mutation{
  criarAvaliacao(data:{
    candidato_id: 2
    avaliador_id: 2
    pergunta_id: 2
    nota: 5
  })
  {
    id
  }
}
```
