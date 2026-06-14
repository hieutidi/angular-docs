import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isRoadmapTrack } from '../models/track.model';

export const trackGuard: CanActivateFn = (route) => {
  const track = route.paramMap.get('track');
  if (track && isRoadmapTrack(track)) return true;
  return inject(Router).createUrlTree(['/']);
};
