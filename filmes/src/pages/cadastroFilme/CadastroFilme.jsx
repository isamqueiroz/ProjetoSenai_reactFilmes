import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import api from "../../Services/services";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// const [selecionaGenero, setSelecionaGenero] = useState('');

const CadastroFilme = () => {
  const [listaGenero, setListaGenero] = useState([]);
  const [genero, setGenero] = useState("");
  const [filme, setFilme] = useState("");
  const [listaFilme, setListaFilme] = useState([]);

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
  //Funcao para trazer os generos no meu select
  async function listarGenero() {
    try {
      const resposta = await api.get("genero");
      setListaGenero(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function cadastrarFilme(e) {
    e.preventDefault();
    if (filme.trim() !== "") {
      try {
        await api.post("filme", { titulo: filme, idGenero: genero });
        alertar("success", "Sucesso! Cadastro realizado com sucesso!");
        setFilme("");
        setGenero("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alertar("error", "Erro! Preencha os campos");
    }
  }

  async function listarFilme() {
    try {
      const resposta = await api.get("filme");
      setListaFilme(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarGenero();
    listarFilme();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Cadastro
          tituloCadastro="Cadastro de Filme"
          placeholder="filme"

          lista={listaGenero}

          funcCadastro={cadastrarFilme}

          valorInput={filme}
          setValorInput={setFilme}

          valorSelect={genero}
          setValorSelect={setGenero}
        />
        <Lista
          ListaTitulo="Lista de Filmes"

          tipoLista="filme"

          lista={listaFilme}
        />
      </main>
      <Footer />
    </>
  );
};

export default CadastroFilme;
