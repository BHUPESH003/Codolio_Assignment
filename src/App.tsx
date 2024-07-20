import React from "react";
import Header from "./components/Header";
import TransactionManager from "./components/Transactionsmanager";

const App: React.FC = () => {
  return (
    <div className="container-fluid m-0 p-0">
      <Header />

      <div>
        <TransactionManager />
      </div>
    </div>
  );
};

export default App;
