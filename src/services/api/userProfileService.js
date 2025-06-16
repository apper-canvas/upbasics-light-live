import userData from '@/services/mockData/userProfile.json';

class UserProfileService {
  constructor() {
    this.data = { ...userData };
  }

  async getProfile() {
    await this.delay();
    return { ...this.data };
  }

  async updateProfile(updates) {
    await this.delay();
    this.data = { ...this.data, ...updates };
    return { ...this.data };
  }

  async updateProgress(lessonId, progress) {
    await this.delay();
    this.data.currentProgress = {
      ...this.data.currentProgress,
      [lessonId]: progress
    };
    return { ...this.data };
  }

  async markLessonCompleted(lessonId) {
    await this.delay();
    if (!this.data.completedLessons.includes(lessonId)) {
      this.data.completedLessons.push(lessonId);
    }
    return { ...this.data };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export default new UserProfileService();