import { clienteService } from '../service/cliente-service.js';

const tabela = document.querySelector('[data-tabela]');

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
    linhaNovoCliente.dataset.id = id; //cria um data attributes chamado data-id
    console.log(linhaNovoCliente)

    return linhaNovoCliente;
}

tabela.addEventListener('click', async (evento) => {

    let ehBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir'

    if(ehBotaoDeletar){
        try {
            const linhaCliente = evento.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            await clienteService.removeCliente(id)
            linhaCliente.remove()
        }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }
})

const render = async() => { 
    try {
        const clientes = await clienteService.listaClientes()
        clientes.forEach(cliente => {
            tabela.appendChild(criaNovaLinha(cliente.nome, cliente.email, cliente.id))
        })
    }
    catch(erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

}
render()



