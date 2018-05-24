import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const projetos = [
      { id: 1, name: 'Valorize' },
      { id: 2, name: 'Checklist' },
      { id: 3, name: 'Design Clinic' },
      { id: 4, name: 'Central de Competências' },
      { id: 5, name: 'Agile UX' },
      { id: 6, name: 'Lean UX' }
    ];

    const usuarios = [
      { id: 1, name: 'Marcelo Tampico', email: 'mt@email.com' },
      { id: 2, name: 'Marcos Palmiere', email: 'palmiere@email.com' },
      { id: 3, name: 'Denis Santos Jr.', email: 'denisjr@email.com' },
      { id: 4, name: 'Teodoro Santos', email: 'ts@email.com' },
      { id: 5, name: 'Antonio Ognaka Cruz', email: 'ognaka@email.com' },
      { id: 6, name: 'Selina Macedo', email: 'selina@email.com' },
      { id: 7, name: 'Ana Maria Oliveira', email: 'anaoliveira@email.com' },
      { id: 8, name: 'Samuel Nogueira', email: 'samuel.nogueira@email.com' },
      { id: 9, name: 'Alberto Santos Sletrin', email: 'ass@email.com' },
      { id: 10, name: 'Denise Matinnaro', email: 'dmatin@email.com' },
      { id: 11, name: 'Pitágoras Silva', email: 'pitagoras@email.com' },
      { id: 12, name: 'Aline Moreira Sales', email: 'alinems@email.com' },
      { id: 13, name: 'Marcos Santiago Silveira', email: 'marcos.santiago@email.com' }
    ];

    const indicadores = [
      { id: 1, name: 'Tempo corrido' },
      { id: 2, name: 'Recursos' },
      { id: 3, name: 'Produtividade' },
      { id: 4, name: 'Equipamento' }
    ];

    return { projetos, usuarios, indicadores };
  }

}

