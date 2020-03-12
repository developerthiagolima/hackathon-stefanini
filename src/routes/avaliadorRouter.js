import { default as controller } from '../controller/avaliadorController'

export default {
    load(app, mysql) {
        app.get('/avaliador', async (req, res, done) => {
            controller.listarAvaliador(app, req, res, done, mysql);
        })
        app.post('/avaliador', async (req, res, done) => {
            controller.salvarAvaliador(app, req, res, done, mysql);
        })
        app.put('/avaliador', async (req, res, done) => {
            controller.atualizarAvaliador(app, req, res, done, mysql);
        })
        app.delete('/avaliador', async (req, res, done) => {
            controller.deletarAvaliador(app, req, res, done, mysql);
        })
    }
}