// TELA DE PERFIL DE USUÁRIO
// url: https://ocyahlkdiheciktiqjdj.supabase.co

import styles from "./style.module.css";

function Usuario() {
  return (
    <>
      <div className="atual">
        <img src="./assets/imagem/perfil.jpg" />
        <label>nome do usuario</label>
        <label>nome</label>
        <label>senha atual</label>
      </div>

      <div className="editar">
        <img src="./assets/imagem/perfil.jpg" />

        <input
          placeholder="alterar nome de usuario"
          name="nome_usuario_novo"
        ></input>
        <button type="button" name="botao_nome_usuario">
          alterar nome de usuário
        </button>
        <input placeholder="alterar nome" name="nome_novo"></input>
        <button type="button" name="botao_nome">
          alterar nome
        </button>
        <input placeholder="alterar senha" name="senha_nova1"></input>
        <input
          placeholder="digite novamente sua senha"
          name="senha_nova2"
        ></input>
      </div>
    </>
  );
}
export default Usuario;
