import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { setupCourses } from '../common/setup-test-data';
import { CoursesModule } from './../courses.module';
import { CoursesCardListComponent } from './courses-card-list.component';
import { DebugElement } from '@angular/core';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let element: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoursesModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
        });
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course list', () => {
    component.courses = setupCourses();

    fixture.detectChanges();

    const cards = element.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });

  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];

    const card = element.query(By.css('.course-card:first-child')),
      title = card.query(By.css('mat-card-title')),
      image = card.query(By.css('img'));

    expect(card).toBeTruthy();
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
