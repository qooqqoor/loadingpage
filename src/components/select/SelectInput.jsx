import Input from "../input/Input.jsx";

const SelectInput =
  ( {
      label,
      type,
      value,
      onChange,
      extra,
      placeholder,
    }) => {
  return (
    <Input
      label={label}
      value={value}
      type={type}
      onChange={onChange}
      placeholder={'placeholder'}
      readOnly={true}
    />
  )
}

export default SelectInput;