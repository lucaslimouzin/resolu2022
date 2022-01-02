import React from 'react'
import axios from 'axios'

const url = "https://api.unsplash.com/photos/random/?client_id=PNSdPNlri3siqZYnSDRjfdwtBX9f7a6aAYO_EubAxeQ"
export default class TestApi extends  React.Component {
    state = {
        resolutions:'',
    }
     
        componentDidMount() {
            this.fetchResolution();
            this.fetchImage();
        }

    fetchResolution= () => {
        axios.get('https://retoolapi.dev/jlXeoU/data')
      .then((response) => {
        const int = Math.floor(Math.random() * 150);
        this.setState({ resolutions: response.data[int].resolutions });
      })
      .catch((error) => {
        console.log(error);
      });
    }

    fetchImage= () => {
        axios.get(url)
      .then((response) => {
        const { regular } = response.data.urls;
        this.setState({ regular });
        const { first_name } = response.data.user;
        this.setState({ first_name });
        const { html } = response.data.user.links.html;
        this.setState({ html });
      })
      .catch((error) => {
        console.log(error);
      });
    }
    execution = () => {
        this.fetchImage();
        this.fetchResolution();
    }

    render() {

        const imgData = this.state.regular;
        const resoData = this.state.resolutions;
        const userLinksData = this.state.html;
        const userData = this.state.first_name;
        return (
            
            <div className="flex justify-start items-center flex-col h-screen bg-black">
                <div className ="relative w-full h-full">
                    <img src={imgData} alt="" className="w-full h-full object-cover" onerror="this.style.display='none'"
                    />
                   
                </div> 
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 ">
                    <div className="w-4/5 h-1/3 flex items-center justify-center flex-col rounded-3xl shadow-[10px_10px] opacity-60 max-w-lg bg-white">
                        <p className="flex items-center justify-center text-center p-2 h-3/4 text-3xl">{resoData} </p> 
                        <button onClick={this.execution} className="relative flex justify-center items-center rounded-full cursor-pointer border-2 border-red-700 w-auto h-1/5 p-2 ">Générer une résolution</button>
                    </div>
                    <div className="flex justify-end pt-3">
                        Photo by &nbsp; <a href={userLinksData} target="_blank" className="cursor-pointer font-bold">{userData}</a>&nbsp; in &nbsp; <a href="https://unsplash.com/" target="blank">Unsplash</a>
                    </div>
                </div>     
            </div>
        )
    }
}




