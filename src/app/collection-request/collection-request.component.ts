import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { CollectionRequestService } from '../services/collection-request/collection-request.service';
import { CollectionFormData, WasteEntry } from '../interfaces/collection-request.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-collection-request',
  templateUrl: './collection-request.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CollectionRequestComponent implements OnInit, OnDestroy {
  readonly wasteTypes = ['plastique', 'verre', 'papier', 'metal'] as const;

  collectionRequest: CollectionFormData = this.getInitialFormState();
  submissionStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  minDate = new Date();

  protected readonly maxTotalWeight = 10000;
  private readonly minWasteWeight = 1000;
  private destroy$ = new Subject<void>();

  constructor(private requestService: CollectionRequestService) {}

  ngOnInit(): void {
    this.setMinDate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get totalWeight(): number {
    return Object.values(this.collectionRequest.wastes)
      .reduce((total, waste) =>
        total + (waste.selected ? (waste.weight || 0) : 0), 0);
  }

  get anyWasteSelected(): boolean {
    return Object.values(this.collectionRequest.wastes)
      .some(waste => waste.selected);
  }

  isWasteWeightValid(waste: WasteEntry): boolean {
    return !waste.selected || (waste.weight !== null && waste.weight >= this.minWasteWeight);
  }

  onSubmit(form: NgForm): void {
    if (this.isFormInvalid(form)) {
      return;
    }

    this.submissionStatus = 'loading';

    const requestData = {
      ...this.collectionRequest,
      totalWeight: this.totalWeight
    };

    this.requestService.createRequest(requestData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSubmissionSuccess(form),
        error: (error) => this.handleSubmissionError(error)
      });
  }

  private isFormInvalid(form: NgForm): boolean {
    return (
      form.invalid ||
      this.totalWeight > this.maxTotalWeight ||
      !this.anyWasteSelected ||
      Object.values(this.collectionRequest.wastes)
        .some(waste => !this.isWasteWeightValid(waste))
    );
  }

  private handleSubmissionSuccess(form: NgForm): void {
    this.submissionStatus = 'success';
    this.resetForm(form);
    setTimeout(() => this.submissionStatus = 'idle', 3000);
  }

  private handleSubmissionError(error: Error): void {
    console.error('Error submitting form:', error);
    this.submissionStatus = 'error';
    setTimeout(() => this.submissionStatus = 'idle', 3000);
  }

  private resetForm(form: NgForm): void {
    this.collectionRequest = this.getInitialFormState();
    form.resetForm(this.collectionRequest);
  }

  private getInitialFormState(): CollectionFormData {
    return {
      wastes: this.wasteTypes.reduce((acc, type) => ({
        ...acc,
        [type]: { selected: false, weight: null }
      }), {} as Record<string, WasteEntry>),
      address: '',
      date: '',
      time: '',
      notes: ''
    };
  }

  private setMinDate(): void {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  }
}
