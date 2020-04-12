import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostResolveService implements Resolve<any> {
  router: any;

  constructor(private postService: PostService) { }
  
  resolve(route: ActivatedRouteSnapshot,
    ) {
    // get id from the router
    let id = route.paramMap.get('id');
    return this.postService.getPost(id).pipe(
      take(1),
      mergeMap(post=> {
        if (post) {
          return of(post);
        } else { // id not found
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    )
  }
}
