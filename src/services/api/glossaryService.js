import glossaryData from '@/services/mockData/glossary.json';

class GlossaryService {
  constructor() {
    this.data = [...glossaryData];
  }

  async getAll() {
    await this.delay();
    return [...this.data];
  }

  async getById(id) {
    await this.delay();
    const term = this.data.find(item => item.Id === parseInt(id));
    return term ? { ...term } : null;
  }

  async getByDomain(domain) {
    await this.delay();
    return this.data.filter(term => term.domain === domain).map(term => ({ ...term }));
  }

  async search(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    return this.data.filter(term => 
      term.term.toLowerCase().includes(searchTerm) ||
      term.simpleDefinition.toLowerCase().includes(searchTerm)
    ).map(term => ({ ...term }));
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }
}

export default new GlossaryService();