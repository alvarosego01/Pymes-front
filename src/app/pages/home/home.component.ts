import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { _globalConfig } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


  
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
  ) { }

  ngOnInit(): void {
  }

}
