import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-monster-search',
  templateUrl: './monster-search.component.html',
  styleUrls: [ './monster-search.component.css' ]
})
export class MonsterSearchComponent implements OnInit {
  monsters$: Observable<Monster[]>;
  private searchTerms = new Subject<string>();

  constructor(private monsterService: MonsterService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.monsters$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.monsterService.searchMonsters(term)),
    );
  }
}