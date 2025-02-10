from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


url = "https://ai.stec.cx/single"

@app.route('/api/send-message', methods=['POST'])
def fazer_requisicao():
    # Recebe os dados enviados pelo frontend
    dados = request.json

    headers = {
        "Content-Type": "application/json"
    }

    try:
        # Envia a requisição para a API
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