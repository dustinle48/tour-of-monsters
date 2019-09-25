import { Component, OnInit, Input } from '@angular/core';
import { Monster} from '../monster';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.css']
})
export class MonsterDetailComponent implements OnInit {
  @Input() monster: Monster;

  constructor() { }

  ngOnInit() {
  }

}
