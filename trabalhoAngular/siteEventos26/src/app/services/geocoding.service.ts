import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  buscarLocalizacao(endereco: string): Observable<GeocodingResult[]> {
    return this.http.get<GeocodingResult[]>(this.nominatimUrl, {
      params: {
        q: endereco,
        format: 'json',
        limit: '1'
      }
    });
  }
}
