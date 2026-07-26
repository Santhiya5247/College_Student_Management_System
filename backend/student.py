from database import connect_db

def add_student():
    connection = connect_db()
    cursor = connection.cursor()

    name = input("Enter Student Name : ") 
    age = int(input("Enter Age : "))
    gender = input("Enter Gender : ")
    department = input("Enter Department : ")
    year = int(input("Enter Year : "))
    phone = input("Enter Phone Number : ")
    email = input("Enter Email : ")
    address = input("Enter Address : ")

    query = """
    INSERT INTO students
    (name, age, gender, department, year, phone, email, address)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        name,
        age,
        gender,
        department,
        year,
        phone,
        email,
        address
    )

    cursor.execute(query, values)
    connection.commit()

    print("Student Added Successfully!")

    cursor.close()
    connection.close()

def view_student():
    connection = connect_db()
    cursor = connection.cursor()

    query="""
    SELECT * FROM students
    """
    cursor.execute(query)

    students = cursor.fetchall()


    for student in students:
         print("-" * 40)
         print("ID         :", student[0])
         print("Name       :", student[1])
         print("Age        :", student[2])
         print("Gender     :", student[3])
         print("Department :", student[4])
         print("Year       :", student[5])
         print("Phone      :", student[6])
         print("Email      :", student[7])
         print("Address    :", student[8])
         print("-" * 40)
   

    cursor.close()
    connection.close()

def search_student():
    connection = connect_db()
    cursor = connection.cursor()

    student_id = int(input("Enter Student ID : "))

    query = """
    SELECT * FROM students
    WHERE id = %s
    """

    cursor.execute(query, (student_id,))

    student = cursor.fetchone()

    if student:
        print("=" * 50)
        print("ID         :", student[0])
        print("Name       :", student[1])
        print("Age        :", student[2])
        print("Gender     :", student[3])
        print("Department :", student[4])
        print("Year       :", student[5])
        print("Phone      :", student[6])
        print("Email      :", student[7])
        print("Address    :", student[8])
        print("=" * 50)
    else:
        print("Student Not Found!")

    cursor.close()
    connection.close()

def update_student():
    connection = connect_db()
    cursor = connection.cursor()

    student_id = int(input("Enter Student ID : "))

    query = """
    SELECT * FROM students
    WHERE id = %s
    """

    cursor.execute(query, (student_id,))
    student = cursor.fetchone()

    if student:

        name = input("Enter New Name : ")
        age = int(input("Enter New Age : "))
        gender = input("Enter New Gender : ")
        department = input("Enter New Department : ")
        year = int(input("Enter New Year : "))
        phone = input("Enter New Phone Number : ")
        email = input("Enter New Email : ")
        address = input("Enter New Address : ")

        query = """
        UPDATE students
        SET
            name = %s,
            age = %s,
            gender = %s,
            department = %s,
            year = %s,
            phone = %s,
            email = %s,
            address = %s
        WHERE id = %s
        """

        values = (
            name,
            age,
            gender,
            department,
            year,
            phone,
            email,
            address,
            student_id
        )

        cursor.execute(query, values)
        connection.commit()

        print("Student Updated Successfully!")

    else:
        print("Student Not Found!")

    cursor.close()
    connection.close()

def delete_student():
    connection = connect_db()
    cursor = connection.cursor()

    student_id = int(input("Enter Student ID : "))

    # Check whether the student exists
    query = """
    SELECT * FROM students
    WHERE id = %s
    """

    cursor.execute(query, (student_id,))
    student = cursor.fetchone()

    if student:

        query = """
        DELETE FROM students
        WHERE id = %s
        """

        cursor.execute(query, (student_id,))
        connection.commit()

        print("Student Deleted Successfully!")

    else:
        print("Student Not Found!")

    cursor.close()
    connection.close()
