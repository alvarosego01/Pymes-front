


export class _NotifyModel {
    constructor(
        public type: string,
        public idPost?: string,
        public idUser?: string,
        public idForeign?: string,
        public description?: string,
        public subject?: string,
        public link?: string,
        public created_at?: string,
    ) {}
  }