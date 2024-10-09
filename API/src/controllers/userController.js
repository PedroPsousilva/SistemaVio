const connect = require("../db/connect");

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;

    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(cpf) || cpf.length !== 11) {
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else {
      // construção da query INSERT
      const query = `INSERT INTO usuario(cpf , email , password , name) VALUES('${cpf}','${email}', ${password},'${name}' )`;
      //Executando a query criada
      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O Email ja esta vinculado a outro usuario" });
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno no servidor" });
            }
         } else {
            return res
              .status(201)
              .json({ message: "Usuario criado com sucesso" });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }
  static async getAllUsers(req, res) {
    return res.status(200).json({ message: "Obtendo todos os usuários" });
  }

  static async updateUser(req, res) {
    //Desestrutura e recupera os dados enviados via corpo da requisição
    const { cpf, email, password, name } = req.body;
    //Validar se todos os campos foram preenchidos
    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    //Procura o indice do user no Array 'users' pelo cpf
    const userIndex = users.findIndex((user) => user.cpf === cpf);

    //Se o usuario não for encontrado userIndex equivale a -1
    if (userIndex == -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    //Atualiza os dados do usuarios no Array "users"
    users[userIndex] = { cpf, email, password, name };
    return res
      .status(200)
      .json({ message: "Usuario atualizado", user: users[userIndex] });
  }

  static async deleteUser(req, res) {
    // Obtem o parametro 'id' da requisição,que é o CPF do user a ser deletado
    const userId = req.params.cpf;

    //Procurar o indice do usuario no array "users" pelo cpf
    const userIndex = users.findIndex((user) => user.cpf === userId);

    //Se o usuario não for encontrado  userIndex equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }
    //Removendo o usuario do array 'users'
    users.splice(userIndex, 1);
    return res.status(200).json({ message: "Usuario apagado" });
  }
};
