const DAO = require('../dao/dao')

export default {
    async resultadoPorGupo(app, req, res, done, mysql) {
        const listaGrupos = (await mysql.createQuery({
            query: `SELECT 
                        g.id,
                        g.nome,
                        (SELECT tg.nome FROM tipo_grupo tg WHERE tg.id = g.tipo_id) as tipo_equipe
                    FROM grupo g`
        }));

        var listaRetorno = []
        for (let index = 0; index < listaGrupos.length; index++) {
            const grupo = listaGrupos[index];

            var notaComportamental = (await mysql.createQuery({
                query: `SELECT SUM(y.nota) as valor FROM (
                    SELECT (a.nota * p.peso) as nota
                     FROM avaliacao a
                     LEFT JOIN pergunta p on p.id = a.pergunta_id and p.tipo_id = 2
                    WHERE a.candidato_id in (SELECT c.id FROM candidato c WHERE c.grupo_id = ${grupo.id})
                ) y`
            })).shift();
            if (notaComportamental.valor == null) notaComportamental.valor = 0

            var notaTecnica = (await mysql.createQuery({
                query: `SELECT SUM(y.nota) as valor FROM (
                    SELECT (a.nota * p.peso) as nota
                     FROM avaliacao a
                     LEFT JOIN pergunta p on p.id = a.pergunta_id and p.tipo_id = 12
                    WHERE a.candidato_id in (SELECT c.id FROM candidato c WHERE c.grupo_id = ${grupo.id})
                ) y`
            })).shift();
            if (notaTecnica.valor == null) notaTecnica.valor = 0

            const listaCand = (await mysql.createQuery({
                query: `SELECT  
                            c.id,
                            c.nome
                        FROM candidato c
                       WHERE c.grupo_id = ${grupo.id};`
            }));

            listaRetorno.push({
                ...grupo,
                candidatos: listaCand,
                notaComportamental: notaComportamental.valor,
                notaTecnica: notaTecnica.valor,
                somatoria: notaComportamental.valor + notaTecnica.valor
            });
        }

        listaRetorno.sort((a, b) => a.somatoria < b.somatoria)

        return listaRetorno
    },
    async resultadoPorTipoGupo(app, req, res, done, mysql) {
        const listaTipoGrupos = (await mysql.createQuery({
            query: `SELECT 
                        tg.id,
                        tg.nome 
                     FROM tipo_grupo tg`
        }));

        var listaRetorno = []
        for (let index = 0; index < listaTipoGrupos.length; index++) {
            const tipoGrupo = listaTipoGrupos[index];

            const listaGrupos = (await mysql.createQuery({
                query: `SELECT 
                            g.id,
                            g.nome
                        FROM grupo g
                       WHERE g.tipo_id = ${tipoGrupo.id}`
            }));

            var objRetorno = []

            for (let index2 = 0; index2 < listaGrupos.length; index2++) {
                const grupo = listaGrupos[index2];

                var notaComportamental = (await mysql.createQuery({
                    query: `SELECT SUM(y.nota) as valor FROM (
                        SELECT (a.nota * p.peso) as nota
                         FROM avaliacao a
                         LEFT JOIN pergunta p on p.id = a.pergunta_id and p.tipo_id = 2
                        WHERE a.candidato_id in (SELECT c.id FROM candidato c WHERE c.grupo_id = ${grupo.id})
                    ) y`
                })).shift();
                if (notaComportamental.valor == null) notaComportamental.valor = 0
    
                var notaTecnica = (await mysql.createQuery({
                    query: `SELECT SUM(y.nota) as valor FROM (
                        SELECT (a.nota * p.peso) as nota
                         FROM avaliacao a
                         LEFT JOIN pergunta p on p.id = a.pergunta_id and p.tipo_id = 12
                        WHERE a.candidato_id in (SELECT c.id FROM candidato c WHERE c.grupo_id = ${grupo.id})
                    ) y`
                })).shift();
                if (notaTecnica.valor == null) notaTecnica.valor = 0
    
                const listaCand = (await mysql.createQuery({
                    query: `SELECT  
                                c.id,
                                c.nome
                            FROM candidato c
                           WHERE c.grupo_id = ${grupo.id};`
                }));
    
                objRetorno.push({
                    ...grupo,
                    candidatos: listaCand,
                    notaComportamental: notaComportamental.valor,
                    notaTecnica: notaTecnica.valor,
                    somatoria: notaComportamental.valor + notaTecnica.valor
                });
            }

            objRetorno.sort((a, b) => a.somatoria < b.somatoria)

            listaRetorno.push({
                tipoGrupo, 
                grupos: objRetorno
            })
        }

        return listaRetorno
    },
    async resultadoPorCandidato(app, req, res, done, mysql) {
        const listaCand = (await mysql.createQuery({
            query: `SELECT  
                        c.id,
                        c.nome,
                        (SELECT g.nome FROM grupo g WHERE g.id = c.grupo_id) as equipe,
                        (SELECT tg.nome FROM tipo_grupo tg WHERE tg.id = (SELECT g.tipo_id FROM grupo g WHERE g.id = c.grupo_id)) as tipo_equipe
                    FROM candidato c;`
        }));

        var listaRetorno = []
        for (let index = 0; index < listaCand.length; index++) {
            const cand = listaCand[index];
            var notaComportamental = (await mysql.createQuery({
                query: `SELECT SUM(y.nota) as valor FROM (
                    SELECT (a.nota * p.peso) as nota
                     FROM avaliacao a
                     LEFT JOIN pergunta p on p.id = a.pergunta_id and p.tipo_id = 2
                    WHERE a.candidato_id = ${cand.id}
                ) y`
            })).shift();
            if (notaComportamental.valor == null) notaComportamental.valor = 0

            var notaTecnica = (await mysql.createQuery({
                query: `SELECT SUM(y.nota) as valor FROM (
                    SELECT (a.nota * p.peso) as nota
                     FROM avaliacao a
                     LEFT JOIN pergunta p on p.id = a.pergunta_id and p.tipo_id = 12
                    WHERE a.candidato_id = ${cand.id}
                ) y`
            })).shift();
            if (notaTecnica.valor == null) notaTecnica.valor = 0

            listaRetorno.push({
                ...cand,
                notaComportamental: notaComportamental.valor,
                notaTecnica: notaTecnica.valor,
                somatoria: notaComportamental.valor + notaTecnica.valor
            });
        }

        listaRetorno.sort((a, b) => a.somatoria < b.somatoria)

        return listaRetorno
    },
}