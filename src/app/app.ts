import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MusicPlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
