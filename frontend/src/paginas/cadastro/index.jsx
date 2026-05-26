import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../supabase.js";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Cadastro() {
  useEffect(() => {
    socket.on('receber_mensagem', (dados) => {
      console.log("Nova mensagem:", dados);
    });

    return () => socket.off('receber_mensagem');
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirma] = useState("");

  async function criarConta() {
    console.log("email:", email);
    console.log("senha:", senha);
    console.log("nome:", nome);
    console.log("usuario:", usuario);

    if (senha !== confirmaSenha) {
      alert("Senha diferentes");
      return;
    }

    const { data: authData, error: authError } = await db.auth.signUp({
      email: email,
      password: senha,
    });

    if (authError) {
      alert("Erro: " + authError.message);
      return;
    }

    const userId = authData?.user?.id;

    if(!userId){
      alert("Conta criada! Verifique seu e-mail para confirmar o cadastro antes de entrar.");
      navigate("/");
      return;
    }

    const { error: dbError } = await db.from("usuario").insert({
      id: userId,
      nome: nome,
      nome_usuario: usuario,
    });

    if (dbError) {
      alert("Erro ao criar a conta: " + dbError.message);
      console.error("Detalhes do erro:", dbError);
    } else {
      socket.emit('novo_usuario', {
        id: userId,
        nome: nome,
        nome_usuario: usuario,
        data_cadastro: new Date().toISOString()
      });
      
      navigate("/feed");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.formulario}>
          <h1>crie sua conta</h1>
          <label>adicione seu email</label>
          <input
            type="email"
            placeholder="ex: maria123@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>coloque seu nome</label>
          <input
            type="text"
            placeholder="ex: maria"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
          ></input>
          <label>crie um nome de usuário</label>
          <input
            type="text"
            placeholder="ex: maria123"
            name="usuario"
            onChange={(e) => setUsuario(e.target.value)}
          ></input>
          <label>crie uma senha</label>
          <input type="text" onChange={(e) => setSenha(e.target.value)}></input>
          <label>digite novamente</label>
          <input
            type="text"
            name="confirmarSenha"
            onChange={(e) => setConfirma(e.target.value)}
          ></input>
          <button type="button" onClick={criarConta}>
            criar conta
          </button>
        </form>
      </div>
    </>
  );
}
export default Cadastro;
