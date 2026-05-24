from Entidades import *
# Importamos o gerenciador que você criou
"""
Banco = sqlite3.connect("banco.db")
cursor = Banco.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS usuarios(nome text, nome_usuario text, endereco_usuario text, senha_usuario text, status text, foto_usuario text)")
cursor.execute("INSERT INTO usuarios VALUES('"+usuario1.nome+"', '"+usuario1.nome_usuario+"', '"+usuario1.endereco+"', '"+usuario1.senha+"', '"+usuario1.status+"','"+str(usuario1.foto_perfil)+"')")
Banco.commit()
Banco.close()"""

usuario1 = Usuario("Danilo", "Soneca", "123321", "online","aqui")
usuario2 = Usuario("Dante", "DIARREIA EXPLOSIVA", "12313", "online","longe")

"""conversa = Conversa(usuario1, usuario2)
conversa.criarConversa()
conversa.enviarMensagem("Exploda.")"""

banco = sqlite3.connect("banco_conversa.db")
cursor = banco.cursor()
cursor.execute("SELECT conversas.usuario1_nome, conversas.usuario2_nome, mensagens.mensagem FROM conversas INNER JOIN mensagens ON conversas.id = mensagens.conversa_id")
print(cursor.fetchall())
banco.close()

"""Escolha = input("Escolha alguma das opções abaixo:\n1 - enviar mensagem\n2 - ...\n")
if Escolha == "1":
    conversa.enviarMensagem(input("Digite uma mensagem: "))"""
