declare var $: any;
import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Component({
  selector: 'app-content-teams',
  templateUrl: './content-teams.component.html',
  styleUrls: ['./content-teams.component.css']
})

export class ContentTeamsComponent implements OnInit {

  private teams:any;
  private team_results:any;
  private current_season:number;

  constructor(private APIF1:AjaxService) { 
    this.APIF1.getCurrentSeasonNumber().subscribe(
      season => {this.current_season = season; this.getTeams();}
    );
  }

  getTeams() {
  	this.APIF1.getSeasonTeams(this.current_season).subscribe(
  		data => {this.teams = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;$('.collapsible').collapsible();}
  	);
  }

  getTeamResults(team_id:string) {
  	this.team_results = null;
  	this.APIF1.getSeasonTeamResults(this.current_season, team_id).subscribe(
  		data => this.team_results = data.MRData.RaceTable.Races
  	);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.APIF1.forceSubscribe();
  }

}
