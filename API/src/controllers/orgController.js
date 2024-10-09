let organizadores = [];
let nextID = 0;

module.exports = class orgController {
  static async createOrganizador(req, res) {
    const { telefone, email, password, name, id } = req.body;

    if (!telefone || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res
        .status(400)
        .json({
          error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
        });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um organizador com o mesmo EMAIL
    const existingOrg = organizadores.find((org) => org.email === email);
    if (existingOrg) {
      return res.status(400).json({ error: "ID já cadastrado" });
    }
    
    // Cria e adiciona novo organizador
    const newOrg = { id: nextID++, telefone, email, password, name,  };
    organizadores.push(newOrg);

    return res
      .status(201)
      .json({ message: "Organizador criado com sucesso", org: newOrg });
  }

  static async getAllOrganizadores(req, res) {
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", organizadores });
  }

  static async updateOrganizador(req, res) {
    //Desestrutura e recupera os dados enviados via corpo da requisição
    const { telefone, email, password, name, id } = req.body;
    //Validar se todos os campos foram preenchidos
    if (!telefone || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    //Procura o indice do org no Array 'organizadores' pelo email
    const orgIndex = organizadores.findIndex((org) => org.id == id);

    //Se o organizador não for encontrado orgIndex equivale a -1
    if (orgIndex == -1) {
      return res.status(400).json({ error: "Organizador não encontrado" });
    }
    //Atualiza os dados do organizador no Array "organizadores"
    organizadores[orgIndex] = { id,telefone, email, password, name };
    return res
      .status(200)
      .json({ message: "Organizador atualizado", org: organizadores[orgIndex] });
  }

  static async deleteOrganizador(req, res) {
    // Obtem o parametro 'id' da requisição,que é o CPF do user a ser deletado
    const orgId = req.params.id;

    //Procurar o indice do usuario no array "users" pelo cpf
    const orgIndex = organizadores.findIndex((org) => org.id == orgId);

    //Se o organizadores não for encontrado  orgIndex equivale a -1
    if (orgIndex === -1) {
      return res.status(400).json({ error: "organizador não encontrado" });
    }
    //Removendo o organizador do array 'organizadores'
    organizadores.splice(orgIndex, 1);
    return res.status(200).json({ message: "organizadores apagado" });
  }
};