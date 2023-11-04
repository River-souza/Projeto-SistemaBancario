const express = require('express');
const queriesAccounts = require('../controllers/queries-accounts');

const routes = express.Router();

//endpoints
routes.get('/contas/consulta/saldo/', queriesAccounts.saldo);
routes.get('/contas/consulta/extrato', queriesAccounts.extrato);

module.exports = routes;