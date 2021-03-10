const botaoBuscarCep = document.querySelector('#btnPesquisar')

botaoBuscarCep.addEventListener('click', event => {
    event.preventDefault()

    const inputCep = document.querySelector('#cep')
    const valorCep = inputCep.value.replace("-", "")
    const url = `https://viacep.com.br/ws/${valorCep}/json/`;

    fetch(url).then(response => {
        return response.json()
    }).then(data => {
        if (data.error){
            alert("O CEP DIGITADO ESTÁ INVÁLIDO");
            return ;
        }
        preencherCampos(data)
    })

})

function preencherCampos(data) {
    const rua = document.querySelector("#rua");
    const bairro = document.querySelector("#bairro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");

    rua.value = data.logradouro;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}