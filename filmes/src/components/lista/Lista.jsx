import "./Lista.css";
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"

const Lista = (props) => {
    return(
        <section className="layout_grid listagem">
          <h1>{props.ListaTitulo}</h1>
            <hr/>
            
            <div className="tabela">
                <table>
                    {/* cabecalho da tabela: */}
                    <thead>
                            {/* tr > table row */}
                        <tr className="tablecabecalho">
                            {/* th => table header */}
                            <th>Nome</th>
                            <th  style={{display: props.visivel}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                            
                        </tr>
                    </thead>
                    {/* corpo da tabela */}
                    <tbody>
                        {props.lista && props.lista.length > 0 ? (

                            props.lista.map((item, index) => (


                      <tr className="item_lista" key={item.idGenero}>
                        <td data-cell="nome">
                            {item.nome}
                        </td>
                        <td data-cell="Gênero" style={{display: props.visivel}}>Ação</td>
                        <td data-cell="Editar">
                             {/* <button className="icon" onClick={() => props.funcEditar(item)}> */}
                             <img src={Editar} alt="Caneta" />
                             {/* </button> */}
                             </td>
                        <td data-cell="Excluir"> 
                            <button className="icone" onClick={() => props.funcExcluir(item)}>
                            <img src={Excluir} alt="Lixeira" />
                            </button>
                        
                        </td>
                      </tr>
                             ))

                            
                        ) : 
                        ( 
                            <p>nenhum gênero foi encontrado.</p>
                        )
                          }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;