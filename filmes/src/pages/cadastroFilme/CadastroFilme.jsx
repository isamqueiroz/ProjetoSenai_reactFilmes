import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { Fragment } from "react";

import api from "../../Services/services";
const CadastroFilme = () => {

// const [selecionaGenero, setSelecionaGenero] = useState('');
const [listaGenero, setListaGenero] = useState([]);
const [cadastroFilme, setCadastroFilme] = useState([]);
const [genero, setGenero] = useState("")
const [filme, setFilme] = useState("")

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

  async function listarGenero() {
    
    try {
      const resposta = await api.get("genero");
      setListaGenero(resposta.data)
    } catch (error) { 
      console.log(error);
      
    }

  }

  async function CadastrarFilme () {
   if(filme.trim() != ""){  
    try {
      await api.post("filme", {titulo: filme, idGenero: genero});
      alertar ("success", "Sucesso! Cadastro realizado com sucesso");
      setFilme()
    } catch (error) {
      console.log(error);
      
    }

     
  }else{
    alertar("error", "erro! preencha o campo")
  }

  
  useEffect(() => {
    listarGenero();
  }, []);


  return (
    <>
      <Header />
      <main>
        <Cadastro tituloCadastro="Cadastro de Filme"
         placeholder ="Filme"
        lista = {listaGenero}
        funcCadastro = {CadastrarFilme}
        valorInput = {filme}
        setValorInput = {setFilme}

        valorSelect = {genero}
        setValorSelect = {setGenero}

        />
        
        <Lista 
          ListaTitulo ="Lista De Filme"
        />
      </main>
      <Footer />
    </>
  );
};
};

export default CadastroFilme;
