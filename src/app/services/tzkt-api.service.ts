import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TzktAPIService {

  url: string = "https://api.mainnet.tzkt.io";

  constructor(private http: HttpClient) { }

  //gets 100 blocks in descending order based on levels
  getBlocks(): Observable<any> {
    return this.http.get(this.url + '/v1/blocks?sort.desc=level', { responseType: "json" });
  }

  getTransactions(level: number): Observable<any> {
    return this.http.get(this.url + '/v1/operations/transactions?level=' + level, { responseType: "json" });
  }

  getTransactionCount(level: number): Observable<any> {
    return this.http.get(this.url + '/v1/operations/transactions/count?level=' + level, { responseType: "json" });
  }
}
