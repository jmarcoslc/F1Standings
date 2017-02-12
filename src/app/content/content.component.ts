declare var $: any;
import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { FilterService } from '../filter.service';
import { ContentFilterPipe } from '../content-filter.pipe';

@Component({
  selector: 'app-seasons-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentSeasonsComponent implements OnInit {

  private current_season:number;
  private races:any;
  private race_info:any;
  private filt = "";
  private filt_selector = ["raceName"];

  constructor(private APIF1:AjaxService, private Filter:FilterService) {
    this.Filter.getFilterTerm().subscribe(
      filter_term => this.filt = filter_term
    );
    this.APIF1.getCurrentSeasonNumber().subscribe(
      season => {this.current_season = season; this.getRaces();}
    );
  }

  ngOnInit() {
  	
  }

  getRaces() {
    this.races = null;
  	this.APIF1.getSeason(this.current_season).subscribe(
      data => {this.races=data.MRData.RaceTable.Races; $('.collapsible').collapsible();}
	  );
  }

  getRaceInfo(race:number) {
    this.race_info = null;
    this.APIF1.getRace(this.current_season, race).subscribe(
      data => this.race_info=data.MRData.RaceTable.Races[0].Results
    );
  }

  ngAfterViewInit() {
    $('.collapsible').collapsible();
    this.APIF1.forceSubscribe();
  }

  setCollapse() {
    $('.collapsible').collapsible();
  }

}
