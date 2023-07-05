import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { note } from './note.model';
import { NoteServices } from './Services/note-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Keeper';
  loading: boolean = false;
  editMode: boolean = false;
  year = new Date().getFullYear();

  @ViewChild('inputSection') form: NgForm;
  notes = [];
  // notesType=[]

  constructor(private noteService: NoteServices) {}

  ngOnInit() {
    this.onDisplayNotes();
  }

  writeMode: boolean = false;

  note: boolean = false;

  onTextAreaClick() {
    this.writeMode = true;
  }

  onAddBtnClick(inputNote: note) {
    this.loading = true;
    this.note = true;
    if (inputNote.desc !== '' && inputNote.title !== '') {
      this.noteService.createNote(inputNote).subscribe(() => {
        this.onDisplayNotes();
        this.form.setValue({
          title: '',
          desc: '',
        });
        this.loading = false;
      });
    } else {
      alert('Please Enter Title & Description');
    }
  }

  onDisplayNotes() {
    this.noteService.fetchNote().subscribe((res) => {
      this.notes = res;
    });
  }

  onEditNote(note: note) {
    this.editMode = true
    console.log(this.editMode);
    
    console.log(note);
    // this.form.setValue({
    //   title: note.title,
    //   desc:note.desc
    // })
    this.noteService.editNote(note.id);

  }

  onDeleteNote(id: string) {
    this.loading = true;
    if (confirm('Do you want to delete the Note?')) {
      this.noteService.deleteNote(id).subscribe(() => {
        this.onDisplayNotes();
        this.loading = false;
      });
    }
  }
}
