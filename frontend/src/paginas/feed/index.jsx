import { useNavigate, Link } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { db } from "../../supabase.js";

function Feed() {
  const usuario = useNavigate();
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
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

    const { data: userData } = await db.auth.getUser();
    const { data: perfil } = await db
      .from("usuario")
      .select("nome_usuario")
      .eq("id", userData.user.id)
      .single();
    const { error } = await db.from("post").insert({
      conteudo: conteudo,
      id_usuario: userData.user.id,
      nome_usuario: perfil.nome_usuario,
    });

    if (error) {
      alert("Erro ao publicar: " + error.message);
    } else {
      setConteudo("");
      carregarPost();
    }
  }

  async function buscarUsuario(texto) {
    if (texto.trim() === "") {
      setResultados([]);
      return;
    }
    const { data } = await db
      .from("usuario")
      .select("nome_usuario")
      .ilike("nome_usuario", `%${texto}%`)
      .limit(5);

    setResultados(data || []);
  }

  return (
    <>
      <header>
        <nav>
          <button type="button" onClick={() => usuario("/perfil")}>
            perfil
          </button>
          <div
            className={styles.buscaUsuario}
            onBlur={() => setTimeout(() => setResultados([]), 400)}
          >
            <input
              type="text"
              placeholder="pesquise por nome de usuario"
              onChange={(e) => {
                setBusca(e.target.value);
                buscarUsuario(e.target.value);
              }}
            />
            {resultados.length > 0 && (
              <div className={styles.resultados}>
                {resultados.map((u) => (
                  <Link key={u.nome_usuario} to={`/usuario/${u.nome_usuario}`}>
                    @{u.nome_usuario}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
              <Link
                to={`/usuario/${post.nome_usuario}`}
                className={styles.nomeUsuario}
              >
                @{post.nome_usuario}
              </Link>
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
