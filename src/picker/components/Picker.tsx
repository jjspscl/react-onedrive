import { usePicker } from "../picker.hook";


const Picker = () => {
  const { options } = usePicker();
  return (
    <div>
      <h1>Picker</h1>
      <span>
        {JSON.stringify(options)}
      </span>
    </div>
  );
};

export default Picker;