import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MusicPlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly themeService = inject(ThemeService);
}
