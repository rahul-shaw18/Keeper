import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { note } from '../note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteServices {
  __url = 'https://angularnotes-ab602-default-rtdb.firebaseio.com/notes.json';
  constructor(private http: HttpClient) {}

  createNote(inputNote: note) {
    return this.http.post(this.__url, inputNote);
  }

  fetchNote() {
    return this.http.get(this.__url).pipe(
      map((res) => {
        let notes = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            notes.push({ id: key, ...res[key] });
          }
        }
        return notes;
      })
    );
  }

  editNote(id: string,) {

    console.log(
      'https://angularnotes-ab602-default-rtdb.firebaseio.com/notes/' +
        id +
        '.json'
    );
    
    // return this.http.put
    //     'https://angularnotes-ab602-default-rtdb.firebaseio.com/notes/' +id +'.json',note
    //   )
  }

  deleteNote(id: string) {
    return this.http
      .delete(
        'https://angularnotes-ab602-default-rtdb.firebaseio.com/notes/' +
          id +
          '.json'
      )
      ;
  }
}
