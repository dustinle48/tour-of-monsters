import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster';
import { MONSTERS} from '../monsters-list';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {
  monsters = MONSTERS;
  selectedMonster: Monster;

  constructor() { }

  ngOnInit() {
  }

  onSelect(monster: Monster): void {
    this.selectedMonster = monster;
  }

}
