// url: https://ocyahlkdiheciktiqjdj.supabase.co

import styles from "./style.module.css";
import foto_padrao from "../../assets/imagem/foto_padrao.png";

function Usuario() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerAtual}>
          <div className={styles.atual}>
            <img src={foto_padrao} />
            <label>nome do usuario</label>
            <label>nome</label>
            <label>forma de contato</label>
            <label>senha atual</label>
          </div>
        </div>
        <div className={styles.containerEditar}>
          <div className={styles.editar}>
            <img src={foto_padrao} />

            <input placeholder="alterar nome de usuario (visível para outros usuários ao publicar)"></input>

            <input placeholder="alterar nome"></input>

            <input placeholder="adicionar forma de contato"></input>

            <input placeholder="alterar senha"></input>

            <input placeholder="digite novamente sua nova senha"></input>

            <button>salvar alterações</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Usuario;
