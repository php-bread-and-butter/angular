import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postArray;
  likeCount: number;
  likeSelected: boolean;
  loveCount: number;
  loveSelected: boolean;
  listPost: any[];
  
  constructor(private http: Http) { }
  
  /**
   * listPosts
   */
  public listPosts() {
    this.http.get('http://astram.tech/api').subscribe(response => {
      this.listPost = response.json();
    });
  }
  /**
  * getPosts
  */
  public getPosts() {
    
    this.postArray = [
      {
        id: 1,
        picture: 'https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no',
        title: 'Lily-Grace Colley',
        postCount: 156,
        likeCount: 1012,
        isLoved: false,
        isLiked: false,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime et veniam perferendis saepe? Ratione aspernatur voluptate nesciunt magni debitis cum eum cumque eius. Distinctio, quis. Laborum dolor eveniet ex commodi."
      },
      {
        id: 2,
        picture: 'https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no',
        title: 'Murray Reeve',
        postCount: 305,
        likeCount: 2043,
        isLoved: false,
        isLiked: false,
        description: "Ratione mollitia cumque labore dicta illum magni consectetur! Quidem ab libero consequatur doloremque atque, mollitia esse repellendus beatae? Repudiandae laudantium quisquam amet."
      },
      {
        id: 3,
        picture: 'https://lh3.googleusercontent.com/pZwZJ5HIL5iKbA91UGMUIPR0VJWa3K0vOGzDZmY6wU3EJBUdfsby3VEyxU162XxTyOyP3D154tjkr-4Jgcx8lygYUR8eB-jVmld4dsHi1c-mE_A8jKccseAG7bdEwVrcuuk6ciNtSw=s170-no',
        title: 'Lily-Grace Colley',
        postCount: 902,
        likeCount: 1302,
        isLoved: false,
        isLiked: false,
        description: "Et sequi exercitationem perferendis, neque voluptatibus culpa delectus ipsa voluptate quibusdam ad itaque doloribus labore molestias quam dolores architecto! Earum, quis! Non."
      }
    ];
    
    return this.postArray;
  }
  /**
  * updatePost
  */
  public updatePostCount(ID: number) {
    for (let entry of this.postArray) {
      if(entry.id == ID) {
        entry.isLoved = !entry.isLoved;
        entry.postCount += (entry.isLoved) ? +1 : -1;
      }      
    }
  }
  /**
  * updatePost
  */
  public updateLikeCount(ID: number) {
    for (let entry of this.postArray) {
      if(entry.id == ID) {
        entry.isLiked = !entry.isLiked;
        entry.likeCount += (entry.isLiked) ? +1 : -1;
      }      
    }
  }
}
