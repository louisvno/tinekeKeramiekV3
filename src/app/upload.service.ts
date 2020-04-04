import { mergeAll, scan, distinctUntilKeyChanged, share, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase';
import {Set}  from 'immutable';

@Injectable({
  providedIn: 'root'
})
/**
 * Here the upload tasks will be registered and their state as a whole exposed
 * Upload lifecycle
 *  start: user adds an image
 *  end: user cancels upload
 *  end: error is thrown
 *  end: upload complete
 * 
 * need aggregate uploadstate
 * {
 *  inprogress [] (running)
 *  complete []
 *  error (?)
 * combine multiple states i1 state
 * }
 */
export class UploadService {
  // needs some state calculator
  private states = new Subject<Observable<UploadTaskSnapshot>>();
  state$ = this.states.pipe(
    mergeAll(),
    share()
  )

  public running = this.state$.pipe(
    scan((acc : Set<string>, curr:UploadTaskSnapshot) => {
       return curr.task.snapshot.state === firebase.storage.TaskState.RUNNING? 
        acc.add(curr.ref.fullPath) : 
        acc.remove(curr.ref.fullPath)
    }, Set()),
    map(set => set.size)
  )

  constructor() {
    
  }

  public register(upload : Observable<UploadTaskSnapshot>){
    // check behaviour of this
    // map to desired format
    this.states.next(upload);
  }
}
