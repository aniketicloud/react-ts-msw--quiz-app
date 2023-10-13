import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { questionsApi } from "./constants";

const fetchQuestions = async (): Promise<void> => {
  const resp = await fetch(questionsApi);
  const questions = await resp.json();
  console.log(questions);
};

function App() {
  return (
    <>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions</p>
        <button onClick={fetchQuestions}>Fetch Questions</button>
      </Main>
    </>
  );
}

export default App;
