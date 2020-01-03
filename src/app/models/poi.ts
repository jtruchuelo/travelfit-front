export class Poi {
  constructor(
    public id: number,
    public name: string,
    public idApi: string,
    public startDate: Date,
    public destination_id: string,
    public duration: number,
    public photo: string,
    public location: any,
    public description: string,
  ){}
}
