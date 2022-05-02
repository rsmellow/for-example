import './App.css';
import { Link, Outlet } from 'react-router-dom'


function App() {
  return (
    <div className="App">
    <h1>The Ledger App</h1>
    <nav>
      <Link to="/expenses">Expenses</Link> | {' '}
      <Link to="/income">Income</Link>
    </nav>
    <Outlet />
    </div>
  );
}

export default App;
