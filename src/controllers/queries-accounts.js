const db = require('../../storage/database');
let contas = db.contas;
let depositos = db.depositos;
let saques = db.saques;
let transferencias = db.transferencias;

const saldo = (req, res) => {
	const { numero_conta, senha } = req.query;
	
    if(!(numero_conta && senha)) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatório!' });
    }

    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }

    const conta = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta);
    });

    if(!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!'}); //se a conta não for encontrada
    }
	
	if(!senha) {
	    return res.status(400).json({ mensagem: 'A senha informada é inválida!'}); //se a conta não for encontrada
    }
	
	if(conta.usuario[0].senha != senha) {
	    return res.status(400).json({ mensagem: 'A senha informada para a conta bancária está errada!'}); //se a conta não for encontrada
    }
	
    return res.status(200).json(conta.saldo);
}

const extrato = (req, res) => {
	const { numero_conta, senha } = req.query;
	
    if(!(numero_conta && senha)) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatório!' });
    }

    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }

    const conta = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta);
    });

    if(!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!'}); //se a conta não for encontrada
    }
	
	if(!senha) {
	    return res.status(400).json({ mensagem: 'A senha informada é inválida!'}); //se a conta não for encontrada
    }
	
	if(conta.usuario[0].senha != senha) {
	    return res.status(400).json({ mensagem: 'A senha informada para a conta bancária está errada!'}); //se a conta não for encontrada
    }
	
	
	//filter retorna todas as ocorrências de depositos satisfeira pelo teste
	const depTodos = depositos.filter((d) => {
        return d.numero_conta === numero_conta;
    });
	const saqTodos = saques.filter((s) => {
        return s.numero_conta === numero_conta;
    });
	const transfEnvTodos = transferencias.filter((t) => {
        return t.numero_conta_origem === numero_conta;
    });
	const transfRecTodos = transferencias.filter((t) => {
        return t.numero_conta_destino === numero_conta;
    });

    const extratoConta = {
        depositos: depTodos,
        saques: saqTodos,
        transferenciasEnviadas: transfEnvTodos,
        transferenciasRecebidas: transfRecTodos,
    };

	return res.status(200).json(extratoConta);
}

module.exports = {
    saldo,
    extrato
}
