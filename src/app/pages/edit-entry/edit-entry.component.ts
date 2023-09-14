import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Entry } from '@interfaces';
import { Observable } from 'rxjs';
import { EntryService } from 'src/app/services/entry-service/entry-service.service';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css'],
})
export class EditEntryComponent implements OnInit {
  @Input('entry') entry: Entry | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  entryService: EntryService = inject(EntryService);
  fb: FormBuilder = inject(FormBuilder);

  editForm: FormGroup = this.fb.group({
    foodName: [''],
    gramsPerServing: [''],
    calories: [''],
    fat: [''],
    carbs: [''],
    protein: [''],
  });

  params: Observable<Params> = this.route.params;

  // needs work
  editEntry(entryName: string | undefined): void {
    const { foodName, gramsPerServing, calories, fat, carbs, protein } =
      this.editForm.getRawValue();
    this.entryService.updateEntryToDB({
      name: foodName,
      gramsPerServing,
      calories,
      fat,
      carbs,
      protein,
    });
  }

  deleteEntry(entryName: string | undefined) {
    this.entryService.deleteEntryFromDB(entryName as string);
  }

  ngOnInit() {}
}
