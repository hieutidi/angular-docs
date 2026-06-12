import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private http = inject(HttpClient);
  
  clientId = signal<string>(localStorage.getItem('spotify_client_id') || '');
  accessToken = signal<string | null>(localStorage.getItem('spotify_token'));
  
  isAuthenticated = computed(() => !!this.accessToken());
  
  private redirectUri = window.location.origin;
  private scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing';

  setClientId(id: string) {
    this.clientId.set(id);
    localStorage.setItem('spotify_client_id', id);
  }

  login() {
    if (!this.clientId()) {
      alert('Vui lòng nhập Spotify Client ID trong phần cài đặt.');
      return;
    }
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId()}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  }

  handleAuth() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    if (token) {
      this.accessToken.set(token);
      localStorage.setItem('spotify_token', token);
      window.location.hash = '';
      return true;
    }
    return false;
  }

  logout() {
    this.accessToken.set(null);
    localStorage.removeItem('spotify_token');
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken()}`
    });
  }

  async getCurrentPlayback() {
    if (!this.accessToken()) return null;
    try {
      return await firstValueFrom(
        this.http.get<any>('https://api.spotify.com/v1/me/player', { headers: this.getHeaders() })
      );
    } catch (e) {
      if ((e as any).status === 401) {
        this.logout();
      }
      return null;
    }
  }

  async next() {
    try {
      return await firstValueFrom(
        this.http.post('https://api.spotify.com/v1/me/player/next', {}, { headers: this.getHeaders() })
      );
    } catch (e) {
      return null;
    }
  }

  async previous() {
    try {
      return await firstValueFrom(
        this.http.post('https://api.spotify.com/v1/me/player/previous', {}, { headers: this.getHeaders() })
      );
    } catch (e) {
      return null;
    }
  }

  async togglePlay(isPlaying: boolean) {
    const endpoint = isPlaying ? 'pause' : 'play';
    try {
      return await firstValueFrom(
        this.http.put(`https://api.spotify.com/v1/me/player/${endpoint}`, {}, { headers: this.getHeaders() })
      );
    } catch (e) {
      return null;
    }
  }
}
