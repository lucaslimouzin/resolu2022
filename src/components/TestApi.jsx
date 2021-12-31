import React, { useState, useEffect,  } from 'react';
import axios from 'axios';

const url = "https://api.unsplash.com/photos/random/?client_id=PNSdPNlri3siqZYnSDRjfdwtBX9f7a6aAYO_EubAxeQ"

const TestApi = () => {
    
    
    const [resoData, setResoData] = useState('Bonne année 2022 !!!'); //variable pour récupérer les résolutions (on initialise ici)
    const [userData, setUserData] = useState(''); //variable pour récupérer le nom de l'auteur
    const [userLinksData, setUserLinksData] = useState(''); //variable pour récupérer le lien de l'auteur
    const [imgData, setImgData] = useState('http://www.adao.fr/wp-content/uploads/2014/12/fond-noir.png'); //variable pour récupérer l 'images
    let user = '';
    //pour récupérer les données dans une api via axios .data pour récupérer l'objet

    const getImg = () => {
        axios.get(url)
        .then(result => {
            setImgData(result.data.urls.regular) 
            setUserData (result.data.user.first_name)
            setUserLinksData (result.data.user.links.html)
            
        }).catch(err => {
            console.log(err)
        })
    }
    
    // pour récupérer données des resolutions api créé
    const getResolution = () => {
        
        axios.get('https://retoolapi.dev/jlXeoU/data')
        .then(result => {
            const int = Math.floor(Math.random() * 150);
            setResoData(result.data[int].resolutions ? result.data[int].resolutions :"la vie est belle" )
        }).catch(err => {
            console.log(err)
        })
    }
    
    const execution = () => {
        getImg();
        getResolution();
    }
        

        return (
            
            <div className="flex justify-start items-center flex-col h-screen bg-black">
                <div className ="relative w-full h-full">
                    <img src={imgData} alt="" className="w-full h-full object-cover" onerror="this.style.display='none'"
                    />
                   
                </div> 
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 ">
                    <div className="w-4/5 h-1/3 flex items-center justify-center flex-col rounded-3xl shadow-[10px_10px] opacity-60 max-w-lg bg-white">
                        <p className="flex items-center justify-center text-center p-2 h-3/4 text-3xl">{resoData} </p> 
                        <button onClick={execution} className="relative flex justify-center items-center rounded-full cursor-pointer border-2 border-red-700 w-auto h-1/5 p-2 ">Générer une résolution</button>
                    </div>
                    <div className="flex justify-end pt-3">
                        Photo by &nbsp; <a href={userLinksData} target="_blank" className="cursor-pointer font-bold">{userData}</a>&nbsp; in &nbsp; <a href="https://unsplash.com/" target="blank">Unsplash</a>
                    </div>
                </div>
                
                
            </div>
        )
    }

    export default TestApi