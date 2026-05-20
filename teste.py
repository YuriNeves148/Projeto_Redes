from Entidades import *
# Importamos o gerenciador que você criou
usuario1 = Usuario("Danilo", "Soneca", "123321", "online")
usuario2 = Usuario("Dante", "Diarreia explosiva", "123321", "online")

conversa = Conversa(usuario1, usuario2)
Escolha = input("Escolha alguma das opções abaixo:\n1 - enviar mensagem\n2 - ...\n")
if Escolha == "1":
    conversa.enviarMensagem(input("Digite uma mensagem: "))