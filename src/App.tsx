import "./App.css";
import { questionsApi } from "./constants";

function App() {
  const fetchQuestions = async (): Promise<void> => {
    const resp = await fetch(questionsApi);
    const questions = await resp.json();
    console.log(questions);
  };

  return (
    <>
      <h1>Hi</h1>
      <button onClick={fetchQuestions}>Fetch questions</button>
    </>
  );
}

export default App;
