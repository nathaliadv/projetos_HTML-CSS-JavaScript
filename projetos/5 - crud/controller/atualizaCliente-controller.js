import { clienteService } from '../service/cliente-service.js';

//Função autoexecutável. Quando ela carregar no html, ela já irá autoexecutar
( async() => {
    const pegaURL = new URL(window.location);
    console.log(pegaURL);

    const id = pegaURL.searchParams.get('id');
    console.log(id)

    const inputNome = document.querySelector('[data-nome]')
    const inputEmail = document.querySelector('[data-email]')

    try {
        const cliente = await clienteService.detalhaCliente(id)
        inputNome.value = cliente.nome
        inputEmail.value = cliente.email
    }
    catch(erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

    /*
    clienteService.detalhaCliente(id)
    .then( cliente => {
        inputNome.value = cliente.nome
        inputEmail.value = cliente.email
    }) */

    const form = document.querySelector('[data-form]')

    form.addEventListener('submit', async(evento) => {
        evento.preventDefault()

        try{
            await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value)
            window.location.href = "../telas/edicao_concluida.html"    
        }
        catch(erro) {
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }

    })
})()