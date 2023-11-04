const db = require('../../storage/database');
//const { isBefore } = require('date-fns');
let contas = db.contas;
let depositos = db.depositos;
let saques = db.saques;
let transferencias = db.transferencias;

const depositarValor = (req, res) => {
    const { numero_conta, valor } = req.body;
	
    let valorInformado = Number(valor);
	
	if(!(numero_conta && valor)) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatório!' });
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

    if(valorInformado <= 0) {
        return res.status(400).json({ mensagem: 'O valor tem que ser maior que zero' });
    }

    /*
	const dataFormatada = format(data, 'yyy-mm-dd');

    if(isBefore(data), new Date()) {
        return res.status(400).json({ mensagem: 'A data não pode ser anterior a data vigente!' });
    }
	*/
	/*não precisa realizar a verificação, pois a data é coletada do sistema. Em caso da hora está errada
	no prórpio sistema, impactará na biblioteca e no acesso da internet, logo foge do escopo a princípio*/

    conta.saldo = Number(conta.saldo) + valorInformado;

    const data = new Date().toLocaleString();
	
    const deposito = {
        data,
        numero_conta,
        valor: valorInformado
	}

    depositos.push(deposito);

    //console.log(depositos);
    
    return res.status(204).json({});
}

const sacarValor = (req, res) => {
	const { numero_conta, valor, senha } = req.body;
	
    let valorInformado = Number(valor);
	
	if(!(numero_conta && valor && senha)) {
        return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatório!' });
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
	
	//console.log(conta.usuario[0].senha === senha, ` -> ${conta.usuario[0].senha} e ${senha}`);
	
	if(!senha) {
	    return res.status(400).json({ mensagem: 'A senha informada é inválida!'}); //se a conta não for encontrada
    }
	
	if(conta.usuario[0].senha != senha) {
	    return res.status(400).json({ mensagem: 'A senha informada para a conta bancária está errada!'}); //se a conta não for encontrada
    }

    if(valorInformado < 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }
	
	if(conta.saldo < valor) {
	    return res.status(400).json({ mensagem: 'Saldo insuficiente para realizar o saque solicitado!'}); //se a conta não for encontrada
    }
	
	conta.saldo -= valorInformado;

    const data = new Date().toLocaleString();
	
    const saque = {
        data,
        numero_conta,
        valor: valorInformado
	}

    saques.push(saque);

    //console.log(saques);
    
    return res.status(204).json({});
}

const transferirValor = (req, res) => {
const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
	
    let valorInformado = Number(valor);
	
	if(!(numero_conta_origem && numero_conta_destino && valor && senha)) {
        return res.status(400).json({ mensagem: 'Os números das contas, o valor e a senha são obrigatório!' });
    }

    if(isNaN(Number(numero_conta_origem))) {
        return res.status(400).json({ mensagem: 'Número da conta de origem é inválido!' });
    }
	
    if(isNaN(Number(numero_conta_destino))) {
        return res.status(400).json({ mensagem: 'Número da conta de destino é inválido!' });
    }

    const contaOrigem = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta_origem);
    });
	
	if(!contaOrigem) {
        return res.status(404).json({ mensagem: 'Conta bancária de origem não encontrada!'}); //se a conta não for encontrada
    }
	
    const contaDestino = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta_destino);
    });

    if(!contaDestino) {
        return res.status(404).json({ mensagem: 'Conta bancária de destino não encontrada!'}); //se a conta não for encontrada
    }
	
	if(!senha) {
	    return res.status(400).json({ mensagem: 'A senha informada é inválida!'}); //se a conta não for encontrada
    }
	
	if(contaOrigem.usuario[0].senha != senha) {
	    return res.status(400).json({ mensagem: 'A senha informada para a conta bancária está errada!'}); //se a conta não for encontrada
    }

    if(valorInformado <= 0) {
        return res.status(400).json({ mensagem: 'O valor tem que ser maior que zero!' });
    }
	
	if(contaOrigem.saldo < valor) {
	    return res.status(400).json({ mensagem: 'Saldo insuficiente!'}); //se a conta não for encontrada
    }
	
	contaOrigem.saldo -= valorInformado;
	contaDestino.saldo += valorInformado;

    const data = new Date().toLocaleString();
	
    const transferencia = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor: valorInformado
	}

    transferencias.push(transferencia);

    //console.log(transferencias);
    
    return res.status(204).json({});
}

module.exports = {
    depositarValor,
    sacarValor,
    transferirValor
}