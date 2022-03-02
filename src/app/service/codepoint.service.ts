import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as Papa from "papaparse";

import { Material } from '../material/shared/material.model';
import { Codepoint } from '../material/shared/codepoint.model';



@Injectable({
  providedIn: 'root'
})

export class CodepointService {

  private codepointUrl: string = 'assets/codepoints.csv';

  private codepoints: Codepoint[];

  constructor(private http: HttpClient) { }

  // load codepoint csv and store in Codepoints[]
  private loadCodepoint(): Observable<Codepoint[]> {
    return new Observable(observer => {
      Papa.parse(this.codepointUrl, {
        download: true,
        header: true,
        complete: function(results, file) {
          this.codepoints = new Array();
          // initialize the array
          for (var o of results.data) {
            // constructor each json to Codepoint
            this.codepoints.push(Codepoint.fromJson(o));
          }
          // delivery the value to subscribers
          observer.next(this.codepoints);
        },
        error: function(err, file, inputElem, reason) {
          console.log(reason);
        }
      })
    });
  }

  getCodepoints(): Observable<Codepoint[]> {
    if (this.codepoints) {
      // if codepoints is loaded, return it
      return of(this.codepoints);
    } else {
      // otherwise, subscribe it
      return this.loadCodepoint();
    }
  }

  getCodepoint(name: string): Observable<Codepoint> {
    return this.getCodepoints().pipe(
      map(codepoints => codepoints.find(cp => cp.name === name)!)
    );
  }

  getIndexedCodepoint(index: number): Observable<Codepoint> {
    return this.getCodepoints().pipe(
      map(codepoints => codepoints.find(cp => cp.index === index)!)
    );
  }

}
