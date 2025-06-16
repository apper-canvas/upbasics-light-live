import lessonsData from '@/services/mockData/lessons.json';

class LessonService {
  constructor() {
    this.data = [...lessonsData];
  }

  async getAll() {
    await this.delay();
    return [...this.data];
  }

  async getById(id) {
    await this.delay();
    const lesson = this.data.find(item => item.Id === parseInt(id));
    return lesson ? { ...lesson } : null;
  }

  async getByDomain(domain) {
    await this.delay();
    return this.data.filter(lesson => lesson.domain === domain).map(lesson => ({ ...lesson }));
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 400));
  }
}

export default new LessonService();