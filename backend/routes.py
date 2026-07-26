from flask import Blueprint, request, jsonify
from database import connect_db

student_routes = Blueprint("student_routes", __name__)


# -------------------- ADD STUDENT --------------------

@student_routes.route("/students", methods=["POST"])
def add_student():
    data = request.get_json()

    connection = connect_db()
    cursor = connection.cursor()

    query = """
    INSERT INTO students
    (name, age, gender, department, year, phone, email, address)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data["name"],
        data["age"],
        data["gender"],
        data["department"],
        data["year"],
        data["phone"],
        data["email"],
        data["address"]
    )

    cursor.execute(query, values)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Student Added Successfully"
    }), 201


# -------------------- VIEW STUDENTS --------------------

@student_routes.route("/students", methods=["GET"])
def get_students():

    department = request.args.get("department")
    year = request.args.get("year")

    connection = connect_db()
    cursor = connection.cursor(dictionary=True)

    if department and year:

        query = """
        SELECT * FROM students
        WHERE department = %s AND year = %s
        ORDER BY name ASC
        """

        cursor.execute(query, (department, year))

    elif department:

        query = """
        SELECT * FROM students
        WHERE department = %s
        ORDER BY name ASC
        """

        cursor.execute(query, (department,))

    else:

        cursor.execute("""
        SELECT * FROM students
        ORDER BY name ASC
        """)

    students = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(students)
    
@student_routes.route("/students/<int:id>", methods=["PUT"])
def update_student(id):

    data = request.get_json()

    connection = connect_db()
    cursor = connection.cursor()

    query = """
    UPDATE students
    SET
        name=%s,
        age=%s,
        gender=%s,
        department=%s,
        year=%s,
        phone=%s,
        email=%s,
        address=%s
    WHERE id=%s
    """

    values = (
        data["name"],
        data["age"],
        data["gender"],
        data["department"],
        data["year"],
        data["phone"],
        data["email"],
        data["address"],
        id
    )

    cursor.execute(query, values)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Student Updated Successfully"
    })    

@student_routes.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):

    connection = connect_db()
    cursor = connection.cursor()

    query = "DELETE FROM students WHERE id = %s"

    cursor.execute(query, (id,))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Student Deleted Successfully"
    })    


@student_routes.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    connection = connect_db()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT * FROM admin
    WHERE username = %s AND password = %s
    """

    cursor.execute(query, (username, password))

    admin = cursor.fetchone()

    cursor.close()
    connection.close()

    if admin:
        return jsonify({
            "success": True,
            "message": "Login Successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid Username or Password"
    }), 401    

@student_routes.route("/dashboard", methods=["GET"])
def dashboard():

    connection = connect_db()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM students")
    total = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS male FROM students WHERE gender='Male'")
    male = cursor.fetchone()["male"]

    cursor.execute("SELECT COUNT(*) AS female FROM students WHERE gender='Female'")
    female = cursor.fetchone()["female"]

    cursor.execute("SELECT COUNT(DISTINCT department) AS departments FROM students")
    departments = cursor.fetchone()["departments"]

    cursor.close()
    connection.close()

    return jsonify({
        "total": total,
        "male": male,
        "female": female,
        "departments": departments
    })

# -------------------- SEARCH STUDENT --------------------

@student_routes.route("/students/search/<keyword>", methods=["GET"])
def search_student(keyword):

    connection = connect_db()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT * FROM students
    WHERE
        name LIKE %s
        OR department LIKE %s
        OR CAST(id AS CHAR) LIKE %s
    """

    value = f"%{keyword}%"

    cursor.execute(query, (value, value, value))

    students = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(students)
