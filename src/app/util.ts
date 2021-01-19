import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Util {
}

export function callWithSnackBar(snackBar:MatSnackBar, httpCall:Observable<any>, messages:string[]):Observable<any> {
    snackBar.open(messages[0], null, {
      duration: 30000,
    })

    let returnValue:ReplaySubject<any> = new ReplaySubject<any>(1);
    
    httpCall.subscribe(
      success => {
        returnValue.next(success);
        returnValue.complete();
        snackBar.open(messages[1], null, {
          duration: 2000,
        });

      },
      error => {
        returnValue.complete();
        console.log(error);
        snackBar.open(messages[2], null, {
          duration: 4000,
        });
      }
    );

    return returnValue;
}
