import { Component, AfterViewInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map, mergeMap } from 'rxjs/operators';

import { TzktAPIService } from 'src/app/services/tzkt-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['level', 'proposerali', 'proposeradr', 'transactions','timestamp' ];
  dataSource = new MatTableDataSource;

  blocks: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private tzkt: TzktAPIService) { }

  ngAfterViewInit(): void {
    this.tzkt.getBlocks().pipe(
      //for each block I am getting the transaction number and adding to to that block
      mergeMap(blocks => forkJoin(
        blocks.map(block =>
          //calls to the api to get the transaction number from that level
          this.tzkt.getTransactionCount(block.level).pipe(
            map(transactions => ({
              ...block,
              transactions : transactions
            }))
          )
        )
      ))
    ).subscribe({
      next: blocks => {
        console.log(blocks)
        this.blocks = blocks
        this.dataSource = new MatTableDataSource(this.blocks)
        this.dataSource.paginator = this.paginator;
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
