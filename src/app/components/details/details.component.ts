import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  level: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.level = parseInt(this.route.snapshot.paramMap.get('level'));
  }

}
