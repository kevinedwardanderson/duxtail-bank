import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';

function NewAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('Checking');

  const inputStyle = 'w-2/3 rounded-md bg-slate-100 py-4 pl-4';

  const URL = 'http://localhost:9000/accountData';

  async function createNewAccount(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      // credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newAccount = {
      accountNumber: faker.finance.accountNumber(),
      accountName: `Personal ${accountType} Account`,
    };
    createNewAccount(URL, newAccount);
  }

  return (
    <form className="mt-24 flex flex-col gap-6 px-6" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <label htmlFor="firstName">First Name</label>
        <input
          className={`${inputStyle}`}
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="lastName">Last Name</label>
        <input
          className={`${inputStyle}`}
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="email">Email</label>
        <input
          className={`${inputStyle}`}
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="phone">Phone Number</label>
        <input
          className={`${inputStyle}`}
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="accountType">Account Type</label>
        <select
          className={`${inputStyle}`}
          id="accountType"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option>Checking</option>
          <option>Savings</option>
        </select>
      </div>
      <div className="absolute top-[30rem] flex min-w-[21rem] justify-between">
        <Link to="/">
          <button
            className="mt-10 flex items-center justify-center rounded-md bg-red-400
            px-8 py-3 text-slate-50"
          >
            Cancel
          </button>
        </Link>
        <button
          className={`mt-10 flex items-center justify-center rounded-md px-8
             py-3 text-slate-50 ${!accountType ? 'bg-blue-100' : 'bg-blue-600'}`}
        >
          Create account
        </button>
      </div>
    </form>
  );
}

export default NewAccount;
