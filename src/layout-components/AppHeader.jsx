import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccounts } from '../features/accountList/accountsSlice';

function AppHeader() {
  const dispatch = useDispatch();
  return (
    <header className="fixed top-0 z-[100] row-start-1 flex w-full items-center justify-between bg-black px-4 py-3 uppercase text-gray-50">
      <Link to="/">
        <img
          src="src/assets/redux-logo.png"
          alt="redux logo"
          className="h-6"
        ></img>
      </Link>
      <span className="text-sm">
        Du<span className="text-xl font-extrabold text-emerald-600">X</span>
        Tail Bank
      </span>
      <span
        className="material-symbols-outlined"
        onClick={() => dispatch(fetchAccounts())}
      >
        menu
      </span>
      {/* <span className="material-symbols-outlined">account_circle</span> */}
    </header>
  );
}

export default AppHeader;
