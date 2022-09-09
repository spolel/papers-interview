import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatRowHarness, MatTableHarness } from '@angular/material/table/testing';

import { BlocksTableComponent } from './blocks-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TzktAPIService } from 'src/app/services/tzkt-api.service';
import { Observable, of } from 'rxjs';

describe('BlocksTableComponent', () => {
  let component: BlocksTableComponent;
  let fixture: ComponentFixture<BlocksTableComponent>;
  let loader: HarnessLoader;

  let table: MatTableHarness;
  let paginator: MatPaginatorHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlocksTableComponent],
      imports: [HttpClientTestingModule, MatTableModule, MatPaginatorModule, NoopAnimationsModule],
      providers: [{
        provide: TzktAPIService,
        useClass: MockAppService
      },],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlocksTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.componentInstance.ngAfterViewInit();
    fixture.detectChanges();

    table = await loader.getHarness(MatTableHarness)
    paginator = await loader.getHarness(MatPaginatorHarness)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('blocks table', async () => {
    it('should load data', async () => {
      expect(component.blocks.length).not.toEqual(0)
      expect(component.isLoadingResults).toBe(false);
    });

    it('should change the page size', async () => {
      await paginator.setPageSize(5)
      expect(await paginator.getPageSize()).toBe(5)
      let rows = await table.getRows()
      expect(rows.length).toBe(5)
      await paginator.setPageSize(10)
      expect(await paginator.getPageSize()).toBe(10)
      rows = await table.getRows()
      expect(rows.length).toBe(10)
      await paginator.setPageSize(25)
      expect(await paginator.getPageSize()).toBe(25)
      rows = await table.getRows()
      expect(rows.length).toBe(25)
    })

    it('should change page forward', async () => {
      let celltext = await table.getCellTextByColumnName()
      await paginator.goToNextPage()
      let newCelltext = await table.getCellTextByColumnName()
      //console.log(await table.getCellTextByColumnName())
      expect(celltext).not.toEqual(newCelltext);
    });

    it('should change page backward', async () => {
      await paginator.goToNextPage()
      let celltext = await table.getCellTextByColumnName()
      await paginator.goToPreviousPage()
      let newCelltext = await table.getCellTextByColumnName()
      //console.log(await table.getCellTextByColumnName())
      expect(celltext).not.toEqual(newCelltext);
    });

    // it('should reroute to details page when a row is clicked', async () => {
    //   let row = await loader.getHarness(MatRowHarness)
    //   console.log(await row.getCellTextByColumnName())
    //   //await row.click();
    // });

  });

});

class MockAppService{
  getBlocks(): Observable<any> {
    return of(testBlocks);
  }

  getTransactionCount(): Observable<any> {
    return of([222]);
  }

  getTotalBlocks(): Observable<any> {
    return of([testBlocks.length]);
  }

  getBlocksPaged(pageIndex: number, pageSize: number): Observable<any> {
    let i = pageIndex*pageSize;
    return of(testBlocks.slice(i,i+pageSize));
  }
}


