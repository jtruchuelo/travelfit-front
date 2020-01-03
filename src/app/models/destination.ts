import {Poi} from "./poi";

export class Destination {
  constructor(
    public id: number,
    public location: number[],
    public name: string,
    public idApi: string,
    public startDate: Date,
    public endDate: Date,
    public photo: string,
    public pois: Array<Poi>,
    public itinerary_id: string,
  ){}
}
