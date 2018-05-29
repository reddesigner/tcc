export class Projeto {
  _id: string;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  datePrevision: Date;
  status: string;
  justification: String;
  dateChangeStatus: Date;
  userChangeStatus: any;
  description: string;
  budget: Number;
  risk: String;
  actualPhase: Number;
  phases: any;
  indicators: any[];
  team: any[]
}
