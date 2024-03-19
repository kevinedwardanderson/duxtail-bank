import { faker } from "@faker-js/faker";
import { useDispatch } from "react-redux";

const URL = "http://localhost:9000/accountData";

function generateData() {
  const data = {
    accounts: Array.from({ length: 3 }, (_, i) => i).map((i) =>
      createAccount(),
    ),
  };
}

let account;
function createAccount() {
  account = {
    name: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
    // transactions: [],
  };
}

function generateWithdrawals() {
  const w = Array.from({ length: 50 }, (_, i) => i).map((i) => ({
    transactionId: faker.finance.accountNumber(),
    amount: faker.finance.amount(),
    date: faker.date.past(),
    type: "withdrawal",
    accountId: null,
  }));
  return w;
}

let withdrawals = generateWithdrawals();
// // withdrawals = withdrawals.map((w) => ({
// //   ...w,
// //   accountId: account.accountNumber,
// // }));
const deposits = generateDeposits();
const transactions = [...deposits, ...withdrawals];

function generateDeposits() {
  const d = Array.from({ length: 100 }, (_, i) => i).map((i) => ({
    transactionId: faker.finance.accountNumber(),
    amount: faker.finance.amount(),
    date: faker.date.past(),
    type: "deposit",
    accountId: null,
  }));
  return d;
}

async function fetchData() {
  const response = await fetch(`${URL}`);
  const data = await response.json();
  return data;
}

export { generateData, fetchData, generateWithdrawals, generateDeposits };
