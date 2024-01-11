import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createCard } from '../../../redux/actions/custom-card.actions';
import { v4 as uuidv4 } from 'uuid';
import IItem from '../../../youtube/models/item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  adminForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    link: new FormControl(''),
    date: new FormControl(''),
    tags: new FormArray([new FormControl()]),
  });

  constructor(
    private builder: FormBuilder,
    private store: Store
  ) {
    this.createAdminForm();
  }

  private createAdminForm(): void {
    this.adminForm = this.builder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ['', [Validators.maxLength(255)]],
      img: ['', [Validators.required]],
      link: ['', [Validators.required]],
      date: ['', [Validators.required, this.dateValidator]],
      tags: this.builder.array([]),
    });
    this.addTag();
  }

  get getTitle(): AbstractControl<string | null, string | null> | null {
    return this.adminForm.get('title');
  }

  get getDescription(): AbstractControl<string | null, string | null> | null {
    return this.adminForm.get('description');
  }

  get getImg(): AbstractControl<string | null, string | null> | null {
    return this.adminForm.get('img');
  }

  get getLink(): AbstractControl<string | null, string | null> | null {
    return this.adminForm.get('link');
  }

  get getDate(): AbstractControl<string | null, string | null> | null {
    return this.adminForm.get('date');
  }

  get tags() {
    return this.adminForm.controls.tags as FormArray;
  }

  private dateValidator(
    control: AbstractControl
  ): { errorStr: { message: string } } | null {
    const currDate = new Date();
    if (new Date(control.value) > currDate) {
      return { errorStr: { message: 'The date is invalid' } };
    }
    return null;
  }

  public addTag(): void {
    const tagForm = this.builder.group({
      tag: ['', Validators.required],
    });
    if (this.tags.length < 5) this.tags.push(tagForm);
  }

  public resetTags(): void {
    while (this.tags.length !== 0) {
      this.tags.removeAt(0);
    }
    this.addTag();
  }

  public createCard() {
    const newCustomCard: Record<string, IItem> = {};
    const { title, description, img, link, date, tags } =
      this.adminForm.getRawValue();
    const generateId: string = uuidv4();
    if (title && description && img && link && date && tags) {
      const videoObj: IItem = {
        id: generateId,
        snippet: {
          publishedAt: date,
          title: title,
          description: description,
          thumbnails: {
            default: {
              url: img,
            },
            medium: {
              url: img,
            },
          },
          tags: tags,
        },
        isCustom: true,
      };
      newCustomCard[generateId] = videoObj;
      this.store.dispatch(createCard({ payload: newCustomCard }));
    }
  }
}
