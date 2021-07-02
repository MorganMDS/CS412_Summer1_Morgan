import { Component, OnInit } from '@angular/core';
import { IForm } from '../form/form.component';
import { IResponse, IWeather, RequestService } from '../request.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  list: IWeather[] = []
  constructor(private requestService: RequestService) { }

  async handleSubmit(form: IForm): Promise<void> {
    const res: IResponse = await this.requestService.requestData(form);
    if (res && Array.isArray(res.data)) {
      this.list = res.data;
    }
  }

  ngOnInit(): void {
  }

}
