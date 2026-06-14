import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SpotifyService } from '../../services/spotify.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50" cdkDrag>
      <div class="w-72 overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        <!-- Header / Drag Handle -->
        <div class="flex items-center justify-between bg-slate-800/50 px-3 py-2 cursor-move" cdkDragHandle>
          <div class="flex items-center gap-2">
            <svg class="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.291c-.217.356-.677.472-1.033.255-2.85-1.741-6.439-2.134-10.665-1.168-.407.093-.815-.162-.908-.569-.093-.407.162-.815.569-.908 4.629-1.059 8.591-.61 11.782 1.339.356.218.472.678.255 1.051zm1.47-3.262c-.273.444-.853.584-1.297.31-3.262-2.004-8.23-2.585-12.086-1.415-.502.152-1.034-.131-1.186-.633-.152-.502.131-1.034.633-1.186 4.412-1.338 9.891-.689 13.626 1.603.444.273.584.853.31 1.297v.024zm.126-3.414c-3.911-2.321-10.363-2.535-14.129-1.391-.6.182-1.235-.164-1.417-.764-.182-.6.164-1.235.764-1.417 4.316-1.31 11.439-1.053 15.952 1.625.54.32.716 1.013.396 1.553-.32.54-1.013.716-1.553.396l-.013-.002z"/>
            </svg>
            <span class="text-xs font-medium text-slate-300">Spotify</span>
          </div>
          <button (click)="showSettings = !showSettings" class="text-slate-400 hover:text-white transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div class="p-4">
          <!-- SDK Status Badge -->
          <div *ngIf="spotify.isAuthenticated() && !showSettings" class="mb-3 flex items-center justify-between">
            <span class="flex items-center gap-1.5 text-[10px] font-medium" [class.text-green-500]="spotify.deviceId()" [class.text-slate-500]="!spotify.deviceId()">
              <span class="h-1.5 w-1.5 rounded-full" [class.bg-green-500]="spotify.deviceId()" [class.bg-slate-500]="!spotify.deviceId()"></span>
              {{ spotify.deviceId() ? 'Đã kết nối trình duyệt' : 'Đang khởi tạo Player...' }}
            </span>
            <button 
              *ngIf="!spotify.deviceId()" 
              (click)="spotify.initializePlayer()" 
              class="text-[9px] text-slate-400 hover:text-white underline"
            >
              Thử lại
            </button>
          </div>

          <!-- Settings Mode -->
          <div *ngIf="showSettings" class="space-y-3">
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Spotify Client ID</label>
            <input 
              [(ngModel)]="tempClientId"
              class="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Nhập Client ID..."
            />
            <button 
              (click)="saveSettings()"
              class="w-full rounded bg-green-600 py-2 text-xs font-bold text-white hover:bg-green-500 transition-colors"
            >
              Lưu & Kết nối
            </button>
            <p class="text-[9px] text-slate-500 text-center">Lấy tại developer.spotify.com</p>
          </div>

          <!-- Player Mode -->
          <div *ngIf="!showSettings">
            <div *ngIf="!spotify.isAuthenticated()" class="text-center space-y-3 py-4">
              <p class="text-sm text-slate-400">Kết nối để nghe nhạc</p>
              <button 
                (click)="spotify.login()"
                class="rounded-full bg-green-600 px-6 py-2 text-xs font-bold text-white hover:bg-green-500 transition-colors"
              >
                Đăng nhập Spotify
              </button>
            </div>

            <div *ngIf="spotify.isAuthenticated()" class="space-y-4">
              <!-- Song Info -->
              <div class="flex items-center gap-3">
                <img 
                  [src]="currentTrack()?.album?.images[0]?.url || 'https://via.placeholder.com/64'" 
                  class="h-12 w-12 rounded shadow-lg object-cover"
                />
                <div class="overflow-hidden">
                  <h4 class="truncate text-sm font-semibold text-white">
                    {{ currentTrack()?.name || 'Không có bài hát' }}
                  </h4>
                  <p class="truncate text-xs text-slate-400">
                    {{ currentTrack()?.artists[0]?.name || 'Spotify' }}
                  </p>
                </div>
              </div>

              <!-- Controls -->
              <div class="flex items-center justify-center gap-6">
                <button (click)="spotify.previous()" class="text-slate-400 hover:text-white transition-colors">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z"/></svg>
                </button>
                <button 
                  (click)="togglePlay()"
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
                >
                  <svg *ngIf="isPlaying()" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  <svg *ngIf="!isPlaying()" class="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <button (click)="spotify.next()" class="text-slate-400 hover:text-white transition-colors">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 18V6h2v12h-2zM6 18V6l8.5 6L6 18z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .cdk-drag-preview {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
    .cdk-drag-placeholder {
      opacity: 0;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export class MusicPlayerComponent implements OnInit {
  spotify = inject(SpotifyService);
  
  showSettings = false;
  tempClientId = '';
  
  currentTrack = signal<any>(null);
  isPlaying = signal<boolean>(false);

  constructor() {
    this.tempClientId = this.spotify.clientId();
    
    // Polling for playback state
    effect((onCleanup) => {
      if (this.spotify.isAuthenticated()) {
        const interval = setInterval(() => this.updatePlayback(), 3000);
        onCleanup(() => clearInterval(interval));
      }
    });
  }

  ngOnInit() {
    this.initAuth();
  }

  async initAuth() {
    await this.spotify.handleAuth();
    if (this.spotify.isAuthenticated()) {
      this.updatePlayback();
    }
  }

  async updatePlayback() {
    const data = await this.spotify.getCurrentPlayback();
    if (data) {
      this.currentTrack.set(data.item);
      this.isPlaying.set(data.is_playing);
    }
  }

  saveSettings() {
    this.spotify.setClientId(this.tempClientId);
    this.showSettings = false;
    this.spotify.login();
  }

  async togglePlay() {
    await this.spotify.togglePlay(this.isPlaying());
    setTimeout(() => this.updatePlayback(), 500);
  }
}
