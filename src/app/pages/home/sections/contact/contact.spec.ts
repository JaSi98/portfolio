import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactService } from '../../../../core/services/contact-service';
import { Contact } from './contact';

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

  it('keeps the submit button disabled until the form is valid', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.contact__submit');
    expect(button.disabled).toBe(true);

    fillForm(fixture);
    expect(button.disabled).toBe(false);
  });

  it('does not accept a name or message made of spaces', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    fillForm(fixture);
    const form = (fixture.componentInstance as unknown as { form: Contact['form'] }).form;
    form.patchValue({ name: '   ', message: '            ' });
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.contact__submit');
    expect(form.controls.name.invalid).toBe(true);
    expect(form.controls.message.invalid).toBe(true);
    expect(button.disabled).toBe(true);
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
