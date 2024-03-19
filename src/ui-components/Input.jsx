function Input({ labelText, type, id, value, placeholder, onChange }) {
  return (
    <>
      {labelText && (
        <label htmlFor={id} className="w-1/3">
          {labelText}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        className="w-2/3 rounded-md bg-slate-100 py-4 pl-4"
        onChange={onChange}
      />
    </>
  );
}

export default Input;
