import { Outlet } from "react-router";
import styles from "./App.module.sass";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={styles.container}>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
