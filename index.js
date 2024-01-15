class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0;
    for (let element of this.transactions) {
      total += element.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    if (!this.isAllowed()) {
      return false;
    }

    this.time = new Date();
    this.account.addTransaction(this);

    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Kevin");

console.log("Starting Balance:", myAccount.balance);

const t1 = new Deposit(52500, myAccount);
t1.commit();

const t2 = new Withdrawal(7750, myAccount);
t2.commit();

const t3 = new Deposit(5375, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
