import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import ThankYouScreen from './ThankYouScreen';
import ConfirmationDialog from './ConfirmationDialog';
import ErrorBoundary from './ErrorBoundary';
import { saveSurvey, getQuestions } from './api';
import './App.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSessionId(Date.now().toString());
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
    } catch (err) {
      setError('Failed to load questions. Please try again later.');
    }
  };

  const startSurvey = () => {
    setCurrentScreen('question');
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitSurvey = async () => {
    try {
      await saveSurvey({
        sessionId,
        answers,
        completed: true,
        timestamp: new Date().toISOString()
      });
      setCurrentScreen('thankYou');
    } catch (err) {
      setError('Failed to submit survey. Please try again.');
    }
  };

  const resetSurvey = () => {
    setCurrentScreen('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowConfirmation(false);
    setSessionId(Date.now().toString());
    setError(null);
  };

  useEffect(() => {
    if (currentScreen === 'thankYou') {
      const timer = setTimeout(resetSurvey, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <TransitionGroup>
          <CSSTransition
            key={currentScreen}
            classNames="fade"
            timeout={300}
          >
            <div>
              {currentScreen === 'welcome' && <WelcomeScreen onStart={startSurvey} />}
              {currentScreen === 'question' && questions.length > 0 && (
                <QuestionScreen
                  question={questions[currentQuestionIndex]}
                  totalQuestions={questions.length}
                  currentQuestionNumber={currentQuestionIndex + 1}
                  onAnswer={handleAnswer}
                  onNext={goToNextQuestion}
                  onPrevious={goToPreviousQuestion}
                  answer={answers[questions[currentQuestionIndex].id]}
                />
              )}
              {currentScreen === 'thankYou' && <ThankYouScreen />}
            </div>
          </CSSTransition>
        </TransitionGroup>
        {showConfirmation && (
          <ConfirmationDialog
            onConfirm={submitSurvey}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;