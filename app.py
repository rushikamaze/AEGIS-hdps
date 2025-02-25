from flask import Flask, request, jsonify, render_template, session
from flask_mysqldb import MySQL
import bcrypt
import numpy as np
import pickle  # If using a pre-trained ML model

app = Flask(__name__)

# Secret key for sessions
app.secret_key = "super_secret_key"

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Bareera@21'
app.config['MYSQL_DB'] = 'heart_disease_db'

mysql = MySQL(app)

# Loading pre-trained model
try:
    with open("xgboost_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
except FileNotFoundError:
    model = None                            # Disable prediction if model not found

# ========== USER AUTHENTICATION ==========

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password.decode('utf-8')))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User registered successfully"})


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.content_type == 'application/json':
        data = request.json
    else:  # Handle form submission
        data = {
            'email': request.form.get('email'),
            'password': request.form.get('password')
        }

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


# ========== RENDER PAGES ==========
@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login')
def login_page():
    return render_template('hp.html')

@app.route('/prediction_tool')
def prediction_tool():
    return render_template('prediction_tool.html')

if __name__ == '__main__':
    app.run(debug=True)
