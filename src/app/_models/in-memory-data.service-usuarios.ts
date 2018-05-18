import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const usuarios = [
      { _id: 1, name: 'Marcelo Tampico' },
      { _id: 2, name: 'Marcos Palmiere' },
      { _id: 3, name: 'Denis Santos Jr.' },
      { _id: 4, name: 'Teodoro Santos' },
      { _id: 5, name: 'Antonio Ognaka Cruz' },
      { _id: 6, name: 'Selina Macedo' },
      { _id: 7, name: 'Ana Maria Oliveira' },
      { _id: 8, name: 'Samuel Nogueira' },
      { _id: 9, name: 'Alberto Santos Sletrin' },
      { _id: 10, name: 'Denise Matinnaro' },
      { _id: 11, name: 'Pitágoras Silva' },
      { _id: 12, name: 'Aline Moreira Sales' },
      { _id: 13, name: 'Marcos Santiago Silveira' }
    ];
    return {usuarios};
  }

}


