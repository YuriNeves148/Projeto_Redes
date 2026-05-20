from datetime import datetime
class Usuario:
    def __init__(self, nome, nome_usuario, senha, status,  foto_perfil = None):
        self.nome = nome
        self.nome_usuario = nome_usuario
        self.senha = senha
        self.status = status
        self.foto_perfil = foto_perfil

    def trocar_nome_usuario(self, nome_novo):
        self.nome_usuario = nome_novo
    def atualizar_status(self, novo_status):
        self.status = novo_status
    def trocar_foto_perfil(self, foto_perfil_nova):
        self.foto_perfil = foto_perfil_nova

class Notificacao:
    def __init__(self, remetente, tipo):
        self.remetente = remetente
        self.tipo = tipo
        self.lida = False
        self.data_hora = datetime.now()

class Mensagem:
    def __init__(self, Usuario_origem, Usuario_destino, mensagem = None):
        self.mensagem = mensagem
        self.Usuario_origem = Usuario_origem
        self.Usuario_destino = Usuario_destino
    def enviar_mensagem(self):
        print(f"<{self.Usuario_origem}><{self.Usuario_destino}>{self.mensagem}")