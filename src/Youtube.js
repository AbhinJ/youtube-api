import React , { Component } from 'react';

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyCgUGzgyqaoFQc6_H-nMowL1eu11Tukcd8&channelId=UClVIlK8QHZ2PFkXF97bA0lg&part=snippet,id&order=date&maxResults=10
export default class Youtube extends Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    this.state = {
      maxresult: '1'
    };
  }
  change(event){
  this.setState({maxresult: event.target.value});
  console.log(this.state.maxresult);
  }


  render(){
    const maxresult = this.state.maxresult;
    return(
      <div>
        <div>
        <label>
          How many videos you want to see:
        </label>
        <input type="number" value={maxresult} onChange={this.change} className="init" />
        <Search
        change={maxresult} />
        </div>

      </div>
    );
  }
}

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      VideoLink:[]
    };
  }

  render(){
    if (this.props.change>0){
      const API = 'AIzaSyCgUGzgyqaoFQc6_H-nMowL1eu11Tukcd8';
      const ChannelId = 'UClVIlK8QHZ2PFkXF97bA0lg';
      const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${ChannelId}&part=snippet,id&order=date&maxResults=${this.props.change}`;
      fetch(finalURL)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        const VideoLink = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
        this.setState({VideoLink});
      })
      .catch(error => {
        console.error(error);
      });
    }
    return(
    <div>
      {
        this.state.VideoLink.map((link,i) =>{
          //console.log(link);
          var frame = <div className="youtube" key={i}><iframe width="560" height="315" src={link} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe></div>
          return frame;
        })
      }
      {this.frame}
    </div>
    );
  }
}
