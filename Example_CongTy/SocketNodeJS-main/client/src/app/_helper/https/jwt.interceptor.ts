// import { SocketUserService } from './../../shared/service/socket-user.service';
// import { Inject, Injectable, Optional } from '@angular/core'
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpHeaders,
//   HttpClient,
// } from '@angular/common/http'
// import { Observable } from 'rxjs'
// import * as CryptoJS from 'crypto-js';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(
//     private storeSocketUser:SocketUserService
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add authorization header with jwt token if available

//     var oauth = JSON.parse(this.storeSocketUser.getStoredUser())
//     request.headers.set('Content-Type', 'application/json');
//     if (oauth.s_id) {
//       request.headers.set('Authorization', `Bearer ${CryptoJS.SHA512(oauth.s_id).toString(CryptoJS.enc.Hex)}`)
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${CryptoJS.SHA512(oauth.s_id).toString(CryptoJS.enc.Hex)}`,
//         },
//       })
//     }
//     return next.handle(request)
//   }
// }
