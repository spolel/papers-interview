import { Component, AfterViewInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map, mergeMap } from 'rxjs/operators';

import { TzktAPIService } from 'src/app/services/tzkt-api.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['sender', 'target', 'amount', 'status'];
  dataSource = new MatTableDataSource;

  transactions: any;

  isLoadingResults = true;

  logging: boolean = false;

  @Input() level: number;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private tzkt: TzktAPIService, private router: Router) { }

  ngAfterViewInit(): void {
    this.isLoadingResults = true

    //get total number of block to set the total size of paginator
    this.tzkt.getTransactionCount(this.level).subscribe({
      next: tcount => {
        if (this.logging) { console.log(tcount) }
        this.paginator.length = tcount
      },
      error: error => {
        console.log(error)
      }
    })

    this.tzkt.getTransactionsPaged(this.level, this.paginator.pageIndex, this.paginator.pageSize).subscribe({
      next: transactions => {
        if (this.logging) { console.log(transactions) }
        this.transactions = transactions
        this.dataSource = new MatTableDataSource(this.transactions)
        //this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getPagedTransactions(event: PageEvent){
    this.isLoadingResults = true

    this.tzkt.getTransactionsPaged(this.level, event.pageIndex, event.pageSize).subscribe({
      next: transactions => {
        if (this.logging) { console.log(transactions) }
        this.transactions = transactions
        this.dataSource = new MatTableDataSource(this.transactions)
        //this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false
      },
      error: error => {
        console.log(error)
      }
    })
    return event
  }

}
