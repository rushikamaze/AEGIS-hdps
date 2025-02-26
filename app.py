from flask import Flask, request, jsonify, render_template, session
from flask_mysqldb import MySQL
import bcrypt
import numpy as np
import pickle  # If using a pre-trained ML model
from flask import redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Bareera@21'
app.config['MYSQL_DB'] = 'heart_disease_db'

app.secret_key = 'supersecretkey'

mysql = MySQL(app)

# Loading pre-trained model
try:
    with open("xgboost_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
except FileNotFoundError:
    model = None                            # Disable prediction if model not found

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

# Serve Login Page
@app.route('/')
def index():
    return render_template('hp.html')

# Registration Route
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message": "Missing email or password"}), 400
        cursor = mysql.connection.cursor()
        hashed_password = generate_password_hash(password)
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# Login Route
@app.route('/login', methods=['POST'])
def login():
    # Handle JSON data (used by your JavaScript)
    if request.is_json:
        data = request.json
        email = data.get('email')
        password = data.get('password')
    # Also handle form data as fallback
    else:
        email = request.form.get('email')
        password = request.form.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    cur = mysql.connection.cursor()
    cur.execute("SELECT password FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    
    if user:
        stored_hashed_password = user[0]
        if check_password_hash(stored_hashed_password, password):
            session['user_id'] = email
            
            # For JSON requests, return a success message
            if request.is_json:
                return jsonify({"message": "Login successful"}), 200
            # For form submissions, redirect
            else:
                return redirect('/')
    
    # Return appropriate error based on request type
    if request.is_json:
        return jsonify({"error": "Invalid credentials"}), 401
    else:
        return render_template('login.html', error="Invalid email or password")


@app.route('/diet')
def diet():
    return render_template('diet.html')


@app.route('/prediction_tool')
def prediction_tool():
    return render_template('prediction_tool.html')

@app.route('/login_page', methods=['GET'])
def login_page():
    return render_template('login.html')

@app.route('/logout', methods=['GET'])
def logout():
    session.clear()  # Clear session data
    return redirect(url_for('login_page'))  # Redirect to login page

if __name__ == '__main__':
    app.run(debug=True)