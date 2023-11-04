const express = require('express');
const transacoes = require('../controllers/transactions');

const routes = express.Router();

//endpoints
routes.post('/transacoes/depositar', transacoes.depositarValor);
routes.post('/transacoes/sacar', transacoes.sacarValor);
routes.post('/transacoes/transferir', transacoes.transferirValor);

module.exports = routes;