import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {

  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('question-paper.json')
    .then(response => response.json())
    .then(data => setQuizs(data))
  },[]);

  useEffect(() => {
    if(quizs.length > questionIndex){
      setQuestion(quizs[questionIndex]);
    }
  },[quizs, questionIndex]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }
  const checkAnswer = (event,selected) =>{
    if(!selectedAnswer){
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);
      if(selected === question.answer){
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      }else{
        event.target.classList.add('bg-danger');
      }
    }
  }
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove( 'bg-danger' );
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex+1);
  }
  
  const showTheResult = () => {
    setShowResult(true);
    setShowQuiz(false);
    setShowStart(false);
  }
  const startOver = () => {
    setShowResult(false);
    setShowStart(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove( 'bg-danger' );
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  return (
    <div className="App">
      <Start 
        startQuiz = {startQuiz}
        showStart = {showStart}
      />

      <Quiz
        showQuiz = {showQuiz}
        question = {question}
        quizs = {quizs}
        checkAnswer = {checkAnswer}
        questionIndex = {questionIndex}
        correctAnswer = {correctAnswer}
        selectedAnswer = {selectedAnswer}
        nextQuestion = {nextQuestion}
        showTheResult = {showTheResult}
      />
      <Result
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        startOver={startOver}
      />
      
    </div>
  );
}

export default App;
