import { Injectable } from '@angular/core';
import { IForm } from './form/form.component';

export interface IWeather {
  temperature: number;
  isRedisData: boolean;
}

export interface IResponse {
  data: Array<IWeather>
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor() {}

  async requestData(form: IForm): Promise<any> {
    let res: IResponse;
    res = (await fetch('http://localhost:3000/ps4/b', {
      method: 'POST',
      body: JSON.stringify(form),
    }).then((res) => res.json())) as IResponse;
    return res;
  }
}
