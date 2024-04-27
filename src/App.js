import "./App.css";
import hotBg from "./assets/hot.avif";
import coldBg from "./assets/cold.png";
import weatherIcon from "./assets/weather-app.png";
import Descriptions from "./components/Descriptions";

function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(${coldBg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input type="text" name="city" placeholder="Enter City..." />
            <button>°C</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>Nairobi, City</h3>
              <img className="icon-img" src={weatherIcon} alt="weatherIcon" />
              <h3>Cloudy</h3>
            </div>
            <div className="temperature">
              <h1> 34 °C</h1>
            </div>
          </div>

          {/* botton description */}
          <Descriptions />
        </div>
      </div>
    </div>
  );
}

export default App;
