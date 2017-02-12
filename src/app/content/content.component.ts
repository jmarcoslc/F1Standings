declare var $: any;
import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Component({
  selector: 'app-seasons-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentSeasonsComponent implements OnInit {

  private current_season:number;
  private races:any;
  private race_info:any;

  constructor(private APIF1:AjaxService) {
    this.APIF1.getCurrentSeasonNumber().subscribe(
      season => {console.log(this.APIF1.getCurrentSeasonNumber());this.current_season = season; this.getRaces();}
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
    this.APIF1.forceSubscribe();
  }

}
