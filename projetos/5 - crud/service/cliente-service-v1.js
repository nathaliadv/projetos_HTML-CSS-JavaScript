const listaClientes = () => {
    const promise = new Promise((resolve, reject) => {
        //Precisamos de alguns métodos para fazer a comunicação com a API. E quem fornecerá esses métodos
        //é o objeto XMLHttpRequest
        const http = new XMLHttpRequest();

        //Para abrir a comunicação entre minha aplicação e a API
        //Dois parâmetros serão passados: o que vou pedir para o servidor e o endereço para onde será enviada
        //a requisição
        http.open('GET', 'http://localhost:3000/profile');

        //O que fará após a resposta da requisição ser enviada.
        //Ao carregar será executada essa função. O onload recebe uma função auxiliar que será disparada
        //logo após uma requisição assincrona - Essa função é chamada de Callback.
        http.onload= () => {
            //Fazer uma verificação para saber se deu tudo ok com a chamada.
            if(http.status >= 400) {
                reject(JSON.parse(http.response)) // //retorna como texto. Precisa transformar em objeto JS
            } else {
                resolve(JSON.parse(http.response))
            }
        }

        //Enviar a requisição
        http.send();
    })
    console.log(promise);
    return promise;
}

listaClientes()
.then(data => {
    console.log(data);
    data.forEach(cliente => {
        tabela.appendChild(criaNovaLinha(cliente.nome, cliente.email, cliente.id))
    })
})

const criaNovaLinha = (nome, email, id) => {

    const linhaNovoCliente = document.createElement('tr');
    const conteudo =
    `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>
    `

    linhaNovoCliente.innerHTML = conteudo;
    return linhaNovoCliente;
}

const tabela = document.querySelector('[data-tabela]');
