from database import connect_db
from student import add_student,view_student,search_student,update_student,delete_student

try:
    connection = connect_db()
    print("Database Connected Successfully!")
    connection.close()
except Exception as e:
    print("Connection Failed!")
    print(e)

while True:
    print("\n===== Student Management System =====")
    print("1. Add Student")
    print("2.View student")
    print("3.Search student")
    print("4.Update student")
    print("5 Delete student")
    print("6.Exit")
    choice = input("Enter your choice : ")

    if choice == "1":
        add_student()

    elif choice == "2":
        view_student()
    
    elif choice == "3":
        search_student()

    elif choice == "4":
        update_student()

    elif choice == "5":
        delete_student()

    elif choice=="6":
        print("Thank You!")
        break

    else:
        print("Invalid Choice!")
