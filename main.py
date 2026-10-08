#Vortex Bank System

class User:
    def __init__(self, username, password, balance=0, email=None):
        self.username = username
        self.password = password
        self.balance = balance
        self.email = email

    def deposit(self, amount):
        self.balance += amount
        print(f"{self.username} deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print(f"{self.username} has insufficient funds for this withdrawal.")
        else:
            self.balance -= amount
            print(f"{self.username} withdrew {amount}. New balance: {self.balance}")

    def check_balance(self):
        print(f"{self.username}'s current balance: {self.balance}")

def register_user(users, username, password, email=None):
    if username in users:
        print("Username already exists. Please choose a different username.")
    else:
        users[username] = User(username, password, email=email)
        print(f"User {username} registered successfully.")  

def login_user(users, username, password):
    if username in users and users[username].password == password:
        print(f"User {username} logged in successfully.")
        return users[username]
    else:
        print("Invalid username or password.")
        return None

def dashboard(user):
    while True:
        print("\n--- Dashboard ---")
        print(f"Welcome, {user.username}!")
        print("1. Account Settings")
        print("2. Check Balance")
        print("3. Transaction History")
        print("4. Transfer Funds")
        print("5. Manage Beneficiaries")
        print("6. Analytics & Reports")
        print("7. Deposit")
        print("8. Withdraw")
        print("9. Logout")
        choice = input("Enter your choice: ")

        if choice == '1':
            amount = float(input("Enter amount to deposit: "))
            user.deposit(amount)
        elif choice == '2':
            amount = float(input("Enter amount to withdraw: "))
            user.withdraw(amount)
        elif choice == '3':
            user.check_balance()
        elif choice == '9':
            print(f"User {user.username} logged out.")
            break
        else:
            print("Invalid choice. Please try again.")

