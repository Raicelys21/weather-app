import "./App.css";
import News from "./assets/components/newsDashboard";
import Weather from "./assets/components/weatherDashboard";

function App() {
  return (
    <>
      <div className="column2">
        <News />
        <Weather />
      </div>
    </>
  );
}

export default App;
