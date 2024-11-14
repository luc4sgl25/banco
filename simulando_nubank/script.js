class Conta {
    constructor(numero, nome, saldoInicial) {
        this.numero = numero;
        this.nome = nome;
        this.saldo = saldoInicial;
    }
}

class Banco {
    constructor() {
        this.numeroConta = 1000;
        this.contas = [];
    }

    gerarNumeroConta() {
        this.numeroConta += 1;
        return this.numeroConta;
    }

    criarConta(nome, saldoInicial = 0) {
        const novoNumeroConta = this.gerarNumeroConta();
        const novaConta = new Conta(novoNumeroConta, nome, saldoInicial);
        this.contas.push(novaConta);
        return novaConta;
    }

    depositar(numeroConta, valor) {
        const conta = this.contas.find(c => c.numero === numeroConta);
        if (!conta) {
            alert("Conta não encontrada");
            return;
        }
        if (typeof valor !== 'number' || valor <= 0) {
            alert("Valor inválido");
            return;
        }
        conta.saldo += valor;
        alert(`Depósito realizado! Saldo atual: R$ ${conta.saldo.toFixed(2)}`);
        this.atualizarSaldoConta(conta.saldo);
    }

    sacar(numeroConta, valor) {
        const conta = this.contas.find(c => c.numero === numeroConta);
        if (!conta) {
            alert("Conta não localizada");
            return;
        }
        if (valor > conta.saldo) {
            alert("Saldo insuficiente");
            return;
        }
        conta.saldo -= valor;
        alert(`Saque realizado! Saldo atual: R$ ${conta.saldo.toFixed(2)}`);
        this.atualizarSaldoConta(conta.saldo);
    }

    transferir(numeroContaOrigem, numeroContaDestino, valor) {
        const contaOrigem = this.contas.find(c => c.numero === numeroContaOrigem);
        const contaDestino = this.contas.find(c => c.numero === numeroContaDestino);

        if (!contaOrigem || !contaDestino) {
            alert("Uma ou ambas as contas não foram encontradas");
            return;
        }

        if (valor > contaOrigem.saldo) {
            alert("Saldo insuficiente para transferência");
            return;
        }

        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
        alert(`Transferência realizada! Saldo da conta origem: R$ ${contaOrigem.saldo.toFixed(2)}, Saldo da conta destino: R$ ${contaDestino.saldo.toFixed(2)}`);
        this.atualizarSaldoConta(contaOrigem.saldo);
    }

    atualizarSaldoConta(saldo) {
        document.getElementById('valor-saldo').textContent = `R$ ${saldo.toFixed(2)}`;
    }

    listarContas() {
        return this.contas;
    }
}

const banco = new Banco();
let contaCorrente = null;


function atualizarDropdownContas() {
    const selectContas = document.getElementById('contas');
    selectContas.innerHTML = ''; 

    banco.listarContas().forEach(conta => {
        const option = document.createElement('option');
        option.value = conta.numero;
        option.textContent = `${conta.nome} - Conta: ${conta.numero}`;
        selectContas.appendChild(option);
    });

    selectContas.addEventListener('change', function() {
        const numeroContaSelecionada = parseInt(this.value);
        contaCorrente = banco.contas.find(c => c.numero === numeroContaSelecionada);
        banco.atualizarSaldoConta(contaCorrente.saldo);
    });
}

document.getElementById('botao-criar-conta').addEventListener('click', function() {
    const nomeTitular = prompt("Digite o nome do titular da nova conta:");
    if (nomeTitular) {
        const novaConta = banco.criarConta(nomeTitular);
        alert(`Conta criada com sucesso! Número da conta: ${novaConta.numero}`);
        atualizarDropdownContas(); 
    } else {
        alert("Nome do titular não pode ser vazio.");
    }
});

document.getElementById('botao-depositar').addEventListener('click', function() {
    if (!contaCorrente) {
        alert("Selecione uma conta primeiro!");
        return;
    }
    const valorDeposito = parseFloat(prompt("Digite o valor que quer depositar:"));
    if (valorDeposito && valorDeposito > 0) {
        banco.depositar(contaCorrente.numero, valorDeposito);
    } else {
        alert("Valor inválido.");
    }
});

document.getElementById('botao-transferir').addEventListener('click', function() {
    if (!contaCorrente) {
        alert("Selecione uma conta primeiro!");
        return;
    }
    const numeroContaDestino = parseInt(prompt("Digite o número da conta de destino:"));
    const valorTransferencia = parseFloat(prompt("Digite o valor que quer transferir:"));
    if (valorTransferencia && valorTransferencia > 0 && numeroContaDestino) {
        banco.transferir(contaCorrente.numero, numeroContaDestino, valorTransferencia);
    } else {
        alert("Valor ou número de conta inválidos.");
    }
});


let saldoVisivel = true;
document.getElementById('botao-olho').addEventListener('click', function() {
    saldoVisivel = !saldoVisivel;
    const saldoContaElement = document.getElementById('valor-saldo');
    if (saldoVisivel) {
        saldoContaElement.style.visibility = 'visible';
        this.src = '/img/olho-aberto.png'; 
    } else {
        saldoContaElement.style.visibility = 'hidden';
        this.src = '/img/olho.png';  
    }
});


atualizarDropdownContas(); 



document.getElementById('botao-pix').addEventListener('click', function() {
    const numeroContaDestino = parseInt(prompt("Digite o número da conta de destino para o Pix:"));
    const valorTransferencia = parseFloat(prompt("Digite o valor que deseja transferir:"));
    if (valorTransferencia && valorTransferencia > 0 && numeroContaDestino) {
        banco.transferir(contaCorrente.numero, numeroContaDestino, valorTransferencia);
    } else {
        alert("Valor ou número de conta inválidos.");
    }
});


document.getElementById('botao-emprestimo').addEventListener('click', function() {
    const valorEmprestimo = parseFloat(prompt("Digite o valor que deseja pegar emprestado:"));
    if (valorEmprestimo && valorEmprestimo > 0) {
        banco.depositar(contaCorrente.numero, valorEmprestimo); 
        alert(`Empréstimo realizado! Saldo atual: R$ ${contaCorrente.saldo.toFixed(2)}`);
    } else {
        alert("Valor inválido.");
    }
});


document.getElementById('botao-pagar').addEventListener('click', function() {
    const valorPagamento = parseFloat(prompt("Digite o valor que deseja pagar:"));
    if (valorPagamento && valorPagamento > 0) {
        banco.sacar(contaCorrente.numero, valorPagamento); 
    } else {
        alert("Valor inválido.");
    }
});



