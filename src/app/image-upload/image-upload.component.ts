import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadService } from './../upload.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { mergeAll } from 'rxjs/operators';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: []
})
export class ImageUploadComponent implements OnInit {

  // observable to check progress
  /**
   * Lifecycle of the upload process;
   *  start: when user adds image
   *  end: complete or error or user cancel
   */
  private task: AngularFireUploadTask;
  private percentage = new BehaviorSubject(of(0));
  public pct = this.percentage.pipe(mergeAll())

  @Input()
  id: string;

  constructor(
    private uploadService: UploadService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onImageAdd(e){
    this.task = this.storage.upload("path", e.target.files[0]);
    this.percentage.next(this.task.percentageChanges());
    this.uploadService.register(this.task.snapshotChanges());
  }
}
