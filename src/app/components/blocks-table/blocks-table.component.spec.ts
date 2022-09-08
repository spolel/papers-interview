import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';

import { BlocksTableComponent } from './blocks-table.component';

describe('BlocksTableComponent', () => {
  let component: BlocksTableComponent;
  let fixture: ComponentFixture<BlocksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlocksTableComponent,
        MatProgressBar,
        MatPaginator],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlocksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
