import sqlite3
from Domínios import Notificacao

class GerenciadorNotificacoes:
    def __init__(self, nome_banco="banco_notif.db"):
        self.nome_banco = nome_banco
        self._criar_tabela_se_nao_existir()

    def _conectar(self):
        return sqlite3.connect(self.nome_banco)

    def _criar_tabela_se_nao_existir(self):
        conexao = self._conectar()
        cursor = conexao.cursor()
        # a tabela para incluir o ID da postagem
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tabelanotificacoes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_destino TEXT NOT NULL,
                remetente TEXT NOT NULL,
                tipo TEXT NOT NULL,          -- 'COMENTARIO' ou 'CURTIDA'
                id_postagem INTEGER NOT NULL, -- Qual post recebeu a interação
                lida INTEGER DEFAULT 0
            )
        ''')
        conexao.commit()
        conexao.close()

    def adicionar_notificacao(self, usuario_destino, remetente, tipo, id_postagem):
        """Chame esse método sempre que alguém comentar em um post"""
        # não faz sentido notificar o autor se ele mesmo comentou no proprio post
        if usuario_destino == remetente:
            return
            
        conexao = self._conectar()
        cursor = conexao.cursor()
        cursor.execute('''
            INSERT INTO tabelanotificacoes (usuario_destino, remetente, tipo, id_postagem)
            VALUES (?, ?, ?, ?)
        ''', (usuario_destino, remetente, tipo, id_postagem))
        conexao.commit()
        conexao.close()
        print(f"[Banco Notif] Alerta de {tipo} no post #{id_postagem} salvo para {usuario_destino}.")

    def buscar_pendentes(self, usuario):
        conexao = self._conectar()
        cursor = conexao.cursor()
        cursor.execute('''
            SELECT remetente, tipo, id_postagem FROM tabelanotificacoes 
            WHERE usuario_destino = ? AND lida = 0
        ''', (usuario,))
        
        linhas = cursor.fetchall()
        conexao.close()
        
        lista_alertas = []
        for linha in linhas:
            # reconstroi o objeto Notificacao com o id_postagem vindo do banco (linha[2])
            alerta_objeto = Notificacao(remetente=linha[0], tipo=linha[1], id_postagem=linha[2])
            lista_alertas.append(alerta_objeto)
            
        return lista_alertas

    def marcar_todas_como_lidas(self, usuario):
        conexao = self._conectar()
        cursor = conexao.cursor()
        cursor.execute('''
            UPDATE tabelanotificacoes SET lida = 1 
            WHERE usuario_destino = ? AND lida = 0
        ''', (usuario,))
        conexao.commit()
        conexao.close()