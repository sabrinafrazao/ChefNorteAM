document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        adicionarMensagemBot("Olá! Eu sou o Chef Amazônico, seu guia de receitas da Amazônia! Me diga o que deseja cozinhar hoje?");
    }, 1000);
});

function adicionarMensagemBot(texto) {
    const chatBox = document.getElementById("chatBox");

    // Remover pontos no início de cada linha ou frase
    texto = texto.replace(/^\.\s*|\.\s*$/gm, ""); 

    // Substituições para formatar o texto corretamente
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

    chatBox.innerHTML += `<div class='message bot-message'>${texto}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

function reiniciarChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = ""; // Limpa o conteúdo do chat
    adicionarMensagemBot("Olá! Eu sou o ChefNorteAM, seu guia de receitas da Amazônia! Me diga o que deseja cozinhar hoje?"); // Mensagem inicial
}

async function enviarMensagem() {
    const inputField = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const userMessage = inputField.value.trim();
    
    if (!userMessage) return;
    
    chatBox.innerHTML += `<div class='message user-message'>${userMessage}</div>`;
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    
    chatBox.innerHTML += `<div class='message bot-message'>Digitando...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    
    try {
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
