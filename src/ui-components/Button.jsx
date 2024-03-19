import { Link } from 'react-router-dom';

function Button({ active, onClick, text, type, size, to }) {
  const base = 'rounded-md flex justify-center items-center';

  const pVSs = active === text ? 'primary' : 'secondary';

  const styles = {
    // primary / secondary
    primary: base + ' bg-blue-600 text-slate-50 ',
    secondary: base + ' bg-blue-300 text-slate-50 ',

    // size
    small: base + ' px-3 py-2 ',
    large: base + ' py-3 px-6 ',

    // type
    cancel: base + ' bg-red-400 text-slate-50',
  };
  /*
"mt-10 flex items-center justify-center rounded-md bg-red-400
            px-8 py-3 text-slate-50"

            `mt-10 flex items-center justify-center rounded-md px-8
             py-3 text-slate-50 ${!amount ? 'bg-blue-100' : 'bg-blue-600'}`}


  */

  if (type === 'cancel')
    return (
      <Link to={to} className={styles[size] + styles[type]}>
        {text}
      </Link>
    );
  return (
    <button
      onClick={() => onClick(text)}
      className={styles[pVSs] + styles[size]}
    >
      {text}
    </button>
  );
}

export default Button;
