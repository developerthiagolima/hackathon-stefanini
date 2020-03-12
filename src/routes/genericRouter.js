import { default as controller } from '../controller/genericController'

export default {
    load(app, mysql, route_name) {
        app.get('/'+route_name, async (req, res, done) => {
            res.json(
                await controller.listar(app, req, res, done, mysql, route_name)
            )
        })
        app.post('/'+route_name, async (req, res, done) => {
            res.json(
                await controller.salvar(app, req, res, done, mysql, route_name)
            )
        })
        app.put('/'+route_name, async (req, res, done) => {
            res.json(
                await controller.atualizar(app, req, res, done, mysql, route_name)
            )
        })
        app.delete('/'+route_name, async (req, res, done) => {
            res.json(
                await controller.deletar(app, req, res, done, mysql, route_name)
            )
        })
    }
}