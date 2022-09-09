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

  //gets blocks per page based on index and page size
  getBlocksPaged(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + '/v1/blocks?sort.desc=level&offset='+pageIndex*pageSize+'&limit='+pageSize, { responseType: "json" });
  }

  //gets the total number of existing blocks
  getTotalBlocks(): Observable<any> {
    return this.http.get(this.url + '/v1/blocks/count', { responseType: "json" });
  }

  //gets 100 transactions from a level
  getTransactions(level: number): Observable<any> {
    return this.http.get(this.url + '/v1/operations/transactions?level=' + level, { responseType: "json" });
  }

  //gets transactions paged
  getTransactionsPaged(level: number, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + '/v1/operations/transactions?level=' + level +'&offset='+pageIndex*pageSize+'&limit='+pageSize, { responseType: "json" });
  }

  //gets number of total transactions from a level
  getTransactionCount(level: number): Observable<any> {
    return this.http.get(this.url + '/v1/operations/transactions/count?level=' + level, { responseType: "json" });
  }
}
