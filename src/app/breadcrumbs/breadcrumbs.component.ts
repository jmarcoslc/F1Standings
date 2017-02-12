import { Component, OnInit } from '@angular/core';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})

export class BreadcrumbsComponent implements OnInit {

  private root;

  constructor(private breadcrumbService: BreadcrumbService) { 
    this.root = false;
  }

  hideBreadcrumbs() {
    if (location.pathname == "/" || location.pathname == "/inicio") {
      this.root = true;
    } else {
      this.root = false;
    }
  }

  ngOnInit() {
    this.hideBreadcrumbs();
  }

  ngAfterViewInit() {
    this.hideBreadcrumbs();
  }

}
