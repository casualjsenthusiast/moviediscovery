import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when user types', () => {
    spyOn(component.search, 'emit');

    const testTerm = 'inception';
    inputEl.nativeElement.value = testTerm;
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith(testTerm);
  });

  it('should render the app title', () => {
    const headerText = fixture.debugElement.query(By.css('.app-title')).nativeElement.textContent;
    expect(headerText).toContain('MoodFlix');
  });
});
