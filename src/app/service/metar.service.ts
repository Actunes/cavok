import { Injectable } from '@angular/core';
import { Metar } from "../models/metar";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class MetarService extends Dexie{

  metar: Dexie.Table<Metar,number>;

  constructor() {
    super('MetarDB');
    this.version(1).stores({
      metar: '++id, ' +
               'icao,' +
               'day,' +
               'hour,' +
               'wind,' +
               'infos,' +
               'temp,' +
               'dew_point,' +
               'qnh'
    });
    this.metar = this.table('metar')
  }

  async searchMetar(): Promise<Metar[]> {
    return await this.metar.toArray();
  }

  async addMetar(metar: Metar): Promise<number>{
    return await this.metar.add(metar);
  }

  async removeMetar(id: number): Promise<void> {
    return await this.metar.delete(id);
  }

  async updateMetar(id:number, metar: Metar)
    : Promise<number>{
     return await this.metar.update(id, metar);
  }
}