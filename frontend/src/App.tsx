import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

const Layout = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
)};

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App