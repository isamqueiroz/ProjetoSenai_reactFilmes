import { useEffect, useState } from "react";
import Swal from "sweetalert2";

//import components
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

import api from "../../Services/services";

const CadastroGenero = () => {
  const [listaGenero, setListaGenero] = useState([]);

  //const [excluirGenero, serExcluirGenero] = useState ([]);

  const [genero, setGenero] = useState("");

  function alertar(icone, mensagem) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icone,
      title: mensagem,
    });
  }

  async function cadastrarGenero(evt) {
    evt.preventDefault();
    //verificar se o input esta vindo vazio
    // trim: apaga os espaços
    if (genero.trim() !== "") {
      try {
        //cadastrar um genero: post
        await api.post("genero", { nome: genero });
        alertar("success", "Cadastro realizado com sucesso");
        setGenero("");
      } catch (error) {
        alertar("error", "Erro! entre em contato com o nosso suporte");
        console.log(error);
      }
    } else {
      alertar("info", "Preencha o campo!!");
    }

    //try => tentar(o esperado)
    //catch => pega a exceção
  }

  async function listarGenero() {
    try {
      //await -> Aguarde ter uma resposta da solicitação
      const resposta = await api.get("genero");

      console.log();

      setListaGenero(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function excluirGenero(generoId) {
     const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, exclua-o!",
        cancelButtonText: "Não, cancele!",
        reverseButtons: true,
      })
      .then(async(result) => {
        if (result.isConfirmed) {
           try {              //interpolação
      await api.delete(`genero/${generoId.idGenero}`);
    
    } catch (error) {

      console.log(error); 
    }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Seu arquivo foi excluído.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Seu arquivo está seguro :)",
            icon: "error",
          });
        }
      });
   
  }

  async function editarGenero(genero){
  console.log(genero);
  
const { value: novoGenero } = await Swal.fire({
  title: "Modifique o seu gênero",
  input: "text",
  inputLabel: "Novo Gênero",
  inputValue: genero.nome,
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) {
      return "O campo precisa estar preenchido!";
    }
  }
});
if (novoGenero) {
  try {
    api.put(`genero/${genero.idGenero}`, {nome: novoGenero});
    Swal.fire(`Gênero modificado para ${novoGenero}`);
    listarGenero();
  } catch (error) {
    console.log(error);
    
  }
  
}
  }
  
  useEffect(() => {
    listarGenero();
  }, []);
  
  
    //TESTE: validar o genero
    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);
    //fim do teste
  
    //function() = {} ---- função
    //arrow function ou função anonima.
    //[] <= array
  
    //hooks     Função     Dependencia
    //useEffect( () = > {},       []        )
  
    // Hooks : Effect (efeito a partir de uma alteração de Estado)
    //       : efeito colateral
  
    //função: o efeito que queremos que aconteça
  
    //Dependencia : Vazio (o efeitp acontece na primeira vez que a tela é "montada"
    //ou quando for recarregada, com dependencia (toda vez que o state sofrer alteração o efeito
    // acontecerá ) )
  return (
    <>
      <Header />
      <main>
        <Cadastro
          tituloCadastro="Cadastro de Gênero"
          visibilidade="none"
          placeholder="gênero"
          //atribuindo a função:
          funcCadastro={cadastrarGenero}
          //atribuindo o valor do input:
          valorInput={genero}
          //atibuindo a função que atualiza o meu genero
          setValorInput={setGenero}
        />

        <Lista
          ListaTitulo="Lista de Gêneros"
          visivel="none"

          lista={listaGenero}
          tipoLista = "genero"

          funcExcluir={excluirGenero}
          funcEditar={editarGenero}
          
        />
      </main>
      <Footer />
    </>
  );
};

export default CadastroGenero;
