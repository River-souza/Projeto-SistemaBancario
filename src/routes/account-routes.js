const express = require('express');
const contas = require('../controllers/accounts');
const middleware = require('../middlewares/accounts-middleware');

const routes = express.Router();

routes.get('/contas', middleware.bankAuthentication, contas.listarContas);//Exige autenticação no banco
routes.get('/contas/:numero_conta', middleware.validatorNumConta, contas.obterConta);
routes.post('/contas', contas.criarConta);
routes.put('/contas/:numero_conta/usuario', middleware.validatorNumConta, contas.atualizarConta);
routes.delete('/contas/:numero_conta', middleware.validatorNumConta, contas.excluirConta);

module.exports = routes;