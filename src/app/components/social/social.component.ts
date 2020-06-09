import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-social',
	templateUrl: './social.component.html',
	styleUrls: ['./social.component.css']
})
export class SocialComponent {
	@Input('post-id') postId: number;
	@Input('love-count') loveCount: number;
	@Input('like-count') likeCount: number;
	@Input('is-loved') isLoved: boolean;
	@Input('is-liked') isliked: boolean;
	@Input('description') postDescription: string;

	@Output('on-update') onUpdate = new EventEmitter();
	
	private getPostData (action: string)  {
		return {
			'postId': this.postId,
			'loveCount': this.loveCount,
			'likeCount': this.likeCount,
			'isLoved': this.isLoved,
			'isLiked': this.isliked,
			'description': this.postDescription,
			'action': action
		};
	};

	public love ($event) {
		this.isLoved = !this.isLoved;
		this.loveCount += (this.isLoved) ? +1 : -1;
		this.onUpdate.emit(this.getPostData('loveClicked'));
		return false;
	}
	
	public like ($event) {
		this.isliked = !this.isliked;
		this.likeCount += (this.isliked) ? +1 : -1;
		this.onUpdate.emit(this.getPostData('likeClicked'));
		return false;
	}
	
}
