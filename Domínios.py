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