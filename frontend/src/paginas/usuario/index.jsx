import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../supabase.js";
import styles from "./style.module.css";

function Usuario() {
  const { nomeUsuario } = useParams();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    buscarPerfil();
  }, []);

  async function buscarPerfil() {
    const { data, error } = await db
      .from("usuario")
      .select("nome, nome_usuario, forma_contato")
      .eq("nome_usuario", nomeUsuario)
      .single();

    if (error) {
      alert("Usuário não encontrado!");
    } else {
      setPerfil(data);
    }
  }

  if (!perfil) return <p className={styles.carregando}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>@{perfil.nome_usuario}</h1>
      <p>Nome: {perfil.nome}</p>
      <p>Contato: {perfil.forma_contato || "não informado"}</p>
    </div>
  );
}

export default Usuario;
