import { useState } from 'react';

function GreetingDisplay({ fontSize, message}) {
  return <h1 style={{fontSize : fontSize}}>{message}</h1>
}

function SizeSelect({ increment, decrement}) {
  return (
    <ul style={{
      display: "flex",
      gap: "10px",
      alignSelf: 'center'
    }}>
      <li><button onClick={increment}>+</button></li>
      <li><button onClick={decrement}>-</button></li>
    </ul>
  )
}

function ClickHistory({ history, length, resetHistory }) {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h2>History - {length}</h2>
      <ul>
        {history.map((his, index) => <li key={index}><p>{his}</p></li>)}
      </ul>
      <button onClick={resetHistory}>Clear History</button>
    </section>
  )
}

function ThemeColor({ isDarkMode, setIsDarkMode}) {
  return(
    <button style={{
      alignSelf: 'center'
    }}
      onClick={() => {
        setIsDarkMode(state => !state)
    }}
    >{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</button>
  )
}

function LanguageSelect({currentGreeting, greeting, select, setHistory}) {
  const isActive = currentGreeting === greeting.message;
  return (
    <button style={{
        backgroundColor: isActive ? "limegreen" : "",
        color: isActive ? "black" : "",
        borderColor: isActive ? "green" : ""
      }}
      onClick={() => {
        select(greeting.message)
        if(!isActive) setHistory(his => [greeting.language, ...his].slice(0, 5));
      }
    }>{greeting.language}</button>
  )
}


function App() {
  let id = 1;
  const getId = () => id++;
  const greetings = [
    {id: getId(), language: 'Spanish', message: 'Buen día'},
    {id: getId(), language: 'Haitan Creole', message: 'Bon maten'},
    {id: getId(), language: 'Portuguese', message: 'Bom dia'},
    {id: getId(), language: 'French', message: 'Bonjour'},
    {id: getId(), language: 'Japanese', message: 'おはよう'},
  ];
  const [currentGreeting, setCurrentGreeting] = useState("Good Morning");
  const [currentFontSize, setCurrentFontSize] = useState(50);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true)
  const increment = () => {if(currentFontSize < 72)setCurrentFontSize(currentFontSize + 2)};
  const decrement = () => {if(currentFontSize > 12)setCurrentFontSize(currentFontSize- 2)};
  const resetHistory = () => {
    setCurrentGreeting("Good Morning");
    setHistory([]);
  };
  return (
    <main className={isDarkMode ? "dark" : "light"}>
      <ThemeColor isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <GreetingDisplay fontSize={currentFontSize} message={currentGreeting} />
      <div style={{
        display:'flex',
        flexDirection:'column',
        gap: '40px',
      }}>
        <SizeSelect increment={increment} decrement={decrement}/>
        <ul style={{
          display: "flex",
          gap: "10px",
          alignSelf: 'center'
        }}>
          {greetings.map(greeting => <li key={greeting.id}><LanguageSelect currentGreeting={currentGreeting} greeting={greeting} select={setCurrentGreeting} setHistory={setHistory} /></li>)}
        </ul>
      <ClickHistory history={history} setHistory={setHistory} length={history.length} resetHistory={resetHistory}/>
      </div>
    </main>
  )
}

export default App