import { MessageService } from './message.service';
import { Monster } from './monster';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  private monstersUrl = 'api/monsters';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    

  getMonsters(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.monstersUrl)
      .pipe(
        tap(_ => this.log('fetched monsters')),
        catchError(this.handleError<Monster[]>('getMonsters', []))
      );
  }

  getMonsterNo404<Data>(id: number): Observable<Monster> {
    const url = `${this.monstersUrl}/?id=${id}`;
    return this.http.get<Monster[]>(url)
      .pipe(
        map(monsters => monsters[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} monster id=${id}`);
        }),
        catchError(this.handleError<Monster>(`getMonster id=${id}`))
      );
  }

  getMonster(id: number): Observable<Monster> {
    const url = `${this.monstersUrl}/${id}`;
    return this.http.get<Monster>(url).pipe(
      tap(_ => this.log(`fetched monster id=${id}`)),
      catchError(this.handleError<Monster>(`getMonster id=${id}`))
    );
  }
  
  searchMonsters(term: string): Observable<Monster[]> {
    if (!term.trim()) {
      // if not search term, return empty monster array.
      return of([]);
    }
    return this.http.get<Monster[]>(`${this.monstersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found monsters matching "${term}"`)),
      catchError(this.handleError<Monster[]>('searchMonsters', []))
    );
  }

  addMonster (monster: Monster): Observable<Monster> {
    return this.http.post<Monster>(this.monstersUrl, monster, this.httpOptions).pipe(
      tap((newMonster: Monster) => this.log(`added monster w/ id=${newMonster.id}`)),
      catchError(this.handleError<Monster>('addMonster'))
    );
  }

  deleteMonster (monster: Monster | number): Observable<Monster> {
    const id = typeof monster === 'number' ? monster : monster.id;
    const url = `${this.monstersUrl}/${id}`;

    return this.http.delete<Monster>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted monster id=${id}`)),
      catchError(this.handleError<Monster>('deleteMonster'))
    );
  }

  updateMonster (monster: Monster): Observable<any> {
    return this.http.put(this.monstersUrl, monster, this.httpOptions).pipe(
      tap(_ => this.log(`updated monster id=${monster.id}`)),
      catchError(this.handleError<any>('updateMonster'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MonsterService: ${message}`);
  }
}