import { Component } from "react";
import Tile from "./Tile";


export default class Words extends Component{
    render(){
        const { words } = this.props;
        
        return(
            <div className="w-fit flex-wrap flex flex-row h-fit p-30 h-full">
                { 
                   
                    words.map(word =>{
                        return(
                            <div className="flex flex-wrap m-5">
                                {
                                    word.split('').map(tile => { 
                                        return(
                                            <Tile
                                                tile={tile}/>
                                        )
                                        
                                    })
                                }
                            </div>
                        )
                    })  
                }
            </div>
           
        )
    }
}