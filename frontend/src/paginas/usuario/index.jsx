import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../supabase.js";
import styles from "./style.module.css";
<<<<<<< HEAD
import foto_padrao from "../../assets/imagem/foto_padrao.png";
=======
import { socket } from '../../socket.js'
>>>>>>> bc0f445e6d39b969c81c4fb34b82a602c4edcf75

function Usuario() {
  const { nomeUsuario } = useParams();
  const [perfil, setPerfil] = useState(null);
<<<<<<< HEAD
  const [posts, setPosts] = useState([]);
=======
  const [isOnline, setIsOnline] = useState(false);
>>>>>>> bc0f445e6d39b969c81c4fb34b82a602c4edcf75

  useEffect(() => {
    buscarPerfil();
  }, [nomeUsuario]);

  useEffect(() => {

    const tratarListaOnline = (usuariosConectadosMap) => {
      console.log("Dicionário recebido:", usuariosConectadosMap);
      const listaNomesOnline = Object.values(usuariosConectadosMap);
      setIsOnline(listaNomesOnline.includes(nomeUsuario));
    }

    socket.on('atualizar_lista_online', tratarListaOnline);

    socket.on('atualizarPerfil', (dadosAtualizados) => {
      if(dadosAtualizados.nome_usuario === nomeUsuario){
        setPerfil(dadosAtualizados);
      }
    });

    socket.emit('pedir_lista_online');

    return () => {
      socket.off('atualizar_lista_online', tratarListaOnline);
      socket.off('atualizarPerfil');
    };
  }, [nomeUsuario]);

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
<<<<<<< HEAD
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
=======
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
        <h1>@{perfil.nome_usuario}</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <span style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '1.5px solid #000',
            backgroundColor: isOnline ? '#4ed164' : '#757575',
            display: 'inline-block'

          }} />
          <span style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#666'
          }}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      <p>Nome: {perfil.nome}</p>
      <p>Contato: {perfil.forma_contato || "não informado"}</p>
    </div>
>>>>>>> bc0f445e6d39b969c81c4fb34b82a602c4edcf75
  );
}

export default Usuario;
