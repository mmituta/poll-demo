import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  IterableDiffer,
  IterableDiffers,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { Poll } from '../poll';
import { PollResult } from '../poll-result';
import { Result } from './result-type';
@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css'],
})
export class PollResultsComponent implements DoCheck {
  public data: Result[] = [{ name: 'test', value: 5 }];

  @Input()
  public poll: Poll = new Poll();
  iterableDiffer: IterableDiffer<Result>;
  objDiffers: KeyValueDiffer<string, any>[];
  constructor(private iterableDiffers: IterableDiffers,   private keyValueDiffers: KeyValueDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create();
    this.objDiffers = new Array<KeyValueDiffer<string, any>>();
    this.updateObjectDiffers();
  }

  private updateObjectDiffers(): void {
    this.poll.results.forEach((result, index) => {
      this.objDiffers[index] = this.keyValueDiffers.find(result).create();
    });
  }

  ngDoCheck(): void {
  
    const changes = this.iterableDiffer.diff(this.poll.results);
    if (changes) {
      console.log('Changes detected!');
      this.data = [...this.poll.results];
      this.updateObjectDiffers();
    }else{
      this.poll.results.forEach((result, index) => {
        const objDiffer = this.objDiffers[index];
        const objChanges = objDiffer.diff(result);
        if (objChanges) {
          objChanges.forEachChangedItem((changedItem) => {
            console.log(changedItem.key);
            this.data = [...this.poll.results];
          });
        }
      });
    }
  }

}
