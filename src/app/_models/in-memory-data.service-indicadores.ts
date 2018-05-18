import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataServiceIndicadores implements InMemoryDbService {

  createDb() {
    const indicadores = [
      { _id: 1, name: 'Tempo corrido' },
      { _id: 2, name: 'Recursos' },
      { _id: 3, name: 'Produtividade' },
      { _id: 4, name: 'Equipamento' }
    ];
    return {indicadores};
  }

}

