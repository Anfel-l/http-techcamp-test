import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getPosts', 'createPost', 'updatePost', 'deletePost']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get posts', () => {
    const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    apiServiceSpy.getPosts.and.returnValue(of(mockPosts));

    component.getPosts();

    expect(apiServiceSpy.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });

  it('should create a post', () => {
    const newPost = {
      userId: 1,
      title: 'Nuevo Post',
      body: 'Contenido del nuevo post'
    };
    apiServiceSpy.createPost.and.returnValue(of(newPost));

    component.createPost();

    expect(apiServiceSpy.createPost).toHaveBeenCalledWith(newPost);
  });

  it('should update a post', () => {
    const updatedPost = {
      userId: 1,
      id: 1,
      title: 'Post Actualizado',
      body: 'Contenido actualizado del post'
    };
    apiServiceSpy.updatePost.and.returnValue(of(updatedPost));

    component.updatePost();

    expect(apiServiceSpy.updatePost).toHaveBeenCalledWith(updatedPost.id, updatedPost);
  });

  it('should delete a post', () => {
    const postIdToDelete = 1;
    apiServiceSpy.deletePost.and.returnValue(of({}));

    component.deletePost();

    expect(apiServiceSpy.deletePost).toHaveBeenCalledWith(postIdToDelete);
  });
});
