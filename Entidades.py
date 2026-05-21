from Domínios import *
from Domínios import Mensagem

class Conversa:
    def __init__(self, usuario_origem: Usuario, usuario_destino: Usuario):
        self.usuario_origem = usuario_origem
        self.usuario_destino = usuario_destino
    def criarConversa(self):
        banco_conversa = sqlite3.connect("banco_conversa.db")
        cursor = banco_conversa.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS conversas(id INTEGER PRIMARY KEY AUTOINCREMENT, usuario1_nome TEXT, usuario2_nome TEXT, UNIQUE(usuario1_nome, usuario2_nome))")
        cursor.execute("CREATE TABLE IF NOT EXISTS mensagens(id INTEGER PRIMARY KEY AUTOINCREMENT, mensagem TEXT, conversa_id INTEGER, FOREIGN KEY (conversa_id) REFERENCES conversas(id))")
        cursor.execute("INSERT OR IGNORE INTO conversas(usuario1_nome, usuario2_nome) VALUES('"+self.usuario_origem.nome_usuario+"', '"+self.usuario_destino.nome_usuario+"')")
        banco_conversa.commit()
        banco_conversa.close()
    def enviarMensagem(self, mensagem_nova):
        banco_conversa = sqlite3.connect("banco_conversa.db")
        cursor = banco_conversa.cursor()
        cursor.execute("SELECT * FROM conversas WHERE usuario1_nome = ? AND usuario2_nome = ?", (self.usuario_origem.nome_usuario, self.usuario_destino.nome_usuario,))
        conversa = cursor.fetchone()
        cursor.execute("INSERT INTO mensagens(mensagem, conversa_id) VALUES('"+mensagem_nova+"','"+str(conversa[0])+"')")
        banco_conversa.commit()
        banco_conversa.close()