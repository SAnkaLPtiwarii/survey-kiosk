const STORAGE_KEY = 'survey_responses';

export const getQuestions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    text: 'How satisfied are you with our products?',
                    type: 'rating',
                    min: 1,
                    max: 5
                },
                {
                    id: 2,
                    text: 'How fair are the prices compared to similar retailers?',
                    type: 'rating',
                    min: 1,
                    max: 5
                },
                {
                    id: 3,
                    text: 'How satisfied are you with the value for money of your purchase?',
                    type: 'rating',
                    min: 1,
                    max: 5
                },
                {
                    id: 4,
                    text: 'On a scale of 1-10 how would you recommend us to your friends and family?',
                    type: 'rating',
                    min: 1,
                    max: 10
                },
                {
                    id: 5,
                    text: 'What could we do to improve our service?',
                    type: 'text'
                }
            ]);
        }, 500); // Simulate network delay
    });
};

export const saveSurvey = (survey) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const surveys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
                surveys.push(survey);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys));
                resolve({ success: true, message: 'Survey saved successfully' });
            } catch (error) {
                reject({ success: false, message: 'Failed to save survey', error });
            }
        }, 500); // Simulate network delay
    });
};

export const getSurveys = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const surveys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
                resolve(surveys);
            } catch (error) {
                reject({ success: false, message: 'Failed to retrieve surveys', error });
            }
        }, 500); // Simulate network delay
    });
};

export const clearSurveys = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                localStorage.removeItem(STORAGE_KEY);
                resolve({ success: true, message: 'All surveys cleared successfully' });
            } catch (error) {
                reject({ success: false, message: 'Failed to clear surveys', error });
            }
        }, 500); // Simulate network delay
    });
};