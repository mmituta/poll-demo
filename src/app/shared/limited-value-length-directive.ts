import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * This directive disables the input element if its values is longer than the limit configured by the
 * {@link LimitedValueLengthDirective.limit | limit } input property.
 * <br/>
 * By default the limit is set to 80 characters of length.
 */
@Directive({
  selector: '[appLimitedLength]',
})
export class LimitedValueLengthDirective {
  /**
   * Defines the limit of value allowed by the directive.
   * If the value is longer than the limit, the element from which the value comes from will be disabled.
   */
  @Input()
  limit = 80;

  private inputElement: HTMLInputElement;

  constructor(private el: ElementRef) {
    this.inputElement = this.el.nativeElement as HTMLInputElement;
  }

  /**
   * Invoked when the value of the element is updated. It checks if the value is over the limit and disables the element if it is.
   */
  @HostListener('input')
  disableElementIfValueIsOverTheLimit(): void {
    this.inputElement.disabled = this.inputElement.value.length >= this.limit;
  }
}
