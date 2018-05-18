import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const projetos = [
      { _id: 1, name: 'Valorize' },
      { _id: 2, name: 'Checklist' },
      { _id: 3, name: 'Design Clinic' },
      { _id: 4, name: 'Central de Competências' },
      { _id: 5, name: 'Agile UX' },
      { _id: 6, name: 'Lean UX' }
    ];

    const usuarios = [
      { _id: 1, name: 'Marcelo Tampico', email: 'mt@email.com' },
      { _id: 2, name: 'Marcos Palmiere', email: 'palmiere@email.com' },
      { _id: 3, name: 'Denis Santos Jr.', email: 'denisjr@email.com' },
      { _id: 4, name: 'Teodoro Santos', email: 'ts@email.com' },
      { _id: 5, name: 'Antonio Ognaka Cruz', email: 'ognaka@email.com' },
      { _id: 6, name: 'Selina Macedo', email: 'selina@email.com' },
      { _id: 7, name: 'Ana Maria Oliveira', email: 'anaoliveira@email.com' },
      { _id: 8, name: 'Samuel Nogueira', email: 'samuel.nogueira@email.com' },
      { _id: 9, name: 'Alberto Santos Sletrin', email: 'ass@email.com' },
      { _id: 10, name: 'Denise Matinnaro', email: 'dmatin@email.com' },
      { _id: 11, name: 'Pitágoras Silva', email: 'pitagoras@email.com' },
      { _id: 12, name: 'Aline Moreira Sales', email: 'alinems@email.com' },
      { _id: 13, name: 'Marcos Santiago Silveira', email: 'marcos.santiago@email.com' }
    ];

    const indicadores = [
      { _id: 1, name: 'Tempo corrido' },
      { _id: 2, name: 'Recursos' },
      { _id: 3, name: 'Produtividade' },
      { _id: 4, name: 'Equipamento' }
    ];

    return { projetos, usuarios, indicadores };
  }

}

