import { Component, OnInit, Input } from '@angular/core';
import { IWeather } from '../request.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: IWeather[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
