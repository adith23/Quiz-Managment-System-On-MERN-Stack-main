import api from './api';

export const getAllQuizzes = async () => {
  const response = await api.get('/quizzes');
  return response.data;
};

export const getSessionDetails = async (sessionId) => {
  const response = await api.get(`/sessions/${sessionId}`);
  return response.data;
};
