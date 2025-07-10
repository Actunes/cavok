import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-tod-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tod-calculator.html',
  styleUrls: ['./tod-calculator.scss']
})
export class TodCalculator implements OnInit {

  todForm: FormGroup;
  todDistance: number | null = null;
  timeToDescend: number | null = null;

  constructor(private fb: FormBuilder) {
    this.todForm = this.fb.group({
      currentAltitude: [35000],
      targetAltitude: [10000],
      groundSpeed: [250],
      descentRate: [1500]
    });
  }

  ngOnInit(): void {
    this.calculateTod();


    this.todForm.valueChanges.pipe(
      filter(() => this.todForm.valid),
      debounceTime(300)
    ).subscribe(() => {
      this.calculateTod();
    });
  }

  calculateTod(): void {
    const values = this.todForm.getRawValue();

    const altitudeToLose = values.currentAltitude - values.targetAltitude;
    if (altitudeToLose <= 0 || values.descentRate <= 0) {
      this.todDistance = null;
      this.timeToDescend = null;
      return;
    }

    const timeInMinutes = altitudeToLose / values.descentRate;
    const distanceInNM = (values.groundSpeed / 60) * timeInMinutes;

    this.todDistance = parseFloat(distanceInNM.toFixed(1));
    this.timeToDescend = parseFloat(timeInMinutes.toFixed(1));
  }
}