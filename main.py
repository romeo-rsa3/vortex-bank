# Vortex Bank System v0.1

from decimal import Decimal, InvalidOperation


# =========================
# USER CLASS
# =========================

class User:
    def __init__(self, username, password, email=None):
        self.username = username
        self.password = password
        self.email = email
        self.balance = Decimal("0.00")
        self.transactions = []

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be greater than zero.")
            return

        self.balance += amount

        self.transactions.append(
            f"Deposited R{amount:.2f}"
        )

        print(
            f"R{amount:.2f} deposited successfully."
        )
        print(
            f"New balance: R{self.balance:.2f}"
        )

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than zero.")
            return

        if amount > self.balance:
            print("Insufficient funds.")
            return

        self.balance -= amount

        self.transactions.append(
            f"Withdrew R{amount:.2f}"
        )

        print(
            f"R{amount:.2f} withdrawn successfully."
        )
        print(
            f"New balance: R{self.balance:.2f}"
        )

    def check_balance(self):
        print(
            f"\n{self.username}'s current balance: "
            f"R{self.balance:.2f}"
        )

    def show_transactions(self):
        print("\n--- Transaction History ---")

        if not self.transactions:
            print("No transactions yet.")
            return

        for number, transaction in enumerate(
            self.transactions, start=1
        ):
            print(f"{number}. {transaction}")


# =========================
# REGISTRATION
# =========================

def register_user(users):
    print("\n--- Register ---")

    username = input("Enter username: ").strip()

    if username in users:
        print(
            "Username already exists. "
            "Please choose a different username."
        )
        return

    password = input("Enter password: ").strip()
    email = input("Enter email: ").strip()

    users[username] = User(
        username=username,
        password=password,
        email=email
    )

    print(
        f"User {username} registered successfully!"
    )


# =========================
# LOGIN
# =========================

def login_user(users):
    print("\n--- Login ---")

    username = input("Enter username: ").strip()
    password = input("Enter password: ").strip()

    if username in users:
        user = users[username]

        if user.password == password:
            print(
                f"\nWelcome back, {username}!"
            )
            return user

    print("Invalid username or password.")
    return None


# =========================
# GET MONEY INPUT
# =========================

def get_amount():
    while True:
        amount = input("Enter amount: R").strip()

        try:
            amount = Decimal(amount)

            if amount <= 0:
                print(
                    "Amount must be greater than zero."
                )
                continue

            return amount

        except InvalidOperation:
            print(
                "Invalid amount. "
                "Please enter a valid number."
            )


# =========================
# DASHBOARD
# =========================

def dashboard(user):

    while True:

        print("\n")
        print("=" * 40)
        print("           VORTEX BANK")
        print("=" * 40)

        print(f"Welcome, {user.username}!")
        print(f"Balance: R{user.balance:.2f}")

        print("\n--- Dashboard ---")
        print("1. Account Settings")
        print("2. Check Balance")
        print("3. Transaction History")
        print("4. Transfer Funds")
        print("5. Manage Beneficiaries")
        print("6. Analytics & Reports")
        print("7. Deposit")
        print("8. Withdraw")
        print("9. Logout")

        choice = input(
            "\nEnter your choice: "
        ).strip()

        # Check balance
        if choice == "2":
            user.check_balance()

        # Transaction history
        elif choice == "3":
            user.show_transactions()

        # Deposit
        elif choice == "7":
            amount = get_amount()
            user.deposit(amount)

        # Withdraw
        elif choice == "8":
            amount = get_amount()
            user.withdraw(amount)

        # Account settings
        elif choice == "1":
            print("\n--- Account Settings ---")
            print(f"Username: {user.username}")
            print(f"Email: {user.email}")

        # Transfer
        elif choice == "4":
            print(
                "\nTransfer Funds will be implemented "
                "in the next version."
            )

        # Beneficiaries
        elif choice == "5":
            print(
                "\nBeneficiary management will be "
                "implemented in the next version."
            )

        # Analytics
        elif choice == "6":
            print(
                "\nAnalytics & Reports will be "
                "implemented in the next version."
            )

        # Logout
        elif choice == "9":
            print(
                f"\nUser {user.username} logged out."
            )
            break

        else:
            print(
                "Invalid choice. "
                "Please select an option from 1-9."
            )


# =========================
# MAIN PROGRAM
# =========================

def main():

    # Temporary in-memory storage.
    # PostgreSQL will replace this later.
    users = {}

    print("=" * 40)
    print("       WELCOME TO VORTEX BANK")
    print("=" * 40)

    while True:

        print("\n--- Main Menu ---")
        print("1. Register")
        print("2. Login")
        print("3. Exit")

        choice = input(
            "\nEnter your choice: "
        ).strip()

        # Register
        if choice == "1":
            register_user(users)

        # Login
        elif choice == "2":
            user = login_user(users)

            if user:
                dashboard(user)

        # Exit
        elif choice == "3":
            print(
                "\nThank you for using Vortex Bank."
            )
            print("Goodbye!")
            break

        else:
            print(
                "Invalid choice. "
                "Please select 1, 2, or 3."
            )


# =========================
# START PROGRAM
# =========================

if __name__ == "__main__":
    main()