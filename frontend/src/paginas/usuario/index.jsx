import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../supabase.js";
import styles from "./style.module.css";
import { socket } from '../../socket.js'

function Usuario() {
  const { nomeUsuario } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    buscarPerfil();
  }, [nomeUsuario]);

  useEffect(() => {
    if(!socket.connected) {
      socket.connect();
    }

    socket.on('atualizar_lista_online', (usuariosConectadosMap) => {
      const listaNomesOnline = Object.values(usuariosConectadosMap);
      setIsOnline(listaNomesOnline.includes(nomeUsuario));
    });

    socket.on('atualizarPerfil', (dadosAtualizados) => {
      if(dadosAtualizados.nome_usuario === nomeUsuario){
        setPerfil(dadosAtualizados);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('atualizar_lista_online');
      socket.off('atualizarPerfil');
    };
  }, [nomeUsuario]);

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
  );
}

export default Usuario;
