import { Link, useNavigate } from "react-router-dom";
import { db } from "../../supabase.js";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { socket } from '../../socket.js'

function Home() {
  const feed = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {
    const { data: authData, error } = await db.auth.signInWithPassword({
      email: email,
      password: senha,
    });
    if (error) {
      alert("Email ou senha incorreto(s)");
      return;
    }

    const userId = authData?.user?.id;

    const { data: perfilData, error: perfilError } = await db
        .from("usuario")
        .select("nome_usuario")
        .eq("id", userId)
        .single();

    if(perfilError) {
      alert("Erro ao carregar dados do perfil.");
      return;
    }

    const user_name = perfilData?.nome_usuario;

    if(!socket.connected) {
      socket.connect();
    }

    socket.once('connect', () => {
      socket.emit('usuario_online', {
        nome_usuario: user_name,
        id_usuario: userId,
        email: email,
        entrou_em: new Date().toISOString()
      });

    });
    feed("/feed");
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
