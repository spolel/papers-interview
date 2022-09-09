import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { TzktAPIService } from 'src/app/services/tzkt-api.service';

import { TransactionsTableComponent } from './transactions-table.component';

describe('TransactionsTableComponent', () => {
    let component: TransactionsTableComponent;
    let fixture: ComponentFixture<TransactionsTableComponent>;
    let loader: HarnessLoader;

    let table: MatTableHarness;
    let paginator: MatPaginatorHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TransactionsTableComponent,
                MatProgressBar,
                MatPaginator],
            imports: [HttpClientTestingModule, MatTableModule, MatPaginatorModule, NoopAnimationsModule],
            providers: [{
                provide: TzktAPIService,
                useClass: MockAppService
            },],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();


        fixture = TestBed.createComponent(TransactionsTableComponent);
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

    describe('transactions table', async () => {
        it('should load data', async () => {
            expect(component.transactions.length).not.toEqual(0)
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

    });
});

class MockAppService {
    getTransactionCount(): Observable<any> {
        return of([testTransactions.length]);
    }

    getTransactions(): Observable<any> {
        return of(testTransactions);
    }

    getTransactionsPaged(level:number, pageIndex: number, pageSize: number): Observable<any> {
        let i = pageIndex*pageSize;
        return of(testTransactions.slice(i,i+pageSize));
      }
}

const testTransactions = [
    {
        "type": "transaction",
        "id": 336729456,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ooDkFpFxJncWjQTrXbMFM4K3Ht83j7iR75VK6zqXtm3Ze45Bqjr",
        "counter": 72539935,
        "sender": {
            "address": "tz2XeqeJzjkcBJaWHPu3x6mW4Bznee6jhjuR"
        },
        "gasLimit": 1500,
        "gasUsed": 1451,
        "storageLimit": 1000,
        "storageUsed": 0,
        "bakerFee": 950,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "tz1eee5rapdZTZQHdR5dUixmaguzpDgPwiz4"
        },
        "amount": 21841,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729457,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "onsdMD2LdL4jYhkqn7VJh1D93K5iCGKxw5sCzH436bh38Ecckcv",
        "counter": 64615519,
        "sender": {
            "address": "tz2XeqeHy6ZXdZvFq6Lk4yAGASVEoHt48tPW"
        },
        "gasLimit": 1500,
        "gasUsed": 1451,
        "storageLimit": 1000,
        "storageUsed": 0,
        "bakerFee": 550,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "tz1eee5rapW1Z879Pg7MzSpB1ZhLfzzEZGKu"
        },
        "amount": 827347618,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729458,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "onsdMD2LdL4jYhkqn7VJh1D93K5iCGKxw5sCzH436bh38Ecckcv",
        "counter": 64615520,
        "sender": {
            "address": "tz2XeqeHy6ZXdZvFq6Lk4yAGASVEoHt48tPW"
        },
        "gasLimit": 1500,
        "gasUsed": 1451,
        "storageLimit": 1000,
        "storageUsed": 0,
        "bakerFee": 550,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "tz1eee5rapW1Z879Pg7MzSpB1ZhLfzzEZGKu"
        },
        "amount": 4369,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729459,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "oniStpaV1HZP1DKqaYZi7xSrHx9J4FtqfeJ4FWriPdXEtL7rd2t",
        "counter": 75939711,
        "sender": {
            "address": "tz1UYMvCVfU2vKYFKWcL2ocdN9dtcasZzdMx"
        },
        "gasLimit": 1551,
        "gasUsed": 1451,
        "storageLimit": 257,
        "storageUsed": 0,
        "bakerFee": 548,
        "storageFee": 0,
        "allocationFee": 64250,
        "target": {
            "address": "tz1h4nFnYM7kumrHqVu5dmpJVCoNsXUwk4SE"
        },
        "amount": 4893326,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729460,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "onmnrtEKNCZuk4XSJ4aXdZRBhKdDaCUfGxKw1Hubyg1U2u1QUVH",
        "counter": 48031167,
        "sender": {
            "address": "tz1b13SK94xvy1SdcKYTr1WoYH89Wr2Xm6s7"
        },
        "gasLimit": 1551,
        "gasUsed": 1451,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 548,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "328Jesse",
            "address": "tz1aACaaDefdyjVduoFyUi9Rhde6nsmhHunw"
        },
        "amount": 5000000,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729461,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "onzuvomhtAXcSoUdTrRJwWTE75sDfL4VRLTVGZyGiRwpZTPdWhC",
        "counter": 31907827,
        "sender": {
            "address": "tz1iL1bFh1ah5tUkS5VY5NX4S8zv1h1pX6bQ"
        },
        "gasLimit": 1531,
        "gasUsed": 1451,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 417,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "tz1bwqdSeUetRoctaGrjr5iJRHnzu2BvPDs2"
        },
        "amount": 125000000,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729462,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opWUuUEEUuWh14BeBSyu6kW4Tei7Xni9C5wvFBeYA7jFtj1Bueg",
        "counter": 35216820,
        "sender": {
            "alias": "Morph_VGArt",
            "address": "tz1XRaD9pSyNX5516HBtsRAgBQbFSJaqR16K"
        },
        "gasLimit": 1567,
        "gasUsed": 1467,
        "storageLimit": 350,
        "storageUsed": 67,
        "bakerFee": 1174,
        "storageFee": 16750,
        "allocationFee": 0,
        "target": {
            "address": "KT1TkaNLKqjSeGUsTxbGK4dq82yvf8VD6jCh"
        },
        "targetCodeHash": 199145999,
        "amount": 0,
        "parameter": {
            "entrypoint": "update_operators",
            "value": [
                {
                    "add_operator": {
                        "owner": "tz1XRaD9pSyNX5516HBtsRAgBQbFSJaqR16K",
                        "operator": "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC",
                        "token_id": "24"
                    }
                }
            ]
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729463,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opWUuUEEUuWh14BeBSyu6kW4Tei7Xni9C5wvFBeYA7jFtj1Bueg",
        "counter": 35216821,
        "sender": {
            "alias": "Morph_VGArt",
            "address": "tz1XRaD9pSyNX5516HBtsRAgBQbFSJaqR16K"
        },
        "gasLimit": 2208,
        "gasUsed": 2108,
        "storageLimit": 383,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "objkt.com Marketplace v2",
            "address": "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC"
        },
        "targetCodeHash": -714956226,
        "amount": 0,
        "parameter": {
            "entrypoint": "ask",
            "value": {
                "token": {
                    "address": "KT1TkaNLKqjSeGUsTxbGK4dq82yvf8VD6jCh",
                    "token_id": "24"
                },
                "amount": "15000000",
                "shares": [
                    {
                        "amount": "1000",
                        "recipient": "tz1XRaD9pSyNX5516HBtsRAgBQbFSJaqR16K"
                    }
                ],
                "target": null,
                "currency": {
                    "tez": {}
                },
                "editions": "1",
                "expiry_time": null
            }
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729464,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRHU2FtWJWckWW7pHCgrLuwpBohsd9CkEzUYRPvp7mBQFZL2H4",
        "counter": 74910839,
        "sender": {
            "address": "tz1YexcmYqybFbMhmbNx2SULR5rGji2WSdtn"
        },
        "gasLimit": 2032,
        "gasUsed": 1932,
        "storageLimit": 207,
        "storageUsed": 207,
        "bakerFee": 559,
        "storageFee": 51750,
        "allocationFee": 0,
        "target": {
            "address": "KT1GBWC8L4HYXM62GDBGipnZ6Bc9sWgqhcFF"
        },
        "targetCodeHash": -1091867362,
        "amount": 0,
        "parameter": {
            "entrypoint": "create_token",
            "value": {
                "token_id": "125",
                "token_info": {
                    "": "697066733a2f2f516d6278704245755234595953616e756e706f436a4e754437395736397731574a46467867753655374774706a72"
                }
            }
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729465,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRHU2FtWJWckWW7pHCgrLuwpBohsd9CkEzUYRPvp7mBQFZL2H4",
        "counter": 74910840,
        "sender": {
            "address": "tz1YexcmYqybFbMhmbNx2SULR5rGji2WSdtn"
        },
        "gasLimit": 2485,
        "gasUsed": 2385,
        "storageLimit": 67,
        "storageUsed": 67,
        "bakerFee": 604,
        "storageFee": 16750,
        "allocationFee": 0,
        "target": {
            "address": "KT1GBWC8L4HYXM62GDBGipnZ6Bc9sWgqhcFF"
        },
        "targetCodeHash": -1091867362,
        "amount": 0,
        "parameter": {
            "entrypoint": "mint_tokens",
            "value": [
                {
                    "owner": "tz2TfKmYdnWbGeZLYiTpZBn8mrVceaH9XWJj",
                    "amount": "1",
                    "token_id": "125"
                }
            ]
        },
        "status": "applied",
        "hasInternals": false,
        "tokenTransfersCount": 1
    },
    {
        "type": "transaction",
        "id": 336729466,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ooWpjGJb35unbgG95iDNpdMe2S9SL2p2LY6JdQCJXpATLnBkxdE",
        "counter": 68233558,
        "sender": {
            "address": "tz1N9a5H73ZqwBv2qCQBQW2FotyrYQcTC1Ji"
        },
        "gasLimit": 2501,
        "gasUsed": 2401,
        "storageLimit": 350,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "objkt.com Marketplace v2",
            "address": "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC"
        },
        "targetCodeHash": -714956226,
        "amount": 0,
        "parameter": {
            "entrypoint": "retract_ask",
            "value": "2153984"
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729467,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ooWpjGJb35unbgG95iDNpdMe2S9SL2p2LY6JdQCJXpATLnBkxdE",
        "counter": 68233559,
        "sender": {
            "address": "tz1N9a5H73ZqwBv2qCQBQW2FotyrYQcTC1Ji"
        },
        "gasLimit": 2208,
        "gasUsed": 2108,
        "storageLimit": 383,
        "storageUsed": 0,
        "bakerFee": 1172,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "objkt.com Marketplace v2",
            "address": "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC"
        },
        "targetCodeHash": -714956226,
        "amount": 0,
        "parameter": {
            "entrypoint": "ask",
            "value": {
                "token": {
                    "address": "KT1Q2bqnpABjBd2TeF7SY825NQKmGykW5TuN",
                    "token_id": "6"
                },
                "amount": "18000000",
                "shares": [
                    {
                        "amount": "1500",
                        "recipient": "tz1fKNqgVYYSXajWjmFwAMvUGrANN2PTE6jA"
                    }
                ],
                "target": null,
                "currency": {
                    "tez": {}
                },
                "editions": "1",
                "expiry_time": null
            }
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729468,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ooNwKqfr7PCci94AEYjhAXqfZ8EaN316YsGoEVuUFrRm1Mg1VhG",
        "counter": 17504141,
        "sender": {
            "alias": "vyden",
            "address": "tz1Paqzqbzr77BMp1bMMKj6f3umYZPzXGE8q"
        },
        "gasLimit": 3649,
        "gasUsed": 3549,
        "storageLimit": 350,
        "storageUsed": 67,
        "bakerFee": 769,
        "storageFee": 16750,
        "allocationFee": 0,
        "target": {
            "address": "KT1BiS9etcfQZ4y55Tyfb3oGmiFXTDo5GmqV"
        },
        "targetCodeHash": 199145999,
        "amount": 0,
        "parameter": {
            "entrypoint": "transfer",
            "value": [
                {
                    "txs": [
                        {
                            "to_": "tz1burnburnburnburnburnburnburjAYjjX",
                            "amount": "1",
                            "token_id": "10"
                        }
                    ],
                    "from_": "tz1Paqzqbzr77BMp1bMMKj6f3umYZPzXGE8q"
                }
            ]
        },
        "status": "applied",
        "hasInternals": false,
        "tokenTransfersCount": 1
    },
    {
        "type": "transaction",
        "id": 336729469,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRY4nYXUBBc6Bza5bhGToP6QsQmTDgKTJxNx3A92kHZ2af8xwa",
        "counter": 11088335,
        "sender": {
            "address": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
        },
        "gasLimit": 1563,
        "gasUsed": 1463,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 2184,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "Youves Synthetic Asset",
            "address": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"
        },
        "targetCodeHash": -1721726310,
        "amount": 0,
        "parameter": {
            "entrypoint": "update_operators",
            "value": [
                {
                    "add_operator": {
                        "owner": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx",
                        "operator": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di",
                        "token_id": "0"
                    }
                }
            ]
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729470,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRY4nYXUBBc6Bza5bhGToP6QsQmTDgKTJxNx3A92kHZ2af8xwa",
        "counter": 11088336,
        "sender": {
            "address": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
        },
        "gasLimit": 7528,
        "gasUsed": 2674,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "QuipuSwap uUSD",
            "address": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di"
        },
        "targetCodeHash": -293425021,
        "amount": 0,
        "parameter": {
            "entrypoint": "tokenToTezPayment",
            "value": {
                "amount": "1349944200000000",
                "min_out": "833449229",
                "receiver": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
            }
        },
        "status": "applied",
        "hasInternals": true
    },
    {
        "type": "transaction",
        "id": 336729471,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRY4nYXUBBc6Bza5bhGToP6QsQmTDgKTJxNx3A92kHZ2af8xwa",
        "counter": 11088336,
        "initiator": {
            "address": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
        },
        "sender": {
            "alias": "QuipuSwap uUSD",
            "address": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di"
        },
        "senderCodeHash": -293425021,
        "nonce": 1,
        "gasLimit": 0,
        "gasUsed": 3305,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "Youves Synthetic Asset",
            "address": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"
        },
        "targetCodeHash": -1721726310,
        "amount": 0,
        "parameter": {
            "entrypoint": "transfer",
            "value": [
                {
                    "txs": [
                        {
                            "to_": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di",
                            "amount": "1349944200000000",
                            "token_id": "0"
                        }
                    ],
                    "from_": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
                }
            ]
        },
        "status": "applied",
        "hasInternals": false,
        "tokenTransfersCount": 1
    },
    {
        "type": "transaction",
        "id": 336729472,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRY4nYXUBBc6Bza5bhGToP6QsQmTDgKTJxNx3A92kHZ2af8xwa",
        "counter": 11088336,
        "initiator": {
            "address": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
        },
        "sender": {
            "alias": "QuipuSwap uUSD",
            "address": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di"
        },
        "senderCodeHash": -293425021,
        "nonce": 0,
        "gasLimit": 0,
        "gasUsed": 1450,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
        },
        "amount": 834283512,
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729473,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "opRY4nYXUBBc6Bza5bhGToP6QsQmTDgKTJxNx3A92kHZ2af8xwa",
        "counter": 11088337,
        "sender": {
            "address": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx"
        },
        "gasLimit": 1533,
        "gasUsed": 1433,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "Youves Synthetic Asset",
            "address": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"
        },
        "targetCodeHash": -1721726310,
        "amount": 0,
        "parameter": {
            "entrypoint": "update_operators",
            "value": [
                {
                    "remove_operator": {
                        "owner": "tz1eee5rapGDbq2bcZYTQwNbrkB4jVSQSSHx",
                        "operator": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di",
                        "token_id": "0"
                    }
                }
            ]
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729474,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "sender": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "gasLimit": 318720,
        "gasUsed": 7483,
        "storageLimit": 500,
        "storageUsed": 0,
        "bakerFee": 65520,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "targetCodeHash": 701287467,
        "amount": 0,
        "parameter": {
            "entrypoint": "test10",
            "value": {
                "i": "640569572",
                "k": "521874",
                "ops": [
                    {
                        "x": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di",
                        "dr": "1",
                        "k1": "tz1burnburnburnburnburnburnburjAYjjX",
                        "k2": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
                        "xp": "0",
                        "xt": "0",
                        "k1fid": "0",
                        "k1ftd": "0",
                        "k2fid": "0",
                        "k2ftd": "1"
                    },
                    {
                        "x": "KT1P8cMDVmp2RdkW8Qgpwa9uR32TgbcLB7PN",
                        "dr": "1",
                        "k1": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
                        "k2": "KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV",
                        "xp": "0",
                        "xt": "14",
                        "k1fid": "0",
                        "k1ftd": "1001",
                        "k2fid": "0",
                        "k2ftd": "0"
                    },
                    {
                        "x": "KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6",
                        "dr": "2",
                        "k1": "tz1burnburnburnburnburnburnburjAYjjX",
                        "k2": "KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV",
                        "xp": "0",
                        "xt": "1",
                        "k1fid": "0",
                        "k1ftd": "0",
                        "k2fid": "0",
                        "k2ftd": "0"
                    }
                ],
                "sig": "edsigtoX3sguq5vouP19Td8au4pe3poHfPg1mXssJ3Mb6exBRpUx6jk3W5qHjcGuk8yrke1t5m5waexPyDArmtdjFtLS23h3SwB"
            }
        },
        "status": "applied",
        "hasInternals": true
    },
    {
        "type": "transaction",
        "id": 336729475,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "initiator": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "sender": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "senderCodeHash": 701287467,
        "nonce": 2,
        "gasLimit": 0,
        "gasUsed": 3592,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "targetCodeHash": 701287467,
        "amount": 0,
        "parameter": {
            "entrypoint": "test11",
            "value": {}
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729476,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "initiator": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "sender": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "senderCodeHash": 701287467,
        "nonce": 4,
        "gasLimit": 0,
        "gasUsed": 2664,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "QuipuSwap uUSD",
            "address": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di"
        },
        "targetCodeHash": -293425021,
        "amount": 640569572,
        "parameter": {
            "entrypoint": "tezToTokenPayment",
            "value": {
                "min_out": "1",
                "receiver": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
            }
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729477,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "initiator": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "sender": {
            "alias": "QuipuSwap uUSD",
            "address": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di"
        },
        "senderCodeHash": -293425021,
        "nonce": 7,
        "gasLimit": 0,
        "gasUsed": 2843,
        "storageLimit": 0,
        "storageUsed": 3,
        "bakerFee": 0,
        "storageFee": 750,
        "allocationFee": 0,
        "target": {
            "alias": "Youves Synthetic Asset",
            "address": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"
        },
        "targetCodeHash": -1721726310,
        "amount": 0,
        "parameter": {
            "entrypoint": "transfer",
            "value": [
                {
                    "txs": [
                        {
                            "to_": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh",
                            "amount": "1035098487636527",
                            "token_id": "0"
                        }
                    ],
                    "from_": "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di"
                }
            ]
        },
        "status": "applied",
        "hasInternals": false,
        "tokenTransfersCount": 1
    },
    {
        "type": "transaction",
        "id": 336729478,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "initiator": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "sender": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "senderCodeHash": 701287467,
        "nonce": 5,
        "gasLimit": 0,
        "gasUsed": 1909,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "alias": "Youves Synthetic Asset",
            "address": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"
        },
        "targetCodeHash": -1721726310,
        "amount": 0,
        "parameter": {
            "entrypoint": "balance_of",
            "value": {
                "callback": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh%test6",
                "requests": [
                    {
                        "owner": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh",
                        "token_id": "0"
                    }
                ]
            }
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729479,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "initiator": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "sender": {
            "alias": "Youves Synthetic Asset",
            "address": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"
        },
        "senderCodeHash": -1721726310,
        "nonce": 8,
        "gasLimit": 0,
        "gasUsed": 1238,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "targetCodeHash": 701287467,
        "amount": 0,
        "parameter": {
            "entrypoint": "test6",
            "value": [
                {
                    "balance": "1035098487636527",
                    "request": {
                        "owner": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh",
                        "token_id": "0"
                    }
                }
            ]
        },
        "status": "applied",
        "hasInternals": false
    },
    {
        "type": "transaction",
        "id": 336729480,
        "level": 2693250,
        "timestamp": "2022-09-08T18:53:29Z",
        "block": "BLtBiTVYkZufHbSmPnbAszM6241XLxEAMD1ekuMo1oFoBJtHCvd",
        "hash": "ony1Bt151D9TU5aY8y3iTyeuNwHtnR6xn6mAXLgHsNmWFasa7NC",
        "counter": 66099664,
        "initiator": {
            "address": "tz1eee5rapHHZiPxKtAC833Qhf2DAAw7rJTS"
        },
        "sender": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "senderCodeHash": 701287467,
        "nonce": 6,
        "gasLimit": 0,
        "gasUsed": 4258,
        "storageLimit": 0,
        "storageUsed": 0,
        "bakerFee": 0,
        "storageFee": 0,
        "allocationFee": 0,
        "target": {
            "address": "KT1DMQpgHs8v5mtzS3mPHhpPuDs8aMyy82Uh"
        },
        "targetCodeHash": 701287467,
        "amount": 0,
        "parameter": {
            "entrypoint": "test11",
            "value": {}
        },
        "status": "applied",
        "hasInternals": false
    }
]