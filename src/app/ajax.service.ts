import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class AjaxService {

  private max_season_number = new Date().getFullYear();
  private min_season_number = 1950;

  private seasons_available: Array<number>;
  private season: Subject<any> = new Subject<any>();
  private current_season_number:number;
  private current_season_number_sub:Subject<any> = new Subject<any>();
  private race: Subject<any> = new Subject<any>();
  private drivers: Subject<any> = new Subject<any>();
  private driver_info: Subject<any> = new Subject<any>();
  private all_drivers_info: Subject<any> = new Subject<any>();
  private season_driver_standings: Subject<any> = new Subject<any>();
  private teams: Subject<any> = new Subject<any>();
  private team_results: Subject<any> = new Subject<any>();


  
  constructor(private ajax:Http) {
  	this.seasons_available = new Array();
    this.current_season_number_sub.next(new Date().getFullYear()-1);
    this.current_season_number = new Date().getFullYear()-1;
  	this.initSeasons();

   /* setTimeout(
      ()=> this.current_season_number_sub.next(2010)
    ,10000);
    setTimeout(
      ()=> this.current_season_number_sub.next(2005)
    ,15000);*/
  }

  initSeasons() {
  	//Initialize the seasons, from 1950
  	for(let season=this.max_season_number; season >= this.min_season_number; season--) {
  		this.seasons_available.push(season);
  	}
  }

  forceSubscribe() {
    this.current_season_number_sub.next(this.current_season_number);
  }

  getMaxSeasonNumber() {
    return this.max_season_number;
  }

  getMinSeasonNumber() {
    return this.min_season_number;
  }

  getSeasonsAvailable() {
  	return this.seasons_available;
  }

  getCurrentSeasonNumber() {
    return this.current_season_number_sub.asObservable();
  }

  getCurrentSeasonNumberNumber() {
    return this.current_season_number;
  }

  setCurrentSeasonNumber(season_number:number) {
    this.current_season_number = season_number;
    this.current_season_number_sub.next(season_number);
  }

  getSeason(season:number=this.current_season_number){
  	this.ajaxGetSeason(season);
  	return this.season.asObservable();
  }

  getRace(season:number, race:number){
    this.ajaxGetRace(season, race);
    return this.race.asObservable();
  }

  getDrivers(season:number=this.current_season_number) {
    this.ajaxGetDrivers(season);
    return this.drivers.asObservable();
  }

  getDriverInfo(season:number=this.current_season_number, driver_id:string) {
    this.ajaxGetDriverResults(season, driver_id);
    return this.driver_info.asObservable();
  }

  getAllDriversSeasonInfo(season:number=this.current_season_number) {
    this.ajaxGetAllDriverResults(season);
    return this.all_drivers_info.asObservable();
  }

  getAllDriverSeasonStandings(season:number=this.current_season_number) {
    this.ajaxGetAllDriverStandings(season);
    return this.season_driver_standings.asObservable();
  }

  getSeasonTeams(season:number=this.current_season_number) {
    this.ajaxGetTeams(season);
    return this.teams.asObservable();
  }

  getSeasonTeamResults(season:number=this.current_season_number, team_id:string) {
    this.ajaxGetSeasonTeamResults(season, team_id);
    return this.team_results.asObservable();
  }

  private ajaxGetSeason(season:number=this.current_season_number) {
  	this.ajax.get("http://ergast.com/api/f1/"+season+".json")
      .map(response => response.json())
	  .subscribe( data => this.season.next(data));
  }

  private ajaxGetRace(season:number=this.current_season_number, race:number) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/"+race+"/results.json")
      .map(response => response.json())
    .subscribe( data => this.race.next(data));
  }

  private ajaxGetDrivers(season:number=this.current_season_number) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/drivers.json")
      .map(response => response.json())
    .subscribe( data => {this.drivers.next(data); });
  }

  private ajaxGetDriverResults(season:number=this.current_season_number, driver_id:string) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/drivers/"+driver_id+"/results.json")
      .map(response => response.json())
    .subscribe( data => this.driver_info.next(data));
  }

  private ajaxGetAllDriverResults(season:number=this.current_season_number) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/results.json?limit=10000")
      .map(response => response.json())
    .subscribe( data => this.all_drivers_info.next(data));
  }

  private ajaxGetAllDriverStandings(season:number=this.current_season_number) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/driverStandings.json")
      .map(response => response.json())
    .subscribe( data => {this.season_driver_standings.next(data);});
  }

  private ajaxGetTeams(season:number=this.current_season_number) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/constructorStandings.json")
      .map(response => response.json())
    .subscribe( data => {this.teams.next(data);});
  }

  private ajaxGetSeasonTeamResults(season, team_id:string) {
    this.ajax.get("http://ergast.com/api/f1/"+season+"/constructors/"+team_id+"/results.json?limit=10000")
      .map(response => response.json())
    .subscribe( data => {this.team_results.next(data);});
  }

}