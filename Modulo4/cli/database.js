const {readFile, writeFile} = require('fs')

const {promisify} = require('util')

// para não precisar mais trabalhar com callback transforma em promise usamos o async await para manipular as coisas
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// outra forma de obter dados do json
// const dadosJson = require('./herois.json')

class Database{
    //objetos
    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo(){
        // obter toddos os dados no formato de utf8
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8') 
        // retorna o arquivo como JSON fazendo o parse do objeto
        return JSON.parse(arquivo.toString())       
    }
    async escreverArquivo(dados){
        // escrever dados no banco de dados 
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        // caso der certo retorna verdadeiro
        return true
    }

    async cadastrar(heroi) {
        // obtem os dados como uma lista
        const dados = await this.obterDadosArquivo()
        // cria um id e se heroi for menos que 2 se não existir cria um heroi baseado na hora -> simular que a gente esta criando um id 
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        /*
        {
            nome: Flash,
            poder: Velocidade
        }
        {
            id: 1212112
        }
        {
            nome: Flash,
            poder: Velocidade,
            id: 1212112
        }
        */
        const heroidComId = {
            id,
            ...heroi
        }
        const dadosFinal = [
            ...dados,
            heroidComId
        ]

    //    [
    //        {
    //            nome: Flash
    //        }
    //    ]
    //    {
    //        nome: Batman
    //    }
    //    [
    //        {
    //            nome: Flash
    //        },
    //        {
    //            nome: Batman
    //        }
    //    ]
        // cadastra o heroi
        const resultado = await this.escreverArquivo(dadosFinal)
        // retorna o resultado
        return resultado
    }


    async listar(id){
        // obter o arquivo inteiro
        const dados = await this.obterDadosArquivo()
        // faz um filtro nos item buscando o id que a gente passar se não passar id manda a lista inteira 
        const dadosFiltrados = dados.filter(item => (id ? (item.id  === id) : true))
        // retorna o dado
        return dadosFiltrados
    }
    async remover(id) {
        // se nao mandou nenhum id remove todos os itens da base de dados 
        if(!id){
            return await this.escreverArquivo([])
        }
        // obter os dados do banco de dedos 
        const dados = await this.obterDadosArquivo()
        // procurar um item dentro da lista JSON. findIndex  -> consigo passar uma funcao para retornar um boolean se existir 
        const indice = dados.findIndex(item=> item.id === parseInt(id))
        // se não tiver nenhum item no JSON retorna erro
        if(indice === -1){
            throw Error('O usuario informado não existe')
        }
        // pegar o indice da lista e remove 1 unico item 
        dados.splice(indice, 1)

        // registra de novo na base de dados
        return await this.escreverArquivo(dados)
    }
    async atualizar(id, modificacoes) {
        //obter os dados 
        const dados = await this.obterDadosArquivo()
        // comparar se o id que ele passou é valido
        const indice = dados.findIndex(item=> item.id == parseInt(id))
        
        // se o indice não existir
        if(indice === -1) {
            throw Error('O heroi informado não existe')
        }

        const atual = dados[indice]
        // faz o merge dos dois objetos
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        // remove o objeto anterior da lista 
        dados.splice(indice, 1)

        // escreve de novo com o objeto atualizado 
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])

    }
}

// exporta a instancia para não precisar ficar instanciando quando precisar usar para obter os objetos
module.exports = new Database()