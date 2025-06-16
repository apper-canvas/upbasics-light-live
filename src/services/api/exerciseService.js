import exercisesData from '@/services/mockData/exercises.json';

class ExerciseService {
  constructor() {
    this.data = [...exercisesData];
  }

  async getAll() {
    await this.delay();
    return [...this.data];
  }

  async getById(id) {
    await this.delay();
    const exercise = this.data.find(item => item.Id === parseInt(id));
    return exercise ? { ...exercise } : null;
  }

  async getByLessonId(lessonId) {
    await this.delay();
    return this.data.filter(exercise => exercise.lessonId === parseInt(lessonId)).map(exercise => ({ ...exercise }));
  }

  async submitAnswer(exerciseId, answer) {
    await this.delay();
    const exercise = this.data.find(item => item.Id === parseInt(exerciseId));
    if (!exercise) return null;

    const isCorrect = this.checkAnswer(exercise, answer);
    return {
      correct: isCorrect,
      feedback: isCorrect ? exercise.feedback.correct : exercise.feedback.incorrect
    };
  }

  checkAnswer(exercise, answer) {
    if (exercise.type === 'multiple-choice') {
      return answer === exercise.correctAnswer;
    } else if (exercise.type === 'drag-drop') {
      return JSON.stringify(answer.sort()) === JSON.stringify(exercise.correctAnswer.sort());
    } else if (exercise.type === 'tap-sequence') {
      return JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer);
    }
    return false;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export default new ExerciseService();