

from flask import Flask
from flask_cors import CORS
from routes import student_routes

app = Flask(__name__)

# Allow React frontend to access Flask APIs
CORS(app)

# Register Routes
app.register_blueprint(student_routes)

@app.route("/")
def home():
    return "Flask Backend Running Successfully!"

if __name__ == "__main__":
    app.run(debug=True)
