import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { Observable } from "rxjs";
import { TokenObject } from "../models/authentication";
import { User, UserRequest } from "../models/user";
import { CLIENT_ID, CLIENT_SECRET, TOKEN, TOKEN_EXPIRATION_DATE } from "../utils/constants";
import { Absence } from "../models/absence";

@Injectable({
  providedIn: "root"
})
export class AppService {

  constructor(private http: HttpClient) { }

  public saveCredentials(clientID: string, clientSecret: string) {
    localStorage.setItem(CLIENT_ID, clientID);
    localStorage.setItem(CLIENT_SECRET, clientSecret);
    this.getToken().subscribe(token => {
      localStorage.setItem(TOKEN, token.access_token);
      localStorage.setItem(TOKEN_EXPIRATION_DATE, new Date().toString());
    });
  }

  public checkCredentialsAvailability() {
    return localStorage.getItem(CLIENT_ID) && localStorage.getItem(CLIENT_SECRET);
  }

  public checkIfTokenIsUnavailable() {
    const tokenExpirationDateString = localStorage.getItem(TOKEN_EXPIRATION_DATE);
    if (tokenExpirationDateString) {
      const tokenExpirationDate = new Date(tokenExpirationDateString);
      const dateNow = new Date();
      return Math.round(tokenExpirationDate.getTime() / 3600000) - Math.round(dateNow.getTime() / 3600000) >= 1;
    }
    return true;
  }

  public getToken(): Observable<TokenObject> {
    const clientId = localStorage.getItem(CLIENT_ID);
    const clientSecret = localStorage.getItem(CLIENT_SECRET);
    const body = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
    const headers = new HttpHeaders({
      'Content-Type': "application/x-www-form-urlencoded"
    });
    const options = { headers: headers };

    return this.http.post<TokenObject>("https://login.allhours.com/connect/token", body, options);
  }

  public getUsers(): Observable<User[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = { headers: headers }
    return this.http.get<User[]>("https://api4.allhours.com/api/v1/Users", options);
  }

  public addUsers(userRequest: UserRequest): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = { headers: headers }
    return this.http.post("https://api4.allhours.com/api/v1/Users", userRequest, options);
  }

  public getAbsenceDefinitions(): Observable<any[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = { headers: headers }
    return this.http.get<any[]>("https://api4.allhours.com/api/v1/AbsenceDefinitions", options);
  }

  public addNewAbsence(absence: Absence){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = { headers: headers }
    return this.http.post("https://api4.allhours.com/api/v1/Absences", absence, options);
  }

  public getAbsences(): Observable<Absence[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = { headers: headers }
    return this.http.get<Absence[]>("https://api4.allhours.com/api/v1/Absences", options);
  }

  public editAbsence(absence: Absence) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = { headers: headers };
    return this.http.put(`https://api4.allhours.com/api/v1/Absences/${absence.Id}`, absence, options);
  }

}
