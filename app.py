from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) # Habilita o CORS para permitir que o frontend faça requisições ao backend sem bloqueios

# URL da API Saturn
url = "https://ai.stec.cx/single"

# Define uma rota que será acionada quando o frontend enviar uma requisição POST para /api/send-message
@app.route('/api/send-message', methods=['POST'])
def fazer_requisicao():
    # Recebe os dados enviados pelo frontend
    dados = request.json

    headers = {
        "Content-Type": "application/json"
    }

    try:
        # Envia uma requisição POST para a API com os dados recebidos do frontend
        response = requests.post(url, headers=headers, json=dados)

       # Retorna a resposta da API para o frontend
        return jsonify({
            "status_code": response.status_code,
            "response": response.text
        })

    except requests.exceptions.RequestException as e:
        return jsonify({
            "status_code": 500,
            "response": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)