import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { QuizContext } from "./contexts/QuizContext";

function App() {
  return (
    <>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions</p>
        <QuizContext />
      </Main>
    </>
  );
}

export default App;
