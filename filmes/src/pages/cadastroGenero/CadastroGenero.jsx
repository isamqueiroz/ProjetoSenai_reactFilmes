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

  function alerta(icone, mensagem) {
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
    if (genero.trim() != "") {
      try {
        //cadastrar um genero: post
        await api.post("genero", { nome: genero });
        alerta("success", "Cadastro realizado com sucesso");
      } catch (error) {
        alerta("error", "Erro! entre em contato com o nosso suporte");
        console.log(error);
      }
    } else {
      alerta("info", "Preencha o campo!!");
    }

    //try => tentar(o esperado)
    //catch => pega a exceção
  }

async function listarGenero(){
  try {
    //await -> Aguarde ter uma resposta da solicitação
    const resposta =  await api.get("genero");
  
console.log();

    setListaGenero(resposta.data)

  } catch (error) {
    console.log(error);
    
  }
}

  async function excluirGenero(generoId){
   try {
     await api.delete(`genero/${generoId.idGenero}`);
    
   } catch (error) {
    
   }

  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Tem certeza?",
  text: "Você não poderá reverter isso!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sim, exclua-o!",
  cancelButtonText: "Não, cancele!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Seu arquivo foi excluído.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Seu arquivo está seguro :)",
      icon: "error"
    });
  }
});

}

// async function editarGenero(GeneroId){
//    try {
//      await api.put(`genero/${GeneroId.idGenero}`);
    
//    } catch (error) {
    
//    }



  //TESTE: validar o genero
  // useEffect(() => {
  //     console.log(genero);
  // },[genero]);
  //fim do teste


  useEffect(() => {
  listarGenero();
  }, [])

  

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
         lista = {listaGenero}
         funcExcluir = {excluirGenero}
         
         />
      </main>
      <Footer />
    </>
  );
};

export default CadastroGenero;
