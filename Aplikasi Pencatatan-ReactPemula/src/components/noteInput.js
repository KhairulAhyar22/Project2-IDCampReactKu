import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      limit: 50,
    }
    this.onTitleChageEventHandler = this.onTitleChageEventHandler.bind(this);
    this.onBodyChageEventHandler = this.onBodyChageEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }
  onTitleChageEventHandler(event) {
    this.setState((prev) => {
      if(prev.limit > 0){
        return {
          title: event.target.value,
          limit: prev.limit - 1
        }
      }
    })
  }
  onBodyChageEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      }
    })
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    document.getElementById('title').value = "";
    document.getElementById('note').value = "";
    this.setState(() => {
      return {
        title: "",
        body: "",
        limit: 50,
      }
    })
  }
  render() {
    return (
      <form className="note-input" onSubmit={this.onSubmitEventHandler}>
        <h2>Buat Catatan</h2>
        <p className="note-input__title__char-limit">Sisa Karakter {this.state.limit}</p>
        <input className="note-input__title" type="text" id="title"placeholder="Masukkan Judul" onChange={this.onTitleChageEventHandler}/>
        <textarea className="note-input__body" type="text" id="note" placeholder="Masukkan Catatan" onChange={this.onBodyChageEventHandler}/>
        <button type="submit">Buat</button>
      </form>
    )
  }
}

export default NoteInput;