import styles from "./style.module.css";
import foto_padrao from "../../assets/imagem/foto_padrao.png";
import { useState, useEffect } from "react";
import { db } from "../../supabase.js";
import { Link, useNavigate } from "react-router-dom";
import { socket } from '../../socket.js';

function Perfil() {
  const [userId, setUserId] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoUsuario, setNovoUsuario] = useState("");
  const [novoContato, setNovoContato] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dadosAtuais, setDadosAtuais] = useState({
    nome_usuario: "",
    nome: "",
    forma_contato: "",
    foto_perfil: "",
  });

  useEffect(() => {
    async function inicializarPerfil() {
      const { data: userData } = await db.auth.getUser();
      if (userData?.user) {
        setUserId(userData.user.id);
        buscarDados(userData.user.id);
      }
    }
    inicializarPerfil();
  }, []);

  async function salvarAlteracoes() {
    if (!userId) return;

    const dadosAtualizados = {
      nome: novoNome || dadosAtuais.nome,
      nome_usuario: novoUsuario || dadosAtuais.nome_usuario,
      forma_contato: novoContato || dadosAtuais.forma_contato,
    };

    const { error } = await db
        .from("usuario")
        .update(dadosAtualizados)
        .eq("id", userId);

    if (error) {
      alert("Erro ao salvar: " + error.message);
      return;
    }

    if (novoUsuario && novoUsuario !== dadosAtuais.nome_usuario) {
      socket.emit('usuario_online', { nome_usuario: novoUsuario});
    }

    socket.emit('atualizarPerfil', dadosAtualizados);

    if (novaSenha !== "") {
      if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      const { data: userData } = await db.auth.getUser();
      const { error: loginError } = await db.auth.signInWithPassword({
        email: userData.user.email,
        password: senhaAtual,
      });

      if (loginError) {
        alert("Senha atual incorreta!");
        return;
      }

      await db.auth.updateUser({ password: novaSenha });
    }

    alert("Alterações salvas!");
    buscarDados(userId);
    setNovoNome("");
    setNovoUsuario("");
    setNovoContato("");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  }

  async function buscarDados(idUsuario) {
    const idBuscado = idUsuario || userId;
    if(!idBuscado) return;

    const { data, error } = await db
      .from("usuario")
      .select("nome_usuario, nome, forma_contato, foto_perfil")
      .eq("id", idBuscado)
      .single();

    if (error) {
      alert("Erro ao buscar dados: " + error.message);
    } else {
      setDadosAtuais(data);
    }
  }
  async function uploadFoto(arquivo) {
    if(!userId || !arquivo) return;

    const extensao = arquivo.name.split(".").pop();
    const caminho = `${userId}.${extensao}`;

    const { error } = await db.storage
      .from("imagens_perfil")
      .upload(caminho, arquivo, { upsert: true });

    if (error) {
      alert("Erro ao enviar foto: " + error.message);
      return;
    }

    const { data } = db.storage.from("imagens_perfil").getPublicUrl(caminho);

    await db
      .from("usuario")
      .update({ foto_perfil: data.publicUrl })
      .eq("id", userId);

    socket.emit('atualizarPerfil', {
      ...dadosAtuais,
      foto_perfil: data.publicUrl
    });

    alert("Foto atualizada!");
    buscarDados(userId);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerAtual}>
          <div className={styles.atual}>
            <div
              className={styles.troca_foto}
              onClick={() => document.getElementById("inputFoto").click()}
              style={{ cursor: "pointer" }}
            >
              <img
                src={dadosAtuais.foto_perfil || foto_padrao}
                className={styles.foto_perfil}
              />
              <p>clique para alterar</p>
            </div>
            <input
              type="file"
              id="inputFoto"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => uploadFoto(e.target.files[0])}
            />

            <label>@{dadosAtuais.nome_usuario}</label>

            <label>{dadosAtuais.nome}</label>
            <label>{dadosAtuais.forma_contato}</label>
          </div>
        </div>
        <div className={styles.containerEditar}>
          <div className={styles.editar}>
<<<<<<< HEAD
=======
            <img src={dadosAtuais.foto_perfil || foto_padrao} alt="Preview" />

>>>>>>> bc0f445e6d39b969c81c4fb34b82a602c4edcf75
            <input
              value={novoUsuario}
              placeholder="alterar nome de usuario"
              onChange={(e) => setNovoUsuario(e.target.value)}
            />
            <input
              value={novoNome}
              placeholder="alterar nome"
              onChange={(e) => setNovoNome(e.target.value)}
            />
            <input
              value={novoContato}
              placeholder="adicionar forma de contato"
              onChange={(e) => setNovoContato(e.target.value)}
            />
            <input
              value={senhaAtual}
              type="password"
              placeholder="senha atual"
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
            <input
              value={novaSenha}
              type="password"
              placeholder="nova senha"
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <input
              value={confirmarSenha}
              type="password"
              placeholder="confirmar nova senha"
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button onClick={salvarAlteracoes}>salvar alterações</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Perfil;
