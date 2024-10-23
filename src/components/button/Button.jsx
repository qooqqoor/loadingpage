
const Button = ({ validObj, text, onClick }) => {
  return (
    <button
      className={`w-full mt-3 rounded-2 flex items-center justify-center px-2 h-11 text-a19
              ${Object.values(validObj).every(value => value === true)
        ? 'bg-e08 bg-gradient-to-t from-b02-1 to-b02-2 '
        : 'bg-e11'}`}
      disabled={!Object.values(validObj).every(value => value === true)}
      onClick={onClick}
    >
      {text}
    </button>
  )

}

export default Button