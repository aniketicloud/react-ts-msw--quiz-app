import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { QuizContext } from "./contexts/QuizContext";

function App() {
  return (
    <>
      <Header />
      <Main>
        <QuizContext />
      </Main>
    </>
  );
}

export default App;
