import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="fixed bottom-0 z-[100] row-start-1 flex w-dvw items-center justify-between bg-emerald-500 px-6 py-3 uppercase text-gray-50">
      <Link to="transfers">
        <img
          className="my-1 h-5 w-6"
          src="src/assets/transfer.png"
          alt="transfer"
        />
      </Link>
      <span className="text-sm">Pay Bill</span>
      <span className="text-sm">Chat</span>
    </footer>
  );
}

export default Footer;
