import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

function Home() {
  const conversa = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <form className={styles.formulario}>
          <h1>Acesse sua conta</h1>

          <label>Digite seu nome de usuário</label>
          <input type="text" placeholder="ex: maria123" name="nome"></input>
          <label>Digite sua senha</label>
          <input
            type="password"
            placeholder="digite sua senha"
            name="senha"
          ></input>
          <button
            type="button"
            name="entrar"
            onClick={() => conversa("/conversa")}
          >
            ENTRAR
          </button>
          <Link to="/cadastro">cadastre-se aqui</Link>
        </form>
      </div>
    </>
  );
}

export default Home;
