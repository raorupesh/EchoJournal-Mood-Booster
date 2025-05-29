import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmotionentryproxyService, EmotionEntry } from '../emotionentryproxy.service';

@Component({
  selector: 'app-moodecho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moodecho.component.html',
  styleUrls: ['./moodecho.component.css']
})
export class MoodechoComponent implements OnInit {
    moodEntry: {
    emojiSlider: number;
    feelings: string;
    withWhom: string;
    location: string;
    id?: string;
  } = {
    emojiSlider: 5,
    feelings: '',
    withWhom: 'friends',
    location: 'home'
  };

  emojiDisplay: string = '😐';
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private emotionService: EmotionentryproxyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.emotionService.getEmotionEntryById(id).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            const entry = res.data;
            this.moodEntry = {
              emojiSlider: entry.moodScore,
              feelings: entry.feelings.join(', '),
              withWhom: entry.people[0] || 'friends',
              location: entry.place[0] || 'home',
              id: entry.id
            };
            this.updateEmoji(entry.moodScore);
          } else {
            this.errorMessage = 'No entry found with this ID.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to load entry.';
          console.error(err);
        }
      });
    }
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
    if (form.invalid) return;

    this.isSubmitting = true;

    const feelingsArray = this.moodEntry.feelings
      .split(',')
      .map(feeling => feeling.trim())
      .filter(feeling => feeling.length > 0)


    const emotionEntry: EmotionEntry = {
      moodScore: Number(this.moodEntry.emojiSlider),
      feelings: feelingsArray,
      people: [this.moodEntry.withWhom],
      place: [this.moodEntry.location],
      date: new Date()
    };

    if (this.moodEntry.id) {
      this.emotionService.updateEmotionEntry(this.moodEntry.id, emotionEntry).subscribe({
        next: () => {
          this.successMessage = 'Mood entry updated successfully!';
          this.errorMessage = '';
          this.isSubmitting = false;
          this.router.navigate(['/moodechohistory']);
        },
        error: (err) => {
          this.errorMessage = 'Error updating mood entry.';
          this.successMessage = '';
          this.isSubmitting = false;
        }
      });
    } else {
      this.emotionService.createEmotionEntry(emotionEntry).subscribe({
        next: () => {
          this.successMessage = 'Mood entry saved successfully!';
          this.errorMessage = '';
          this.isSubmitting = false;
          form.resetForm({ emojiSlider: 5, withWhom: 'friends', location: 'home' });
          this.emojiDisplay = '😐';
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Error saving mood entry.';
          this.successMessage = '';
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}