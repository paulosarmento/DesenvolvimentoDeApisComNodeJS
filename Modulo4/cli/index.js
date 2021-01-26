const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "Id do Herói")

        .option('-c, --cadastrar ', "Cadastrar um Herói")
        .option('-l, --listar ', "Listar um Herói")
        .option('-r, --remover', "Remove um Herói pelo id")
        .option('-a, --atualizar [value]', "Atualiza um Herói pelo id")
        .parse(process.argv)

    const options = Commander.opts()
    const heroi = new Heroi(options)

    try {
        if(options.cadastrar){
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado com sucesso!')
        }
        if(options.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(options.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Não foi possível remover o herói')
                return;
            }
            console.log("Herói removido com sucesso!")
        }
        if(options.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            // remover todas as chaves que estiverem com undefined |null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado){
                console.error('Não foi possível atualizar o heroi')
                return;
            }
            console.log('Heroi Atualizado com sucesso!')
        }
    } catch (error) {
        console.error('Deu Ruim', error)
    }
}
main()