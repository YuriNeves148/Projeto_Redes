import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { db } from "../../supabase.js";

function Feed() {
  const usuario = useNavigate();
  const [busca, setBusca] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    carregarPost();
  }, []);

  async function carregarPost() {
    const { data, error } = await db
      .from("post")
      .select("*")
      .order("data", { ascending: false });

    if (error) {
      alert("Erro ao carregar o post: " + error.message);
    } else {
      setPost(data);
    }
  }

  async function criarPost() {
    if (conteudo.trim() == "") {
      alert("Escreva algo antes da publicação!");
      return;
    }

    const { data: userData, error: userError } = await db.auth.getUser();
    if(userError || !userData?.user){
      alert("Usuario não autenticado ou sessão expirada!");
      return;
    }

    const userId = userData.user.id

    const { data: perfil, error: perfilError } = await db
      .from("usuario")
      .select("nome_usuario")
      .eq("id", userId)
      .single();

    if(perfilError || !perfil){
      alert("Não foi possivel encontrar o perfil do usuario.");
      console.error("Erro ao buscar perfil:", perfilError);
      return;
    }

    const { error: insertError } = await db.from("post").insert({
      conteudo: conteudo,
      id_usuario: userId,
      nome_usuario: perfil.nome_usuario,
    });

    if (insertError) {
      alert("Erro ao publicar: " + insertError.message);
    } else {
      setConteudo("");
      carregarPost();
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
          {post.map((post) => (
            <div key={post.id} className={styles.post}>
              <span className={styles.nomeUsuario}>@{post.nome_usuario}</span>
              <p className={styles.conteudo}>{post.conteudo}</p>
              <span className={styles.data}>
                {new Date(post.data).toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <footer>projeto de redes de computadores - UnB</footer>
    </>
  );
}

export default Feed;
