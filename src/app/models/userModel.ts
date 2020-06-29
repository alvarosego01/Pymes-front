export class _UserModelNatural {

  constructor(
    public email: string,
    public name?: string,
    public surname?: string,
    public year?: string,
    public pass?: string,
    public gender?: string,
    public typeId?: string,
    public identification?: string,
    public phone?: string,
    public celPhone?: string,
    public department?: string,
    public city?: string,
    public positionCompany?: string,
    public mapUrl?: string,
    public imgProfile?: string,
    public termsCondition?: string,
    public role?: string,
       public typeActivity?: any[],
       public negocioName?: string,
      //  public details?: any[],
    public receiveEmail?: string,
    public preference?: string,
    public status?: string,
    public created_at?: string,
    public updated_at?: string,
    public firstTime?: string,
    public verify?: string,


  ) {}

}


export class _pymeSchema{
  constructor(
    public nameCompany?: string,
    public nit?: string,
    public socialReason?: string,
    public direction?: string,
    public logo?: string,
    public typeActivity?: any[],
    public companyPhones?: any[],
  ){}
}

export class _UserModelCompany {
  constructor(

    public email: string,
    public name?: string,
    public surname?: string,
    public year?: string,
    public pass?: string,
    public gender?: string,
    public typeId?: string,
    public identification?: string,
    public phone?: string,
    public celPhone?: string,
    public department?: string,
    public city?: string,
    public positionCompany?: string,
    public mapUrl?: string,
    public termsCondition?: string,
    public role?: string,
    public dataPyme?: {
      nameCompany?: string,
      nit?: string,
      socialReason?: string,
      direction?: string,
      logo?: string
    },
    public companyPhones?: any[],
    public economicActivity?: any[],
    public receiveEmail?: string,
    public imgProfile?: string,
    public preference?: string,
    public status?: string,
    public created_at?: string,
    public updated_at?: string,
    public firstTime?: string,
    public verify?: string,

  ) {}
}

