import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private http = inject(HttpClient);
  
  clientId = signal<string>(localStorage.getItem('spotify_client_id') || '');
  accessToken = signal<string | null>(localStorage.getItem('spotify_token'));
  deviceId = signal<string | null>(null);
  
  isAuthenticated = computed(() => !!this.accessToken());
  
  private redirectUri = window.location.origin;
  private scope = 'streaming user-read-playback-state user-modify-playback-state user-read-currently-playing';
  private player: any;

  constructor() {
    this.setupSdkReadyCallback();
  }

  private setupSdkReadyCallback() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (this.isAuthenticated()) {
        this.initializePlayer();
      }
    };
  }

  initializePlayer() {
    if (!this.accessToken() || this.player) return;

    this.player = new window.Spotify.Player({
      name: 'Dev Roadmaps Player',
      getOAuthToken: (cb: any) => { cb(this.accessToken()); },
      volume: 0.5
    });

    this.player.addListener('ready', ({ device_id }: any) => {
      console.log('Ready with Device ID', device_id);
      this.deviceId.set(device_id);
      this.transferPlayback(device_id);
    });

    this.player.addListener('not_ready', ({ device_id }: any) => {
      console.log('Device ID has gone offline', device_id);
      this.deviceId.set(null);
    });

    this.player.addListener('initialization_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('authentication_error', ({ message }: any) => { 
      console.error(message);
      this.logout();
    });
    this.player.addListener('account_error', ({ message }: any) => { 
      alert('Lỗi tài khoản: ' + message + '. Bạn cần Spotify Premium.');
    });

    this.player.connect();
  }

  async transferPlayback(deviceId: string) {
    try {
      await firstValueFrom(
        this.http.put('https://api.spotify.com/v1/me/player', {
          device_ids: [deviceId],
          play: true
        }, { headers: this.getHeaders() })
      );
    } catch (e) {
      console.error('Failed to transfer playback', e);
    }
  }

  private generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  setClientId(id: string) {
    this.clientId.set(id);
    localStorage.setItem('spotify_client_id', id);
  }

  async login() {
    if (!this.clientId()) {
      alert('Vui lòng nhập Spotify Client ID trong phần cài đặt.');
      return;
    }

    const codeVerifier = this.generateRandomString(128);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: this.clientId(),
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      show_dialog: 'true'
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async handleAuth() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const codeVerifier = localStorage.getItem('spotify_code_verifier');
      if (!codeVerifier) return false;

      try {
        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
          client_id: this.clientId(),
          code_verifier: codeVerifier
        });

        const response = await firstValueFrom(
          this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
        );

        if (response.access_token) {
          this.accessToken.set(response.access_token);
          localStorage.setItem('spotify_token', response.access_token);
          localStorage.removeItem('spotify_code_verifier');
          
          // Clean up URL
          const url = new URL(window.location.href);
          url.searchParams.delete('code');
          window.history.replaceState({}, document.title, url.toString());
          return true;
        }
      } catch (error) {
        console.error('Error exchanging code for token', error);
      }
    }

    // Fallback to check hash (for backward compatibility or if some tokens still come this way)
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const token = hashParams.get('access_token');
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
    } catch (e: any) {
      this.handlePlayerError(e);
      return null;
    }
  }

  async previous() {
    try {
      return await firstValueFrom(
        this.http.post('https://api.spotify.com/v1/me/player/previous', {}, { headers: this.getHeaders() })
      );
    } catch (e: any) {
      this.handlePlayerError(e);
      return null;
    }
  }

  async togglePlay(isPlaying: boolean) {
    const endpoint = isPlaying ? 'pause' : 'play';
    try {
      return await firstValueFrom(
        this.http.put(`https://api.spotify.com/v1/me/player/${endpoint}`, {}, { headers: this.getHeaders() })
      );
    } catch (e: any) {
      this.handlePlayerError(e);
      return null;
    }
  }

  private handlePlayerError(e: any) {
    if (e.status === 403) {
      alert('Lỗi: Bạn cần tài khoản Spotify Premium để sử dụng tính năng điều khiển nhạc.');
    } else if (e.status === 404) {
      alert('Lỗi: Không tìm thấy thiết bị đang phát. Hãy mở Spotify trên điện thoại hoặc máy tính của bạn.');
    } else if (e.status === 401) {
      this.logout();
    }
  }
}
