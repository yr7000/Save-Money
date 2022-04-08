import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollections } from "../../hooks/useCollections";
import styles from "./Home.module.css";

import TransactionForm from "./TransactionForm";
import TransactionList from "../../components/TransactionList";

export default function Home() {
  const { user, theme } = useAuthContext();
  const { documents, error } = useCollections(
    "Transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && (
          <TransactionList transactions={documents}></TransactionList>
        )}
      </div>
      <div className={theme === "dark" ? styles.sidebarDark : styles.sidebar}>
        <TransactionForm uid={user.uid}></TransactionForm>
      </div>
    </div>
  );
}
