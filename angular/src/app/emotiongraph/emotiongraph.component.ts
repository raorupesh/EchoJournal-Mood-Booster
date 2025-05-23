import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js/auto';
import { EmotionentryproxyService, EmotionEntry } from '../emotionentryproxy.service';

// Register Chart.js components
Chart.register(...registerables);

interface ChartEmotion {
  day: string;
  emotionTags: string[];
  intensity: number;
  date: Date;
}

@Component({
  selector: 'app-emotiongraph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emotiongraph.component.html',
  styleUrl: './emotiongraph.component.css'
})
export class EmotiongraphComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('emotionChart') chartCanvas!: ElementRef;
  
  emotions: ChartEmotion[] = [];
  chart: Chart | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private emotionService: EmotionentryproxyService, private el: ElementRef) {}

  ngOnInit() {
    this.loadEmotionData();
  }

  ngAfterViewInit() {
    // If we already have data loaded when the view initializes, create the chart
    setTimeout(() => {
      if (!this.isLoading && this.emotions.length > 0 && !this.chart) {
        this.createChart();
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadEmotionData() {
    this.isLoading = true;
    
    // Try the monthly endpoint first
    this.emotionService.getRecentEntries().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.processEmotionData(response.data);
        } else {
          this.isLoading = false;
          this.errorMessage = 'No recent emotion data available.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Could not load recent emotion data from server.';        
      }
    });
  }

  processEmotionData(entries: EmotionEntry[]) {
    try {
      // Transform the API response into our ChartEmotion format
      this.emotions = entries.map(entry => {
        // Handle both string dates and Date objects
        const dateValue = entry.date instanceof Date ? entry.date : new Date(entry.date || Date.now());
        
        return {
          day: dateValue.toLocaleDateString('en-US', { weekday: 'short' }),
          emotionTags: entry.feelings ,
          intensity: entry.moodScore,
          date: dateValue
        };
      });

      // Sort by date
      this.emotions.sort((a, b) => a.date.getTime() - b.date.getTime());
      
      this.isLoading = false;
      
      // Create or update chart after data is processed and DOM is ready
        this.createChart();
    } catch (err) {
      this.isLoading = false;
      this.errorMessage = 'Error processing emotion data.';
    }
  }

  createChart() {
    if (this.emotions.length === 0) {
      return;
    }
    
    // Get the canvas element
    const canvas = document.getElementById('emotionChart') as HTMLCanvasElement;
    if (!canvas) {
      // this.errorMessage = 'Cannot find chart canvas element';
      return;
    }
    
    // If chart already exists, destroy it first
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      // this.errorMessage = 'Cannot get 2D context from canvas';
      return;
    }
    
    try {
      // Create new chart
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.emotions.map(e => e.day),
          datasets: [{
            label: 'Mood Score',
            data: this.emotions.map(e => e.intensity),
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.25,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#4CAF50',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#2E7D32'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const index = tooltipItems[0].dataIndex;
                  const emotion = this.emotions[index];
                  return emotion.date.toLocaleDateString();
                },
                label: (context) => {
                  const dataIndex = context.dataIndex;
                  const emotion = this.emotions[dataIndex];
                  return [
                    `Mood: ${emotion.intensity}`,
                    `Feelings: ${emotion.emotionTags.join(', ')}`
                  ];
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 10,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                padding: 10,
                callback: function(value) {
                  return value;
                }
              },
              border: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                padding: 10
              },
              border: {
                display: false
              }
            }
          }
        }
      });
    } catch (err) {
      this.errorMessage = 'Error rendering emotion chart';
    }
  }
}
