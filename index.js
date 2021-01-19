/*
  0 obter um usuário
  1 Obter o numero de telefone de um usuário a partir de seu Id
  2 Obter o endereço do usuário pelo Id
*/
// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // quando der algum problema -> Reject(ERRO)
  // quando success -> RESOLV
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(function () {
      // return reject(new Error("DEU RUIM DE VERDADE"))

      return resolve({
        id: 1,
        nome: "Paulo Sarmento",
        dataNascimento: new Date()
  
      })
    }, 1000)

  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(() => {
      return resolve({
        telefone: "123456",
        ddd: 35
      })
    }, 2000)  

  })
}
function obterEndereco(idUsuario, callback) {
  setTimeout(()=>{
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    })
  }, 2000)
  
}

const usuarioPromise = obterUsuario()
//para manipular o sucesso usamos a função .then
//para manipular erros, usamos o .catch
// usuario -> Telefone -> telefone

usuarioPromise
  .then(function(usuario){
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result){
        return{
          usuario: {
            nome: usuario.nome,
            id: usuario.id
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result){
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado){
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `)
  })
  .catch(function(error){
    console.log("Deu ruim", error)
  })

// obterUsuario(function resolverUsuario(error, usuario){
//   // null || '' || 0 === false
//   if(error) {
//     console.error('DEU RUIM em USUARIO', error)
//     return
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//     if(error1) {
//       console.error('DEU RUIM em TELEFONE', error)
//       return
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//       if(error2) {
//         console.error('DEU RUIM em ENDERECO', error)
//         return
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereco: ${endereco.rua}, ${endereco.numero}
//         Telefone: (${telefone.ddd}), ${telefone.telefone}
//       `)
//     })
//   })
  
// })
