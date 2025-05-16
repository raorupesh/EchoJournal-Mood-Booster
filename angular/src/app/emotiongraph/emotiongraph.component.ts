import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-emotiongraph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emotiongraph.component.html',
  styleUrl: './emotiongraph.component.css'
})
export class EmotiongraphComponent implements OnInit {
  emotions = [
    { day: 'Mon', emotionTags: ['happy', 'thrilled', 'energetic'], intensity: 7 },
    { day: 'Tue', emotionTags: ['calm', 'peaceful', 'serene'], intensity: 5 },
    { day: 'Wed', emotionTags: ['stressed', 'anxious', 'worried'], intensity: 8 },
    { day: 'Thu', emotionTags: ['focused', 'determined', 'concentrated'], intensity: 6 },
    { day: 'Fri', emotionTags: ['excited', 'enthusiastic', 'eager'], intensity: 9 },
    { day: 'Sat', emotionTags: ['relaxed', 'comfortable', 'at ease'], intensity: 4 },
    { day: 'Sun', emotionTags: ['contented', 'satisfied', 'fulfilled'], intensity: 7 }
  ];

  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('emotionChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.emotions.map(e => e.day),
          datasets: [{
            label: '',
            data: this.emotions.map(e => e.intensity),
            borderColor: '#4CAF50',
            tension: 0.25,
            fill: false,
            pointRadius: 2,
            pointBackgroundColor: '#4CAF50'
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
                label: (context: any) => {
                  const dataIndex = context.dataIndex;
                  const emotion = this.emotions[dataIndex];
                  return [
                    emotion.intensity.toString(),
                    emotion.emotionTags.join(', ')
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
                color: 'rgba(0, 0, 0, 0.05)'  // Lighter grid lines
              },
              ticks: {
                padding: 10
              },
              border: {
                display: false
              }
            },
            x: {
              grid: {
                display: false  // Hide x-axis grid
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
    }
  }
}
