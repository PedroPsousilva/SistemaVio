//Acessa o objeto "document" que representa a página html

//Selelciona o elemento com o id indicado do formulario
document
  .getElementById("formulario-registro")
  //Adiciona o ouvinte de evento (submit)para capturar o envio do formulario

  .addEventListener("submit", function (event) {
    //previne o comportamento padrao do formulario,ou seja, impede que ele seja enviado e recarregue a pagina
    event.preventDefault();

    //Captura os valores dos campos do formulario

    const name = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    //Requisição HTTP para o eindpoint de cadastro de

    fetch("http://localhost:5000/api/v1/user", {
      //Realiza uma chamada http para o servidor (a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato json
        "Content-Type": "application/json",
      },
      //Transforma os dados do formulario em uma string json para serem enviados no corpo da requisição
      body: JSON.stringify({ name, cpf, email, password }),
    })
      .then((response) => {
        //Tratamento da resposta do servidor/API
        if (response.ok) {
          //Verifica se a resposta foi bem sucedida(status 2xx)
          return response.json();
        }
        //convertendo o error em formato json
        return response.json().then((err) => {
          //mensagem retornada do servidor,acessada pela chave "error"
          throw new Error(err.error);
        });
      }) //fechamento da then(response)
      .then((data) => {
        //Executa a resposta de sucesso - retorna ao usuario final

        //Exibe um alertapara o usuario final(front) com o nome do usuario que acabou de ser cadastrado
        alert("Usuario cadastrado com sucesso!" + data.user.name);

        //Exibe o log no terminal
        console.log("Usuario criado: ", data.user);

        //Reseta os campos do formularioapos o sucesso do cadastro 

        document.getElementById("formulario-registro").reset();
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra durante o processo de requisição/resposta

        //Exibe alrta (front) com o erro processado
        alert("Erro no cadastro: " + error.message);

        console.error("Erro:", error.message);
      });
  });
