import { Component, AfterViewInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map, mergeMap } from 'rxjs/operators';

import { TzktAPIService } from 'src/app/services/tzkt-api.service';

@Component({
  selector: 'app-blocks-table',
  templateUrl: './blocks-table.component.html',
  styleUrls: ['./blocks-table.component.scss']
})
export class BlocksTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['level', 'proposerali', 'proposeradr', 'transactions', 'timestamp'];
  dataSource = new MatTableDataSource;

  blocks: any;

  isLoadingResults: boolean = true;

  logging: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private tzkt: TzktAPIService, private router: Router) { }

  ngAfterViewInit(): void {
    this.isLoadingResults = true
    //get total number of block to set the total size of paginator
    this.tzkt.getTotalBlocks().subscribe({
      next: totalBlocks => {
        if (this.logging) { console.log(totalBlocks) }
        this.paginator.length = totalBlocks
      },
      error: error => {
        console.log(error)
      }
    })

    //load first blocks
    this.tzkt.getBlocksPaged(this.paginator.pageIndex, this.paginator.pageSize).pipe(
      //for each block I am getting the transaction number and adding to to that block
      mergeMap(blocks => forkJoin(
        blocks.map(block =>
          //calls to the api to get the transaction number from that level
          this.tzkt.getTransactionCount(block.level).pipe(
            map(transactions => ({
              ...block,
              transactions: transactions
            }))
          )
        )
      ))
    ).subscribe({
      next: blocks => {
        if (this.logging) { console.log(blocks) }
        this.blocks = blocks
        this.dataSource = new MatTableDataSource(this.blocks)
        this.isLoadingResults = false
      },
      error: error => {
        console.log(error)
      }
    })
  }

  //on page event load new blocks based on page index and size
  getPagedBlocks(event: PageEvent) {
    this.isLoadingResults = true

    this.tzkt.getBlocksPaged(event.pageIndex, event.pageSize).pipe(
      //for each block I am getting the transaction number and adding to to that block
      mergeMap(blocks => forkJoin(
        blocks.map(block =>
          //calls to the api to get the transaction number from that level
          this.tzkt.getTransactionCount(block.level).pipe(
            map(transactions => ({
              ...block,
              transactions: transactions
            }))
          )
        )
      ))
    ).subscribe({
      next: blocks => {
        if (this.logging) { console.log(blocks) }
        this.blocks = blocks
        this.dataSource = new MatTableDataSource(this.blocks)
        this.isLoadingResults = false
      },
      error: error => {
        console.log(error)
      }
    })
    return event
  }

  openDetails(row) {
    console.log(row.level)
    this.router.navigateByUrl('/details/' + row.level);
  }

}
