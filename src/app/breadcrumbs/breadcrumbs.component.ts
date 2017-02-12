import { Component, OnInit } from '@angular/core';
import {Ng2BreadcrumbModule, BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})

export class BreadcrumbsComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) { 

  }

  ngOnInit() {
  }

}
