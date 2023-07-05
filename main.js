const btnPesquisarCEP = document.querySelector("#btnPesquisar");
const inputCep = document.querySelector("#cep");

const erro = document.querySelector(".erro");

inputCep.addEventListener("input", (e) => {
    inputCep.value = e.target.value.replace(/[^0-9.]/g, '').
        replace(/(\..*?)\..*/g, '$1');
});

btnPesquisarCEP.addEventListener("click", event => {
    event.preventDefault();
    const valorCEP = inputCep.value;
    
    if (valorCEP.length == 0) {
        inputCep.style.border = "2px solid rgb(216, 88, 88)";
        erro.innerText = "Campo obrigatório";
        return false;
    }

    //Consumindo a API do  ViaCep
    const url = `https://viacep.com.br/ws/${valorCEP}/json/`;

    fetch(url);

    fetch(url).then(response => {
        return response.json();

    }).then(data => {
        atribuitCampos(data);
    }).catch(erro => {
        alert("CEP inválido");
    });

}

);


function atribuitCampos(data) {
    const rua = document.querySelector("#rua");
    const complemento = document.querySelector("#complemento");
    const bairro = document.querySelector("#bairro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");

    if (data.logradouro === undefined) {
        alert("CEP inválido");
        return;
    }

    rua.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;

}

function limparCampoCEP() {
    inputCep.style.border = "none";
    erro.innerText = "";
}