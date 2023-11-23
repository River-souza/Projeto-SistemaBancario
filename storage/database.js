let bancodedados = {
	accountant: 6,
    banco: {
        nome: "bank098",
        numero: "123",
        agencia: "0004",
        senha: "B@nk8@91K"
    },
    contas: [
        {
            numero_conta: 1,
            usuario: [
                {
                    id: 1,
                    nome: "Vanessa alves",
                    cpf: "100.087.607-00",
                    data_nascimento: "1990-01-21",
                    telefone: "(80) 01040-1901",
                    email: "vanessa-alves.23@bankmail.com",
                    senha: "mhjVaness@"
                  },
				  {
                    id: 2,
                    nome: "Vanessa alves (dispositivo 1)",
                    cpf: "100.087.607-00",
                    data_nascimento: "1990-01-21",
                    telefone: "(80) 01040-1901",
                    email: "vanessa-alves.23@bankmail.com",
                    senha: "mhjVaness@"
                  }
                  
            ],
            saldo: 0
        },
        {
            numero_conta: 2,
            usuario: [
                {
                    id: 1,
                    nome: "Iara Santos",
                    cpf: "456.324.121-00",
                    data_nascimento: "2001-03-10",
                    telefone: "(80) 01021-5660",
                    email: "iara_luz.2019@bankmail.com",
                    senha: "NmjT%4@@q2"
                  }
            ],
            saldo: 23000
        },
        {
            numero_conta: 4,
            usuario: [
                {
                    id: 1,
                    nome: "Rita lucas",
                    cpf: "007.987.607-00",
                    data_nascimento: "1996-11-08",
                    telefone: "(80) 01040-3419",
                    email: "lucas-rita_osld@bankmail.com",
                    senha: "kgjhhtyEsd@"
                  }
            ],
            saldo: 0
        },
        {
            numero_conta: 5,
            usuario: [
                {
                    id: 1,
                    nome: "Marcelo lucas",
                    cpf: "990.872.923-43",
                    data_nascimento: "2010-01-14",
                    telefone: "(87) 98801-3032",
                    email: "marcelo.90932123@yahoo.com",
                    senha: "drfTg@1f"
                  }
            ],
            saldo: 0
        }  
    ],
    saques: [

    ],
    depositos: [

    ],
    transferencias: [

    ]
}

module.exports = bancodedados;