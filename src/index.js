const app = require('./up-server');

/*
A cada requisição solicitada pelo usuário o terminal apresenta a hora atual.
*/
app.all("*", (req, res, next) => {
    console.log('Nova requisição...\nTime:', Date.now());
    next();
});

const routesAccount = require('./routes/account-routes');
const routesTransaction = require('./routes/transaction-routes');
const routesQueriesAccounts = require('./routes/queries-accounts-routes');

app.use(routesAccount);
app.use(routesTransaction);
app.use(routesQueriesAccounts);
