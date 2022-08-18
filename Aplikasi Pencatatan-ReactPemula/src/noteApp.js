import React from 'react';
import NoteList from './components/noteList';
import { getInitialData } from './utils/data';
import NoteInput from './components/noteInput';
import NoteHeader from './components/noteHeader';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: ""
    }
    this.onSearchEventhandler = this.onSearchEventhandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
  }
  onSearchEventhandler(title) {
    this.setState(() => {
      return {
        search: title
      }
    })
  }
  onDeleteEventHandler(id){
    const notes = this.state.notes.filter((n) => n.id !== id);
    this.setState({notes});
  }
// ini tidak saya hapus, agar suatu saat saya masih bisa melihatnya
                  // onArchiveEventHandler(id){
                  //   const notes = this.state.notes.map((n) => n.id === id ?
                  //   { 
                  //     ...n, 
                  //     archived : !n.archived
                  //   } : n);

                  //   this.setState({ notes });
                  // }
  onArchiveEventHandler(id){
    const notes = this.state.notes.map((n) => {
      if(n.id === id){
        return { 
          ...n, 
          archived : !n.archived
        }
      }
      return n
    });
    this.setState({ notes });
  }

  onAddNoteHandler({title, body}){
    this.setState((prev) => {
      return {
        notes: [
          ...prev.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: Date(),
          }
        ]
      }
    })
  }
  render() {
    const notes = this.state.notes.filter((n) => n.title.toLowerCase().includes(this.state.search.toLowerCase()));
    const listNotes = notes.filter((n) => n.archived === false);
    const archidNotes = notes.filter((n) => n.archived === true);    
    return (
      <React.Fragment>
        <NoteHeader onSearch={this.onSearchEventhandler}/>
        <div className='note-app__body'>
          <NoteInput addNote={this.onAddNoteHandler}/>
          <h2>Catatan Aktif</h2>
          <NoteList notes={listNotes} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler}/>
          <h2>Arsip</h2>
          <NoteList notes={archidNotes} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler}/>
        </div>
      </React.Fragment>
    )
  }
}

export default NoteApp;