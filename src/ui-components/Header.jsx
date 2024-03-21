function Header({ children, type }) {
  const base =
    '  absolute w-full flex justify-between items-center px-6 py-4 text-[10px] font-bold uppercase ';

  const styles = {
    page: base + ' bg-slate-800 text-slate-50 ',
    section:
      base +
      ' border-b-2 border-blue-500 bg-slate-200/75 backdrop-blur text-slate-900 ',
  };

  return <header className={styles[type]}>{children}</header>;
}

export default Header;
