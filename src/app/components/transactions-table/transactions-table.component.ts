import { Component, AfterViewInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  @Input() level: number;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private tzkt: TzktAPIService, private router: Router) { }

  ngAfterViewInit(): void {
    this.tzkt.getTransactions(this.level).subscribe({
      next: transactions => {
        console.log(transactions)
        this.transactions = transactions
        this.dataSource = new MatTableDataSource(this.transactions)
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
