declare var $: any;
import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { FilterService } from '../filter.service';
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
  private filtr_term:string;

  constructor(private APIF1:AjaxService, private Filter:FilterService) {
    this.max_season_number = this.APIF1.getMaxSeasonNumber();
    this.min_season_number = this.APIF1.getMinSeasonNumber();
    this.seasons = this.APIF1.getSeasonsAvailable();
    this.current_season = this.APIF1.getCurrentSeasonNumberNumber();
  }

  ngOnInit() {
  }

  setNewSeason() {
    this.APIF1.setCurrentSeasonNumber(this.current_season);
  }

  setNewFilterTerm() {
    this.Filter.setFilterTerm(this.filtr_term);
  }

  ngAfterViewInit() {
    $('select').material_select();
  }

}
