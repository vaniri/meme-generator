import React, { Component } from 'react';
import { render } from 'react-dom';

class MemeContainer extends Component {
  constructor() {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      allMemeimg: [],
      randomMeme: ""    
    }
  }

  getMeme =  async () => {
    const res =  await fetch("https://api.imgflip.com/get_memes");
    const { data } = await res.json();
    this.setState({
      allMemeimg: data.memes
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  getRandomMeme = event => {
    event.preventDefault();
    const randomMeme = this.state.allMemeimg[Math.floor(Math.random() * this.state.allMemeimg.length)];
    this.setState({ randomMeme: randomMeme.url })
  }

  componentDidMount = () => {
    this.getMeme();
  }

  render() {
  return(
    <div>
     <form className="meme-form" onSubmit={this.getRandomMeme}>
       <input 
       type="text"
       name="topText"
       value={this.state.topText}
       onChange={this.handleChange}
       placeholder="top text"
       />
       <input 
       type="text"
       name="bottomText"
       value={this.state.bottomText}
       onChange={this.handleChange}
       placeholder="bottom text"
       />
       <button>GEN</button>
     </form>
     <div className="meme">
       <img src={this.state.randomMeme} alt="" />
      <h2 className="top">{this.state.topText}</h2>
      <h2 className="bottom">{this.state.bottomText}</h2>
     </div>
    </div>
  )}
}

export default MemeContainer;