const {deepEqual, ok} = require ('assert')

// Objeto moledo 
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}
const database = require('./database')

describe('Suite de manipulação de Herois', () => {
    // antes de todo processo cadastra um heroi
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        // Objeto esperado
        const expected = DEFAULT_ITEM_CADASTRAR
        // pega o primeiro objeto do array pelo id do objeto esperado
        const [resultado] = await database.listar(expected.id)
        // faz o test 
        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        // Objeto esperado
        const expected = DEFAULT_ITEM_CADASTRAR
        // Cadastrar heroi na base de dados
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        // procura o heroi cadastrado e procura ele pelo id e verifica se ele foi cadastrado pegando o primeiro objeto do array
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        // faz o test
        deepEqual(actual, expected)
    })
    it('deve remover um heroi por id', async () => {
        //caso der certo retorna verdadeiro
        const expected = true
        // remover o heroi
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)

    })
})