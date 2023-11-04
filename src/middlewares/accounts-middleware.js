
const db = require('../../storage/database');

const validatorNumConta = (req, res, next) => {

    const {numero_conta} = req.params;

    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }

    next();
};

const accountAuthentication = function(req, res, next) {

}

const bankAuthentication = function(req, res, next) {

    const banco = db.banco;

    const { senha_banco } = req.query;

    if(!senha_banco) {
        return res.status(404).json({ mensagem: 'A senha do banco informada é inválida!'});
    }

    if(!(banco.senha === senha_banco)) {
        return res.status(404).json({ mensagem: 'A senha do banco informada é inválida!'});
    }

    next();
}

module.exports = {
    validatorNumConta,
    bankAuthentication
}