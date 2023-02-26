import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { IAppConfig } from '../IAppConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static settings: IAppConfig;
  constructor(private http: HttpClient) {}
  load() {
      const jsonFile = "assets/config/server.json";
      return new Promise<void>((resolve, reject) => {
          this.http.get(jsonFile).pipe(
            catchError(_ => {
              reject("Could not load file '${jsonFile}': ${JSON.stringify(response)}");
              return of();
           })
          ).subscribe(response => {
            ConfigService.settings = <IAppConfig>response;
             resolve();
          })
      });
  }
}
