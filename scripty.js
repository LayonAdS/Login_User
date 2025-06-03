'use strict';

// Verifica se é número
const eNumero = (numero) => /^[0-9]+$/.test(numero);

// Verifica se o CEP é válido
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

// Preenche os campos do formulário com os dados da API
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade_endereco').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

// Limpa os campos do formulário
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade_endereco').value = '';
    document.getElementById('estado').value = '';
};

// Consulta o CEP na API ViaCEP
const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        try {
            const response = await fetch(url);
            const endereco = await response.json();

            if (endereco.erro) {
                alert("CEEP não encontrado.");
            } else {
                preencherFormulario(endereco);
            }
        } catch (error) {
            alert("Erro ao buscar o CEP.");
            console.error(error);
        }
    } else {
        alert("CEEP inválido. Digite um CEP com 8 números.");
    }
};

// Adiciona o evento ao sair do campo CEP
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cep').addEventListener('focusout', pesquisarCep);
});
