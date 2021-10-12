import { Observable, timer } from 'rxjs';

export const refresher = (period: number = 30000): Observable<number> => timer(0, period);
