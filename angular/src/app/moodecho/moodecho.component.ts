import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmotionentryproxyService, EmotionEntry } from '../emotionentryservice.service';

@Component({
  selector: 'app-moodecho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moodecho.component.html',
  styleUrls: ['./moodecho.component.css']
})
export class MoodechoComponent implements OnInit {
  moodEntry = {
    emojiSlider: 5,
    feelings: '',
    withWhom: 'friends',
    location: 'home'
  };

  emojiDisplay: string = '😐';
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private emotionService: EmotionentryproxyService, private router: Router) {}

  ngOnInit(): void {
  }

  updateEmoji(value: number): void {
    const val = Number(value);
    switch (val) {
      case 1:
        this.emojiDisplay = '😢';
        break;
      case 2:
        this.emojiDisplay = '🙁';
        break;
      case 3:
        this.emojiDisplay = '😞';
        break;
      case 4:
        this.emojiDisplay = '😕';
        break;
      case 5:
        this.emojiDisplay = '😐';
        break;
      case 6:
        this.emojiDisplay = '🙂';
        break;
      case 7:
        this.emojiDisplay = '😊';
        break;
      case 8:
        this.emojiDisplay = '😃';
        break;
      case 9:
        this.emojiDisplay = '😄';
        break;
      case 10:
        this.emojiDisplay = '😁';
        break;
      default:
        this.emojiDisplay = '😐';
        break;
    }
  }
  
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;
    
    // Convert comma-separated feelings to an array
    const feelingsArray = this.moodEntry.feelings
      .split(',')
      .map(feeling => feeling.trim())
      .filter(feeling => feeling.length > 0);

    // Prepare the data in the format expected by the backend
    const emotionEntry: EmotionEntry = {
      moodScore: Number(this.moodEntry.emojiSlider),
      feelings: feelingsArray,
      people: [this.moodEntry.withWhom],
      place: [this.moodEntry.location],
      date: new Date()
    };

    this.emotionService.createEmotionEntry(emotionEntry).subscribe({
      next: (response) => {
        this.successMessage = 'Mood entry saved successfully!';
        this.errorMessage = '';
        form.resetForm({ emojiSlider: 5, withWhom: 'friends', location: 'home' });
        this.emojiDisplay = '😐';
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Error saving mood entry. Please try again.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}