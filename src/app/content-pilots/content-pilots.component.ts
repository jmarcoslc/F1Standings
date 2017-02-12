declare var $: any;
import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-content-pilots',
  templateUrl: './content-pilots.component.html',
  styleUrls: ['./content-pilots.component.css']
})

export class ContentPilotsComponent implements OnInit {

  private drivers:any;
  private driver_results:any;
  private current_season:number;
  private filt = "";
  private filt_selector = ["Driver", "familyName"];

  constructor(private APIF1:AjaxService, private Filter:FilterService) { 
    this.Filter.getFilterTerm().subscribe(
      filter_term => this.filt = filter_term
    );
    this.APIF1.getCurrentSeasonNumber().subscribe(
      season => {this.current_season = season; this.getDrivers();}
    );
  }

  getDrivers() {
  	this.APIF1.getAllDriverSeasonStandings(this.current_season).subscribe(
      data => {this.drivers=data.MRData.StandingsTable.StandingsLists[0].DriverStandings; $('.collapsible').collapsible();}
	);
  }

  getDriverResults(pilot_id:string) {
  	this.driver_results = null;
  	this.APIF1.getDriverInfo(this.current_season, pilot_id).subscribe(
      data => {this.driver_results=data.MRData.RaceTable.Races;}
	  );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.APIF1.forceSubscribe();
  }

}
