from Domínios import *
from Domínios import Mensagem


class Conversa:
    def __init__(self, usuario_origem, usuario_destino):
        self.usuario_origem = usuario_origem
        self.usuario_destino = usuario_destino
    def enviarMensagem(self, mensagem_nova):
        mensagem = Mensagem(self.usuario_origem, self.usuario_destino, mensagem_nova)
        mensagem.enviar_mensagem()