import {Poi} from "./poi";

export class Destination {
  constructor(
    public destination_id: number,
    public name: string,
    public idApi: string,
    public startDate: Date,
    public endDate: Date,
    public pois: Poi[]
  ){}
}
