import { Link, useNavigate } from "react-router-dom";
import { db } from "../../supabase.js";
import styles from "./style.module.css";
import { useState } from "react";

function Home() {
  const feed = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {
    const { error } = await db.auth.signInWithPassword({
      email: email,
      password: senha,
    });
    if (error) {
      alert("Email ou senha incorreto(s)");
    } else {
      feed("/feed");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.formulario}>
          <h1>Acesse sua conta</h1>

          <label>Digite seu email</label>
          <input
            type="email"
            placeholder="ex: maria123@gmail.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Digite sua senha</label>
          <input
            type="password"
            placeholder="digite sua senha"
            name="senha"
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <button type="button" name="entrar" onClick={entrar}>
            ENTRAR
          </button>
          <Link to="/cadastro">cadastre-se aqui</Link>
        </form>
      </div>
    </>
  );
}

export default Home;
