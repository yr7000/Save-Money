import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

import Select from "react-select";
const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#00c29a" : null,
      color: "black",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

const options = [
  { value: "sent", label: "Sent", color: "#FD5D5D" },
  { value: "received", label: "Received", color: "#00c29a" },
];

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState([]);

  const { addDocument, response } = useFirestore("Transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name, amount, type, uid });
  };

  const handleChange = (options) => {
    setType(options);
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
      setType([]);
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount:</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <label>
          <Select
            options={options}
            placeholder="sent or received"
            styles={colourStyles}
            label="Single select"
            onChange={handleChange}
            value={type}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
