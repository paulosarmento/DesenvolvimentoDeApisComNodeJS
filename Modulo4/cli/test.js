const {ok, deepStrictEqual} = require ('assert')

// Objeto moledo 
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}
const database = require('./database')

describe('Suite de manipulação de Herois', () => {
    // antes de todo processo cadastra um heroi
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    // after(async () => {
    //     await database.remover()
    // })
    

    it('deve pesquisar um heroi usando arquivos', async () => {
        // Objeto esperado
        const expected = DEFAULT_ITEM_CADASTRAR
        // pega o primeiro objeto do array pelo id do objeto esperado
        const [resultado] = await database.listar(expected.id)
        // faz o test 
        deepStrictEqual(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        // Objeto esperado
        const expected = DEFAULT_ITEM_CADASTRAR
        // Cadastrar heroi na base de dados
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        // procura o heroi cadastrado e procura ele pelo id e verifica se ele foi cadastrado pegando o primeiro objeto do array
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        // faz o test
        deepStrictEqual(actual, expected)
    })
    it('deve remover um heroi por id', async () => {
        //caso der certo retorna verdadeiro
        const expected = true
        // remover o heroi
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        // faz o test 
        deepStrictEqual(resultado, expected)

    })
    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        // não posso atualizar o id
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepStrictEqual(resultado, expected)
    })
})