import {Destination} from "./destination";

export class Itinerary {
  constructor(
    public id: number,
    public name: string,
    public createdDate: Date,
    public startDate: Date,
    public endDate: Date,
    public isPublic: boolean,
    public user_id: number,
    public user_name: string,
    public destinations: Array<Destination>
  ){}
}
