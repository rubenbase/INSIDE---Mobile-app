import { Injectable } from '@angular/core';


const CONFIG = {
  apiUrl: 'http://localhost:3000/'
};

@Injectable()
export class VarsGlobalesProvider {

  constructor() {}

  public getApiURL() {
    return CONFIG.apiUrl;
  }

}
