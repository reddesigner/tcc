import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataServiceProjetos implements InMemoryDbService {

  createDb() {
    const projetos = [
      { _id: 1, name: 'Valorize' },
      { _id: 2, name: 'Checklist' },
      { _id: 3, name: 'Design Clinic' },
      { _id: 4, name: 'Central de Competências' },
      { _id: 5, name: 'Agile UX' },
      { _id: 6, name: 'Lean UX' }
    ];
    return {projetos};
  }

}
