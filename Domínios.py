import mimetypes
from supabase_client import supabase
class Perfil:
    def __init__(self):
        self.usuario = supabase.auth.get_user() # Dados do usuário autenticado na sessão atual
        self.id = self.usuario.id # id do usuário autenticado na sessão atual
    def trocar_nome_usuario(self, nome_novo):
        supabase.table("usuario").update({"nome_usuario": nome_novo}).eq("id", self.id).execute() # Troca o nome de usuário
    def trocar_foto_perfil(self, foto_perfil_nova):
        tipo, _ = mimetypes.guess_type(foto_perfil_nova)
        nome_supabase = str(self.id) + '/foto_perfil' + tipo
        try:
            with open(foto_perfil_nova, "rb") as imagem:
                resposta = supabase.storage.from_("imagens_perfil").upload(
                    file=imagem,
                    path=nome_supabase,
                    file_options={"content_type": tipo}
                )
            print("upload realizado com sucesso")
        except Exception as erro:
            print(f"Erro ao realizar o upload: {erro}")
        url_imagem = supabase.storage.from_("imagens_perfil").get_public_url(nome_supabase)
        supabase.table("usuario").update({"foto_perfil": url_imagem}).eq("id", self.id).execute() # Troca a foto de perfil
    def trocar_forma_contato(self, forma_contato_nova):
        supabase.table("usuario").update({"forma_contato": forma_contato_nova}).eq("id", self.id).execute() # Troca a forma de contato

class Notificacao:
    def __init__(self, remetente, tipo, id_postagem):
        self.remetente = remetente      # Quem comentou/curtiu
        self.tipo = tipo                # 'COMENTARIO' ou 'CURTIDA'
        self.id_postagem = id_postagem  # ID da postagem que recebeu a interação
        self.lida = False

def buscar(usuario):
    resposta = supabase.table("post").select("conteudo").eq("nome_usuario", usuario).execute()
    return resposta.data
