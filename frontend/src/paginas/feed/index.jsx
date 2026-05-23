import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { db } from "../../supabase.js";

function Feed() {
  const usuario = useNavigate();
  const [busca, setBusca] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    carregarPosts();
  }, []);

  async function carregarPosts() {
    const { data, error } = await db
      .from("post")
      .select("*")
      .order("data", { ascending: false });

    if (error) {
      alert("Erro ao carregar o post: " + error.message);
    } else {
      setPosts(data);
    }
  }

  async function criarPost() {
    if (conteudo.trim() == "") {
      alert("Escreva algo antes da publicação!");
      return;
    }

    const { data: userData } = await db.auth.getUser();
    const { data: perfil } = await db
      .from("usuario")
      .select("nome_usuario")
      .eq("id", userData.user.id)
      .single();
    const { error } = await db.from("posts").insert({
      conteudo: conteudo,
      usuario_id: userData.user.id,
      nome_usuario: perfil.nome_usuario,
    });

    if (error) {
      alert("Erro ao publicar: " + error.message);
    } else {
      setConteudo("");
      carregarPosts();
    }
  }

  return (
    <>
      <header>
        <nav>
          <button type="button" onClick={() => usuario("/usuario")}>
            perfil
          </button>
          <input type="text" placeholder="pesquise por nome de usuario" />
          <button type="button">notificações</button>
        </nav>
      </header>

      <div className={styles.container}>
        <div className={styles.caixaPost}>
          <textarea
            placeholder="No que você está pensando?"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
          <button type="button" onClick={criarPost}>
            Publicar
          </button>
        </div>

        <div className={styles.listaPosts}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <span className={styles.nomeUsuario}>@{post.nome_usuario}</span>
              <p className={styles.conteudo}>{post.conteudo}</p>
              <span className={styles.data}>
                {new Date(post.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Feed;
