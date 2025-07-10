import { numberAttribute } from "@angular/core";

export class Metar {

    icao: string;
    day: number;
    hour: number;
    wind: number;
    infos: string;
    temp: number;
    dew_point: number;
    qnh: number;
    id?: number;

    constructor(

        icao: string,
        day: number,
        hour: number,
        wind: number,
        infos: string,
        temp: number,
        dew_point: number,
        qnh: number,
        id?: number,

    ) {

        this.id = id;
        this.icao = icao;
        this.day = day;
        this.hour = hour;
        this.wind = wind;
        this.infos = infos;
        this.temp = temp;
        this.dew_point = dew_point;
        this.qnh = qnh;

    }
}