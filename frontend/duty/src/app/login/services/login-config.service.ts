import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginConfigService {

  apiLoginUrl = 'http://temeto.vkszrt.local:8101/api/'

  constructor() { }
}
