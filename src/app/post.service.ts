import { Post } from './models/post';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFireDatabase) { }

  getPost(id: string): Observable<Post>{
    return this.db.object(`posts/${id}`).valueChanges();
  }
}
