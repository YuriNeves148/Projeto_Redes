# Projeto_Redes
 
Rede social simples, inspirada no Reddit, desenvolvida como projeto acadêmico com o objetivo de aplicar conceitos de redes de computadores em uma aplicação real, analisando o tráfego de dados gerado por ela.

## Sobre o Projeto

A aplicação permite que usuários criem publicações, que ficam visíveis para todos os membros da rede — similar ao funcionamento básico do Reddit. Além do desenvolvimento da aplicação em si, o foco principal do projeto foi analisar o comportamento da rede durante o uso do sistema: tráfego gerado, transmissão de pacotes e comunicação entre cliente e servidor.

## Objetivo

- Desenvolver uma aplicação web funcional com front-end e back-end integrados.
- Simular e analisar o tráfego de rede gerado pela aplicação.
- Observar e compreender o comportamento de pacotes, transmissão de dados e comunicação em rede utilizando ferramentas especializadas.

## Tecnologias Utilizadas

- **Front-end:** React, HTML, CSS
- **Back-end:** Python
- **Banco de Dados:** Supabase
- **Análise de Rede:** Cisco Packet Tracer e Wireshark

## Estrutura do Projeto

```
Projeto_Redes/
├── backend/      # Lógica do servidor e regras de negócio
├── frontend/     # Interface da aplicação (React)
├── .idea/        # Configurações do ambiente de desenvolvimento
└── package.json  # Dependências do projeto
```

> **Observação:** este projeto utilizava o Supabase como banco de dados. Como se trata de um projeto acadêmico, a instância utilizada pode ter expirado, então a aplicação não está disponível para execução no momento. O repositório é mantido como referência do desenvolvimento e da lógica implementada.

## Análise de Rede

Para observar o tráfego gerado pela aplicação:

1. Configure a topologia da rede no **Cisco Packet Tracer** ou capture o tráfego real com o **Wireshark** enquanto a aplicação está em uso.
2. Analise os pacotes trocados entre cliente e servidor, observando protocolos, tempos de resposta e volume de dados transmitidos.

## Autoria

Projeto desenvolvido em grupo para a disciplina de Redes de Computadores.
