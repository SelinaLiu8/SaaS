from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/members', methods=['GET'])
def members():
    return jsonify({'members': ['Alice', 'Bob', 'Charlie']})


if __name__ == '__main__':
    app.run(debug=True, port=4999)