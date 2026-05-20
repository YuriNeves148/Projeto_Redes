import styles from "./style.module.css";

function Cadastro() {
  return (
    <>
      <div className={styles.container}>
        <form className={styles.formulario}>
          <h1>crie sua conta</h1>
          <label>coloque seu nome</label>
          <input type="text" placeholder="ex: maria" name="nome"></input>
          <label>crie um nome de usuário</label>
          <input type="text" placeholder="ex: maria1234" name="usuario"></input>
          <label>crie uma senha</label>
          <input type="password"></input>
          <label>digite novamente</label>
          <input type="password" name="confirmarSenha"></input>
          <button type="button">criar nova conta</button>
        </form>
      </div>
    </>
  );
}
export default Cadastro;
