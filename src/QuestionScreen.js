import React from 'react';

const QuestionScreen = ({
    question,
    totalQuestions,
    currentQuestionNumber,
    onAnswer,
    onNext,
    onPrevious,
    answer
}) => {
    const handleChange = (event) => {
        onAnswer(question.id, event.target.value);
    };

    return (
        <div className="question-screen">
            <h2>Question {currentQuestionNumber}/{totalQuestions}</h2>
            <p>{question.text}</p>
            {question.type === 'rating' ? (
                <div className="rating" role="group" aria-label={`Rating from ${question.min} to ${question.max}`}>
                    {[...Array(question.max - question.min + 1)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onAnswer(question.id, (index + question.min).toString())}
                            className={answer === (index + question.min).toString() ? 'selected' : ''}
                            aria-pressed={answer === (index + question.min).toString()}
                        >
                            {index + question.min}
                        </button>
                    ))}
                </div>
            ) : (
                <textarea
                    value={answer || ''}
                    onChange={handleChange}
                    placeholder="Type your answer here..."
                    aria-label="Your answer"
                />
            )}
            <div className="navigation">
                <button onClick={onPrevious} disabled={currentQuestionNumber === 1} aria-label="Previous Question">Previous</button>
                <button onClick={onNext} aria-label={currentQuestionNumber === totalQuestions ? 'Finish Survey' : 'Next Question'}>
                    {currentQuestionNumber === totalQuestions ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default QuestionScreen;