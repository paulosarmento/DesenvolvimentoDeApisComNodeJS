/*
  0 obter um usuário
  1 Obter o numero de telefone de um usuário a partir de seu Id
  2 Obter o endereço do usuário pelo Id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: "Paulo Sarmento",
      dataNascimento: new Date()

    })
  }, 1000)

}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "123456",
      ddd: 35
    })
  }, 2000)  
}
function obterEndereco(idUsuario, callback) {
  setTimeout(()=>{
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    })
  }, 2000)
  
}
function resolverUsuario(erro, usuario) {
  console.log('usuario', usuario)
  
}

obterUsuario(function resolverUsuario(error, usuario){
  // null || '' || 0 === false
  if(error) {
    console.error('DEU RUIM em USUARIO', error)
    return
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
    if(error1) {
      console.error('DEU RUIM em TELEFONE', error)
      return
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
      if(error2) {
        console.error('DEU RUIM em ENDERECO', error)
        return
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereco: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}), ${telefone.telefone}
      `)
    })
  })
  
})



// const usuario = obterTelefone()

// console.log('usuario', usuario)