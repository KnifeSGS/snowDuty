import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends BaseService<Comment>  {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'comments';
  }
}
