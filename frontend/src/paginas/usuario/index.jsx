import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../supabase.js";
import styles from "./style.module.css";
import foto_padrao from "../../assets/imagem/foto_padrao.png";

function Usuario() {
  const { nomeUsuario } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    buscarPerfil();
  }, []);

  async function buscarPerfil() {
    const { data, error } = await db
      .from("usuario")
      .select("nome, nome_usuario, forma_contato, foto_perfil")
      .eq("nome_usuario", nomeUsuario)
      .single();

    if (error) {
      alert("Usuário não encontrado!");
    } else {
      setPerfil(data);
    }

    const { data: postagens } = await db
      .from("post")
      .select("*")
      .eq("nome_usuario", nomeUsuario)
      .order("data", { ascending: false });

    setPosts(postagens || []);
  }

  if (!perfil) return <p className={styles.carregando}>Carregando...</p>;

  return (
    <>
      <div className={styles.container}>
        <img src={perfil.foto_perfil || foto_padrao} className={styles.foto} />
        <div className={styles.informacao}>
          <label className={styles.usuario}>
            <p>@{perfil.nome_usuario}</p>
          </label>
          <p>nome: {perfil.nome}</p>
          <p>contato: {perfil.forma_contato || "não informado"}</p>
        </div>
        <div className={styles.historico}>
          <h1 className={styles.titulo}>HISTÓRICO</h1>
          {posts.length === 0 ? (
            <h1>Nenhuma publicação ainda.</h1>
          ) : (
            posts.map((post) => (
              <div key={post.id} className={styles.post}>
                <p className={styles.conteudo}>{post.conteudo}</p>
                <span className={styles.data}>
                  {new Date(post.data).toLocaleString("pt-BR")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Usuario;
