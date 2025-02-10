
# ChatBot ChefNorteAM

O **ChefNorteAM** é um chatbot desenvolvido para guiar os usuários em receitas típicas da região Norte, com foco nas do Amazonas. Ele fornece informações sobre ingredientes, preparo e dicas culinárias, além de interagir de forma amigável com os usuários.

## 📌 Sumário

- [📖 Sobre o chatbot](#-sobre-o-chatbot)
- [🛠 Como o chatbot foi treinado](#-como-o-chatbot-foi-treinado)
- [🔗 Como funciona a comunicação do front-end com a API](#como-funciona-a-comunicação-do-front-end-com-a-api)
- [🚀 Como rodar o projeto](#-como-rodar-o-projeto)
- [🧪 Como testar o chatbot](#-como-testar-o-chatbot)

---

## 📖 Sobre o chatbot

O **ChefNorteAM** é um assistente virtual especializado em culinária amazônica. Ele responde a perguntas sobre receitas, ingredientes e dicas gastronômicas, facilitando o acesso a pratos típicos da região.

## 🛠 Como o chatbot foi treinado

O projeto **ChefNorteAM** foi criado na plataforma **stec.cx**, onde dois arquivos de treinamento foram configurados:

- **SYSTEM**: Contém informações básicas e definições fixas do chatbot, como seu objetivo e propósito.
- **DATABASE**: Retorna apenas o parágrafo requerido dos prompts referentes às perguntas do usuário. Esse arquivo contém 20 receitas populares da região e foram feitas 69 perguntas possíveis para validar o treinamento. Além disso, inclui palavras-chave de receitas como "tacacá", "tucupi" e "peixe".

📎 **Anexo com os prompts utilizados no treinamento:** [Clique aqui](https://docs.google.com/document/d/1kuvDDULAPDiGtI78KqIo0Fvslw9gqyjBu73BjAVKlCg/edit?usp=sharing)

## 🔗 Como funciona a comunicação do front-end com a API

O **front-end** se comunica com a API do projeto por meio de requisições **HTTP (fetch)**. Quando o usuário envia uma mensagem no chat:

1️⃣ O usuário envia uma mensagem no chat.  
2️⃣ O JavaScript envia uma requisição **POST** para o endpoint `/api/send-message` no servidor **Flask**.  
3️⃣ O servidor processa a solicitação e encaminha para a API do **Saturn**.  
4️⃣ A resposta gerada é exibida no chat do usuário.

## 🚀 Como rodar o projeto

### 1️⃣ Clonar o repositório
```bash
git clone https:https://github.com/sabrinafrazao/ChefNorteAM.git
cd ChefNorteAM
```

### 2️⃣ Criar e ativar um ambiente virtual
- **Windows**:
```bash
python -m venv venv
venv\Scripts\activate
```

- **Linux/Mac**:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3️⃣ Instalar as dependências
```bash
pip install -r requirements.txt
```

### 4️⃣ Iniciar o servidor Flask
```bash
python app.py
```

### 5️⃣ Abrir o projeto no navegador
- Se estiver usando **Live Server** no VSCode, basta abrir o `index.html`
- Ou acessar manualmente: `http://127.0.0.1:5500/index.html`

## 🧪 Como testar o chatbot

✅ Envie perguntas sobre receitas regionais do Amazonas.

✅ Solicite ingredientes, modo de preparo e dicas culinárias.

✅ Caso o chat fique sobrecarregado, clique na opção "Reiniciar" para limpar o histórico.











