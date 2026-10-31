import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactService } from '../../../../core/services/contact-service';
import { Contact, FEEDBACK_DURATION_MS } from './contact';

describe('Contact', () => {
  const send = vi.fn();

  beforeEach(async () => {
    send.mockReset();
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideRouter([]), { provide: ContactService, useValue: { send } }],
    }).compileComponents();
  });

  function fillForm(fixture: ReturnType<typeof TestBed.createComponent<Contact>>): void {
    const form = (fixture.componentInstance as unknown as { form: Contact['form'] }).form;
    form.setValue({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I would like to talk about a project.',
      privacy: true,
      website: '',
    });
    fixture.detectChanges();
  }

  afterEach(() => {
    vi.useRealTimers();
  });

  function feedbackText(fixture: ReturnType<typeof TestBed.createComponent<Contact>>): string {
    return fixture.nativeElement.querySelector('.contact__feedback').textContent.trim();
  }

  function clickSubmit(fixture: ReturnType<typeof TestBed.createComponent<Contact>>): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  it('tells that the privacy policy must be accepted when sending without the consent', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    fillForm(fixture);
    const form = (fixture.componentInstance as unknown as { form: Contact['form'] }).form;
    form.patchValue({ privacy: false });
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.contact__submit');
    expect(button.disabled).toBe(false);
    clickSubmit(fixture);

    expect(send).not.toHaveBeenCalled();
    expect(feedbackText(fixture)).toContain('accept the privacy policy');
    expect(fixture.nativeElement.querySelector('.checkbox__error').textContent).toContain(
      'privacy policy',
    );
  });

  it('shows the errors of all fields when sending an empty form', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    clickSubmit(fixture);

    const form = (fixture.componentInstance as unknown as { form: Contact['form'] }).form;
    expect(send).not.toHaveBeenCalled();
    expect(Object.values(form.controls).every((control) => control.touched)).toBe(true);
  });

  it('hides the feedback again after a few seconds', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    clickSubmit(fixture);
    expect(feedbackText(fixture)).not.toBe('');

    vi.advanceTimersByTime(FEEDBACK_DURATION_MS);
    fixture.detectChanges();
    expect(feedbackText(fixture)).toBe('');
  });

  it('does not accept a name or message made of spaces', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    fillForm(fixture);
    const form = (fixture.componentInstance as unknown as { form: Contact['form'] }).form;
    form.patchValue({ name: '   ', message: '            ' });
    fixture.detectChanges();

    expect(form.controls.name.invalid).toBe(true);
    expect(form.controls.message.invalid).toBe(true);
    clickSubmit(fixture);
    expect(send).not.toHaveBeenCalled();
  });

  it('shows a success message after sending', async () => {
    send.mockResolvedValue(undefined);
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    fillForm(fixture);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(send).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.querySelector('.contact__feedback').textContent).toContain(
      'Thank you',
    );
  });
});
