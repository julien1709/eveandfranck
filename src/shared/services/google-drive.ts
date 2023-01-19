import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private readonly API_URL = 'https://www.googleapis.com/drive/v3';
  private accessToken: string;

  constructor(private http: HttpClient) {}

  public authenticate(clientId: string, clientSecret: string, refreshToken: string): void {
    // Use the HttpClient to make a POST request to the Google OAuth 2.0 token endpoint
    // to get an access token using the client ID, client secret, and refresh token
    this.http.post('https://oauth2.googleapis.com/token', {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }).pipe(
      tap((response: any) => {
        // Save the access token
        this.accessToken = response.access_token;
      })
    ).subscribe();
  }

  public getImages(folderId: string): Observable<any> {
    // Use the HttpClient to make a GET request to the Google Drive API to get a list of files in the folder
    return this.http.get(`${this.API_URL}/files`, {
      params: {
        q: `mimeType='image/*' and trashed = false and parents in '${folderId}'`,
        fields: 'nextPageToken, files(id, name)',
        access_token: this.accessToken
      }
    }).pipe(
      map((response: any) => {
        // Map the response to an array of image URLs
        return response.files.map(file => `https://drive.google.com/u/0/uc?id=${file.id}`);
      })
    );
  }
}
