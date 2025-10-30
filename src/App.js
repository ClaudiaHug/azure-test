import logo from './dsm_firmenich_Logo.jpg';
import './App.css';

function MyButton() {
  return (
    <button
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px',
      }}
    >
      Click here
    </button>
  );
}

function App() {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: '250px', marginBottom: '30px' }}
      />
      <h1 style={{ fontSize: '20px', marginBottom: '10px'}}>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}

export default App;