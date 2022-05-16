import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
function App() {
  return (
    <Router>
      <header>
        <Link to="/">Amazone</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
        </Routes>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </main>
    </Router>
  );
}

export default App;
