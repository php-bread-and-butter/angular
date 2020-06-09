import { PostService } from './../../services/post/post.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})

export class PostComponent  {
	listPost: any[];
	posts: any;

	constructor(service: PostService) {
		this.posts = service;
		this.listPost = this.posts.getPosts();
	}

	public contentChanged(postData) {
		if (postData.action == 'loveClicked') {
			this.posts.updatePostCount(postData.postId);
		} else {
			this.posts.updateLikeCount(postData.postId);
		}
		console.log(postData);
	}
}