import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { QuizContext } from "./contexts/QuizContext";

function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <QuizContext />
      </Main>
    </div>
  );
}

export default App;
