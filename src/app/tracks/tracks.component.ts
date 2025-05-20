import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Track } from './track.interface';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.css'
})
export class TracksComponent {
  tracks: Track[] = [
    {
      id: 1,
      name: 'MEAN Stack',
      description: 'Learn to build full-stack applications using MongoDB, Express.js, Angular, and Node.js. This track covers everything from frontend to backend development.',
      duration: '3 months',
      instructor: 'John Doe',
      topics: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'TypeScript']
    },
    {
      id: 2,
      name: 'MERN Stack',
      description: 'Master the MERN stack (MongoDB, Express.js, React, Node.js) to create modern web applications. Learn both frontend and backend development.',
      duration: '3 months',
      instructor: 'Jane Smith',
      topics: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript']
    },
    {
      id: 3,
      name: 'Python Full Stack',
      description: 'Develop full-stack applications using Python. Learn Django, Flask, and modern frontend technologies.',
      duration: '3 months',
      instructor: 'Mike Johnson',
      topics: ['Python', 'Django', 'Flask', 'SQL', 'HTML/CSS']
    }
  ];

  selectedTrack = signal<Track | null>(null);

  onTrackSelect(track: Track) {
    this.selectedTrack.set(track);
  }
}
