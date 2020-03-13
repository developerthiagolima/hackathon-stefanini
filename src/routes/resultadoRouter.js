import { default as controller } from '../controller/resultadoController'

export default {
    load(app, mysql) {
        app.get('/resultadoPorGupo', async (req, res, done) => {
            res.json(
                await controller.resultadoPorGupo(app, req, res, done, mysql)
            )
        })
        app.get('/resultadoPorTipoGupo', async (req, res, done) => {
            res.json(
                await controller.resultadoPorTipoGupo(app, req, res, done, mysql)
            )
        })
        app.get('/resultadoPorCandidato', async (req, res, done) => {
            res.json(
                await controller.resultadoPorCandidato(app, req, res, done, mysql)
            )
        })
    }
}