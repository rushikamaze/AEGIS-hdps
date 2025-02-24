from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import bcrypt
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow frontend to talk to Flask

# MySQL Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  # Add your MySQL password
app.config['MYSQL_DB'] = 'heart_disease_db'

mysql = MySQL(app)
app.secret_key = "supersecretkey"

# Load ML Model
model = pickle.load(open("xgboost_model.pkl", "rb"))

# ========== USER AUTHENTICATION ==========
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User registered successfully"})


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password'].encode('utf-8')

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, password FROM users WHERE email=%s", [email])
    user = cur.fetchone()
    cur.close()

    if user and bcrypt.checkpw(password, user[1].encode('utf-8')):
        session['user_id'] = user[0]
        return jsonify({"status": "success", "message": "Login successful"})
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"})


# ========== HEART DISEASE PREDICTION ==========
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    age = float(data['age'])
    cholesterol = float(data['cholesterol'])
    bp = float(data['bp'])

    # Predict using XGBoost model
    input_data = np.array([[age, cholesterol, bp]])
    prediction = model.predict(input_data)

    return jsonify({"prediction": int(prediction[0])})


if __name__ == '__main__':
    app.run(debug=True)
