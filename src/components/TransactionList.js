import styles from "./TransactionList.module.css";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";
export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("Transactions");
  const { theme } = useAuthContext();
  return (
    <div className={styles}>
      <ul
        className={
          theme === "light" ? styles.transactions : styles.transactionsDark
        }
      >
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            {transaction.type.value === "sent" && (
              <p
                className={styles.amount}
                style={{ color: transaction.type.color }}
              >
                {transaction.amount}
              </p>
            )}
            {transaction.type.value === "received" && (
              <p
                className={styles.amount}
                style={{ color: transaction.type.color }}
              >
                {transaction.amount}
              </p>
            )}
            <button onClick={() => deleteDocument(transaction.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
