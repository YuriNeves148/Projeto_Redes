from Domínios import *
from Domínios import Mensagem

class Conversa:
    def __init__(self, usuario_origem: Usuario):
        self.usuario_origem = usuario_origem
    def criarConversa(self):
        banco_conversa = sqlite3.connect("banco_conversa.db")
        cursor = banco_conversa.cursor()
        cursor.execute("INSERT OR IGNORE INTO conversas(usuario1_nome, usuario2_nome) VALUES('"+self.usuario_origem.nome_usuario+"', '"+self.usuario_destino.nome_usuario+"')")
        banco_conversa.commit()
        banco_conversa.close()
    def publicar(self, mensagem_nova):
        banco_conversa = sqlite3.connect("banco_conversa.db")
        cursor = banco_conversa.cursor()
        cursor.execute("SELECT * FROM conversas WHERE usuario1_nome = ? AND usuario2_nome = ?", (self.usuario_origem.nome_usuario, self.usuario_destino.nome_usuario,))
        conversa = cursor.fetchone()
        cursor.execute("INSERT INTO mensagens(mensagem, conversa_id) VALUES('"+mensagem_nova+"','"+str(conversa[0])+"')")
        banco_conversa.commit()
        banco_conversa.close()