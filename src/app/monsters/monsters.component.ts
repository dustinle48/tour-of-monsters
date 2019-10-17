import { Component, OnInit } from '@angular/core';

import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {
  monsters: Monster[];

  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.getMonsters();
  }

  getMonsters(): void {
    this.monsterService.getMonsters()
    .subscribe(monsters => this.monsters = monsters);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.monsterService.addMonster({ name } as Monster)
      .subscribe(monster => {
        this.monsters.push(monster);
      });
  }

  delete(monster: Monster): void {
    this.monsters = this.monsters.filter(h => h !== monster);
    this.monsterService.deleteMonster(monster).subscribe();
  }

}