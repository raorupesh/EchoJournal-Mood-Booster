import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {
    // Initialization logic if needed
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
    try {
      let entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
      const newEntry = { 
        ...this.moodEntry, 
        timestamp: new Date().toISOString() 
      };
      entries.push(newEntry);
      localStorage.setItem('moodEntries', JSON.stringify(entries));
      
      this.successMessage = 'Mood entry saved successfully!';
      this.errorMessage = '';
      form.resetForm({ emojiSlider: 5, withWhom: 'friends', location: 'home' });
      this.emojiDisplay = '😐';
    } catch (error) {
      this.errorMessage = 'Error saving mood entry.';
      this.successMessage = '';
      console.error('Error on saving mood entry:', error);
    }

    this.isSubmitting = false;
  }

  goBack(): void {
    window.history.back();
  }

}