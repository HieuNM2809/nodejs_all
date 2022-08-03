import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketUserService {
  /**
   * getStoredUser
   */
   getStoredUser() {
    let storedUser = localStorage.getItem("userStore");
    if (!storedUser) {
      return
    }
    return JSON.parse(storedUser||'');
  }

  /**
   * storeUser
   */
  storeUser(userStore:any) {
    localStorage.setItem("userStore", JSON.stringify(userStore));
  }

    /**
   * getStoreTheme
   */
  getStoreTheme(){
    let storedTheme = localStorage.getItem("colorTheme");
    return storedTheme ? storedTheme : "linear-gradient(to right, rgb(207, 217, 223) 0%, rgb(226, 235, 240) 100%)";
  }

      /**
   * storeTheme
   */

  storeTheme(color:string) {
    localStorage.setItem("colorTheme", color);
  }
}
