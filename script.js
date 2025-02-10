document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        adicionarMensagemBot("Olá! Eu sou o ChefNorteAM, seu guia de receitas da Amazônia! Me diga o que deseja cozinhar hoje?");
    }, 1000);
});

// Função para adicionar a mensagem do bot ao chat
function adicionarMensagemBot(texto) {
    const chatBox = document.getElementById("chatBox");

    // Remover pontos no início de cada linha ou frase
    texto = texto.replace(/^\.\s*|\.\s*$/gm, ""); 

    // Faz substituições para formatar corretamente o texto, transformando marcações em HTML
    texto = texto
        .replace(/---/g, "<hr>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/### (.*?)\n/g, "<h3>$1</h3>")
        .replace(/#### (.*?)\n/g, "<h4>$1</h4>")
        .replace(/\n-\s/g, "<ul><li>")
        .replace(/\n[0-9]+\.\s/g, "<ul><li>")
        .replace(/\n/g, "<br>")
        .replace(/<\/li><br>/g, "</li>")
        .replace(/<\/ul><br>/g, "</ul>")
        .replace(/#\s?/g, "")
        .replace(/-/g, "")
        .replace(/<\/ul><ul>/g, "");

     // Adiciona a mensagem formatada ao chat
    chatBox.innerHTML += `<div class='message bot-message'>${texto}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para reiniciar o chat e exibir a mensagem inicial novamente
function reiniciarChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    adicionarMensagemBot("Olá! Eu sou o ChefNorteAM, seu guia de receitas da Amazônia! Me diga o que deseja cozinhar hoje?"); 
}

// Função que trata o envio da mensagem do usuário e a resposta do bot
async function enviarMensagem() {
    const inputField = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const userMessage = inputField.value.trim();
    
    if (!userMessage) return;
    
    // Adiciona a mensagem do usuário ao chat
    chatBox.innerHTML += `<div class='message user-message'>${userMessage}</div>`;
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    
    chatBox.innerHTML += `<div class='message bot-message'>Digitando...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    
    try {
        // Faz uma requisição à API do chatbot para obter uma resposta
        const response = await fetch('http://localhost:5000/api/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: userMessage,
                service: "saturn-v1",
                clientid: "B9qpYHgMUu",
                projectid: "7lpvssxq5lflkup3ygno7"
            })
        });
        
        const data = await response.json();
        const botReply = JSON.parse(data.response).text;
        
        document.querySelector(".bot-message:last-child").remove();
        adicionarMensagemBot(botReply);
    } catch (error) {
        console.error("Erro na requisição:", error);
        document.querySelector(".bot-message:last-child").innerText = "Erro ao obter resposta.";
    }

}