const testBlocks = [
  {
    "cycle": 522,
    "level": 2693034,
    "hash": "BMdYMyhC1d4MJChfZPcs3ABXgbFQ2NEqFqm9EQpYnhsKq2c95QP",
    "timestamp": "2022-09-08T17:03:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6963,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9840656,
    "fees": 66153,
    "nonceRevealed": false,
    "proposer": {
      "address": "tz1NortRftucvAkD1J58L32EhSVrQEWJCEnB"
    },
    "producer": {
      "address": "tz1NortRftucvAkD1J58L32EhSVrQEWJCEnB"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 322479786,
    "priority": 0,
    "baker": {
      "address": "tz1NortRftucvAkD1J58L32EhSVrQEWJCEnB"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322479786,
    "transactions": 121
  },
  {
    "cycle": 522,
    "level": 2693033,
    "hash": "BMVSMgPLzR5oGFc7sSnftCn6rpPER4taBua961yQT4xUDoiK8bg",
    "timestamp": "2022-09-08T17:03:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6949,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9780652,
    "fees": 88492,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "producer": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 322479786,
    "priority": 0,
    "baker": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322479786,
    "transactions": 155
  },
  {
    "cycle": 522,
    "level": 2693032,
    "hash": "BMK4muTdoSQBd34LSShRrBWQ2eV1Fj3Fv3bD997AytQSNEXKHJe",
    "timestamp": "2022-09-08T17:02:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6952,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9793510,
    "fees": 33694,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "producer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 322641106,
    "priority": 0,
    "baker": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322641106,
    "transactions": 68
  },
  {
    "cycle": 522,
    "level": 2693031,
    "hash": "BLHuitspunDyNKq2n7UqGaAEn1geJ58xgazjLvNS26SPP36E2pi",
    "timestamp": "2022-09-08T17:02:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6944,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9759222,
    "fees": 198777,
    "nonceRevealed": false,
    "proposer": {
      "alias": "PayTezos",
      "address": "tz1Ldzz6k1BHdhuKvAtMRX7h5kJSMHESMHLC"
    },
    "producer": {
      "alias": "PayTezos",
      "address": "tz1Ldzz6k1BHdhuKvAtMRX7h5kJSMHESMHLC"
    },
    "software": {
      "version": "v14.0",
      "date": "2022-07-29T15:08:26Z"
    },
    "lbToggleEma": 322641106,
    "priority": 0,
    "baker": {
      "alias": "PayTezos",
      "address": "tz1Ldzz6k1BHdhuKvAtMRX7h5kJSMHESMHLC"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322641106,
    "transactions": 117
  },
  {
    "cycle": 522,
    "level": 2693030,
    "hash": "BMaRQT6ZBWzjbKxtQsPdosgeXKiihq3G5kdPdCyyLXKwpBt6SuB",
    "timestamp": "2022-09-08T17:01:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6953,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9797796,
    "fees": 60362,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "producer": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 322641106,
    "priority": 0,
    "baker": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322641106,
    "transactions": 117
  },
  {
    "cycle": 522,
    "level": 2693029,
    "hash": "BLsXiapXeHxinBMX6yrb1aeNt3xxKX9UmYByjzT6Ed5Awjyy3HA",
    "timestamp": "2022-09-08T17:01:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6951,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9789224,
    "fees": 55263,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "producer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 322802507,
    "priority": 0,
    "baker": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322802507,
    "transactions": 92
  },
  {
    "cycle": 522,
    "level": 2693028,
    "hash": "BLJgDvvkjcMWvVmdE5VP1PH9oPD6ooSCfCqqw8wL56aLXfCHPtL",
    "timestamp": "2022-09-08T17:00:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6959,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9823512,
    "fees": 274779,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Binance Baker",
      "address": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2"
    },
    "producer": {
      "alias": "Binance Baker",
      "address": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 322802507,
    "priority": 0,
    "baker": {
      "alias": "Binance Baker",
      "address": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322802507,
    "transactions": 109
  },
  {
    "cycle": 522,
    "level": 2693027,
    "hash": "BM2XWuXcQVegcyKbb3f5mUy4Jxrj2bmxRv7omipJr6NWGqALvwY",
    "timestamp": "2022-09-08T17:00:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6961,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9832084,
    "fees": 3573736,
    "nonceRevealed": false,
    "proposer": {
      "address": "tz3iJu5vrKZcsqRPs8yJ61UDoeEXZmtro4qh"
    },
    "producer": {
      "address": "tz3iJu5vrKZcsqRPs8yJ61UDoeEXZmtro4qh"
    },
    "software": {
      "version": "v14.0",
      "date": "2022-07-29T15:08:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 322802507,
    "priority": 0,
    "baker": {
      "address": "tz3iJu5vrKZcsqRPs8yJ61UDoeEXZmtro4qh"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322802507,
    "transactions": 257
  },
  {
    "cycle": 522,
    "level": 2693026,
    "hash": "BL42MGYzEfDp9ztSdJBdR5tm7vsW6iAXGyXyZBgaiHLVHtYqZ1b",
    "timestamp": "2022-09-08T16:59:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6962,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9836370,
    "fees": 35355,
    "nonceRevealed": false,
    "proposer": {
      "alias": "P2P Validator",
      "address": "tz1P2Po7YM526ughEsRbY4oR9zaUPDZjxFrb"
    },
    "producer": {
      "alias": "P2P Validator",
      "address": "tz1P2Po7YM526ughEsRbY4oR9zaUPDZjxFrb"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 322963988,
    "priority": 0,
    "baker": {
      "alias": "P2P Validator",
      "address": "tz1P2Po7YM526ughEsRbY4oR9zaUPDZjxFrb"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322963988,
    "transactions": 49
  },
  {
    "cycle": 522,
    "level": 2693025,
    "hash": "BL7MYDEB1kWEdzMJD9EeFuYQ2ifyTbQmLRYJjwndsEdg99VCtb1",
    "timestamp": "2022-09-08T16:59:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6938,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9733506,
    "fees": 39803,
    "nonceRevealed": false,
    "proposer": {
      "address": "tz3gtoUxdudfBRcNY7iVdKPHCYYX6xdPpoRS"
    },
    "producer": {
      "address": "tz3gtoUxdudfBRcNY7iVdKPHCYYX6xdPpoRS"
    },
    "software": {
      "version": "v14.0",
      "date": "2022-07-29T15:08:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 322963988,
    "priority": 0,
    "baker": {
      "address": "tz3gtoUxdudfBRcNY7iVdKPHCYYX6xdPpoRS"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 322963988,
    "transactions": 74
  },
  {
    "cycle": 522,
    "level": 2693024,
    "hash": "BMKAWq499v354BMogzT1Umu3vyLJViV9M1RPTC5XGrkKZDVq3JX",
    "timestamp": "2022-09-08T16:58:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6956,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9810654,
    "fees": 45009,
    "nonceRevealed": false,
    "proposer": {
      "address": "tz3iJu5vrKZcsqRPs8yJ61UDoeEXZmtro4qh"
    },
    "producer": {
      "address": "tz3iJu5vrKZcsqRPs8yJ61UDoeEXZmtro4qh"
    },
    "software": {
      "version": "v14.0",
      "date": "2022-07-29T15:08:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 323125550,
    "priority": 0,
    "baker": {
      "address": "tz3iJu5vrKZcsqRPs8yJ61UDoeEXZmtro4qh"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323125550,
    "transactions": 80
  },
  {
    "cycle": 522,
    "level": 2693023,
    "hash": "BLE26WTyijq9up7sdcbkZY7qewhwVo9FAkvBFqRDJtiTqK3evGc",
    "timestamp": "2022-09-08T16:58:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6957,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9814940,
    "fees": 21411,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "producer": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 323287193,
    "priority": 0,
    "baker": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323287193,
    "transactions": 49
  },
  {
    "cycle": 522,
    "level": 2693022,
    "hash": "BLVKawwj1tfcR91SwdtzB3U33DDiQrdm9G34qsPYgj1BFH2u4rT",
    "timestamp": "2022-09-08T16:57:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6960,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9827798,
    "fees": 46506,
    "nonceRevealed": false,
    "proposer": {
      "alias": "StakeNow",
      "address": "tz1g8vkmcde6sWKaG2NN9WKzCkDM6Rziq194"
    },
    "producer": {
      "alias": "StakeNow",
      "address": "tz1g8vkmcde6sWKaG2NN9WKzCkDM6Rziq194"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 323448917,
    "priority": 0,
    "baker": {
      "alias": "StakeNow",
      "address": "tz1g8vkmcde6sWKaG2NN9WKzCkDM6Rziq194"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323448917,
    "transactions": 79
  },
  {
    "cycle": 522,
    "level": 2693021,
    "hash": "BKyFaVqFndQfw4NggKexTC4s6kfjEZ7UpSioWGBxDT8KzMVyiZH",
    "timestamp": "2022-09-08T16:57:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6947,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9772080,
    "fees": 34680,
    "nonceRevealed": false,
    "proposer": {
      "alias": "EcoTez",
      "address": "tz3e7LbZvUtoXhpUD1yb6wuFodZpfYRb9nWJ"
    },
    "producer": {
      "alias": "EcoTez",
      "address": "tz3e7LbZvUtoXhpUD1yb6wuFodZpfYRb9nWJ"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 323610722,
    "priority": 0,
    "baker": {
      "alias": "EcoTez",
      "address": "tz3e7LbZvUtoXhpUD1yb6wuFodZpfYRb9nWJ"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323610722,
    "transactions": 76
  },
  {
    "cycle": 522,
    "level": 2693020,
    "hash": "BLS9kXKM4mE61WKLEv9jh1QFatbuqfhzx9rQ7XBowHVPoTPTY6D",
    "timestamp": "2022-09-08T16:56:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6956,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9810654,
    "fees": 31673,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "producer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 323610722,
    "priority": 0,
    "baker": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323610722,
    "transactions": 60
  },
  {
    "cycle": 522,
    "level": 2693019,
    "hash": "BMXeUN61giLbYwuoYYvjYiZU886ruuirYHYHU3NcsyE8fn1MR7Z",
    "timestamp": "2022-09-08T16:56:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6968,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9862086,
    "fees": 61645,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "producer": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 323610722,
    "priority": 0,
    "baker": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323610722,
    "transactions": 66
  },
  {
    "cycle": 522,
    "level": 2693018,
    "hash": "BLa1L7qjF56d5vn154942xEvYm854FrsPXDuutATTPWyRGYbief",
    "timestamp": "2022-09-08T16:55:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6954,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9802082,
    "fees": 62403,
    "nonceRevealed": false,
    "proposer": {
      "address": "tz3RKYFsLuQzKBtmYuLNas7uMu3AsYd4QdsA"
    },
    "producer": {
      "address": "tz3RKYFsLuQzKBtmYuLNas7uMu3AsYd4QdsA"
    },
    "software": {
      "version": "v14.0",
      "date": "2022-07-29T15:08:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 323772608,
    "priority": 0,
    "baker": {
      "address": "tz3RKYFsLuQzKBtmYuLNas7uMu3AsYd4QdsA"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323772608,
    "transactions": 83
  },
  {
    "cycle": 522,
    "level": 2693017,
    "hash": "BLRdQEtZfAVgsrDMj99cSuZDv6edfwFDKaURKC7Um7J73GVapWS",
    "timestamp": "2022-09-08T16:55:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6969,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9866372,
    "fees": 48590,
    "nonceRevealed": false,
    "proposer": {
      "address": "tz3gtoUxdudfBRcNY7iVdKPHCYYX6xdPpoRS"
    },
    "producer": {
      "address": "tz3gtoUxdudfBRcNY7iVdKPHCYYX6xdPpoRS"
    },
    "software": {
      "version": "v14.0",
      "date": "2022-07-29T15:08:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 323934575,
    "priority": 0,
    "baker": {
      "address": "tz3gtoUxdudfBRcNY7iVdKPHCYYX6xdPpoRS"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 323934575,
    "transactions": 97
  },
  {
    "cycle": 522,
    "level": 2693016,
    "hash": "BLc2NSR6BNbJa3aaP1Vm8YFJP53AJm7PPHtbQSbeBRDn6znFoUT",
    "timestamp": "2022-09-08T16:54:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6984,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9930662,
    "fees": 42039,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Postchain.io",
      "address": "tz1h4ar7F5wC6Ae2cfkrmrRP6nrPk9gGFaxg"
    },
    "producer": {
      "alias": "Postchain.io",
      "address": "tz1h4ar7F5wC6Ae2cfkrmrRP6nrPk9gGFaxg"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 324096623,
    "priority": 0,
    "baker": {
      "alias": "Postchain.io",
      "address": "tz1h4ar7F5wC6Ae2cfkrmrRP6nrPk9gGFaxg"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324096623,
    "transactions": 78
  },
  {
    "cycle": 522,
    "level": 2693015,
    "hash": "BKqq1LbhMyP83vHnEqYjqGZJ7r2aZbbLLRH6VQnxpci57TFftPC",
    "timestamp": "2022-09-08T16:54:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6979,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9909232,
    "fees": 84905,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "producer": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 324096623,
    "priority": 0,
    "baker": {
      "alias": "Everstake",
      "address": "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324096623,
    "transactions": 189
  },
  {
    "cycle": 522,
    "level": 2693014,
    "hash": "BLFN7mW4gKdSEMaQ7SrtqTrhsxoVmCojUkhbRy31W7EoSLX2nUk",
    "timestamp": "2022-09-08T16:53:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6976,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9896374,
    "fees": 156280,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Staked",
      "address": "tz1RCFbB9GpALpsZtu6J58sb74dm8qe6XBzv"
    },
    "producer": {
      "alias": "Staked",
      "address": "tz1RCFbB9GpALpsZtu6J58sb74dm8qe6XBzv"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 324258752,
    "priority": 0,
    "baker": {
      "alias": "Staked",
      "address": "tz1RCFbB9GpALpsZtu6J58sb74dm8qe6XBzv"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324258752,
    "transactions": 149
  },
  {
    "cycle": 522,
    "level": 2693013,
    "hash": "BL1kefThP3nRZTX6PBJrgLg3rxQrVa9HULDrS9d7BvEx9vk3abx",
    "timestamp": "2022-09-08T16:53:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6977,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9900660,
    "fees": 345344,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Kraken Baker",
      "address": "tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo"
    },
    "producer": {
      "alias": "Kraken Baker",
      "address": "tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 324258752,
    "priority": 0,
    "baker": {
      "alias": "Kraken Baker",
      "address": "tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324258752,
    "transactions": 95
  },
  {
    "cycle": 522,
    "level": 2693012,
    "hash": "BKosjdXhhrgGBT4fj7pLjpz2tLHth63ni615QzwCP3sHGmiHNuL",
    "timestamp": "2022-09-08T16:52:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6978,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9904946,
    "fees": 82023,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "producer": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 324258752,
    "priority": 0,
    "baker": {
      "alias": "Stake.fish",
      "address": "tz2FCNBrERXtaTtNX6iimR1UJ5JSDxvdHM93"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324258752,
    "transactions": 157
  },
  {
    "cycle": 522,
    "level": 2693011,
    "hash": "BMQgPXzTbukxwNVnNC61DeK5v32ezHEagv6tsQUNxBawmkRubRe",
    "timestamp": "2022-09-08T16:52:29Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6980,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9913518,
    "fees": 46417,
    "nonceRevealed": false,
    "proposer": {
      "alias": "BakeTz",
      "address": "tz1ei4WtWEMEJekSv8qDnu9PExG6Q8HgRGr3"
    },
    "producer": {
      "alias": "BakeTz",
      "address": "tz1ei4WtWEMEJekSv8qDnu9PExG6Q8HgRGr3"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggle": true,
    "lbToggleEma": 324420962,
    "priority": 0,
    "baker": {
      "alias": "BakeTz",
      "address": "tz1ei4WtWEMEJekSv8qDnu9PExG6Q8HgRGr3"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324420962,
    "transactions": 92
  },
  {
    "cycle": 522,
    "level": 2693010,
    "hash": "BLXwKpPnBRPQbmnF8Wd6mf6Mx1Ev35YiKvqJpdnkcPxfyJqtP8A",
    "timestamp": "2022-09-08T16:51:59Z",
    "proto": 13,
    "payloadRound": 0,
    "blockRound": 0,
    "validations": 6985,
    "deposit": 0,
    "reward": 10000000,
    "bonus": 9934948,
    "fees": 64970,
    "nonceRevealed": false,
    "proposer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "producer": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "software": {
      "version": "v13.0",
      "date": "2022-05-05T12:55:26Z"
    },
    "lbToggleEma": 324583253,
    "priority": 0,
    "baker": {
      "alias": "Coinbase Baker",
      "address": "tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk"
    },
    "lbEscapeVote": false,
    "lbEscapeEma": 324583253,
    "transactions": 128
  }
]