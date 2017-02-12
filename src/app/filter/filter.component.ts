declare var $: any;
import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  private seasons: Array<number>;
  private current_season:number;
  private max_season_number:number;
  private min_season_number:number;

  constructor(private APIF1:AjaxService) {
    this.max_season_number = this.APIF1.getMaxSeasonNumber();
    this.min_season_number = this.APIF1.getMinSeasonNumber();
    this.seasons = this.APIF1.getSeasonsAvailable();
    this.current_season = this.APIF1.getCurrentSeasonNumberNumber();
    //setInterval(()=>this.setNewSeason(), 1000); 

  }

  ngOnInit() {
  }

  setNewSeason() {
    this.APIF1.setCurrentSeasonNumber(this.current_season);
  }

  ngAfterViewInit() {
    $('select').material_select();
  }

}
