import { Component } from "react";


export default class Tile extends Component{
    
    

    render(){
        const {tile} = this.props;
        const tilePoints = {'E': 1, 'A': 1, 'I': 1, 
                            'O': 1, 'N': 1, 'R': 1, 'T': 1, 
                            'L': 1, 'S': 1, 'U': 1, 'D': 2, 
                            'G': 2, 'B': 3, 'C': 3, 'M': 3, 
                            'P': 3, 'F': 4, 'H': 4, 'V': 4, 
                            'W': 4, 'Y': 4, 'K': 5, 'J': 8, 
                            'X': 8, 'Q': 10, 'Z': 10}
        return(
            <div className="logo w-14 h-14 bg-[#ffeab8] hover:scale-110 
            hover:shadow-lg cursor-pointer mx-2 border-b-4 border-r-2 border-t-3 border-l-3 border-[#c79e7b]
             relative p-2 flex flex-flow-col justify-center items-center rounded-lg">
                <div className="w-full h-1/2 z-10 top-0 rounded-b-[30px] bg-[#ffffff4d] absolute">

                </div>
                <div className="text-[40px] text z-20 text-[#003314] font-bold">
                    {tile}
                </div><div className="text-[10px] font-bold absolute bottom-0 right-0 m-1">
                    {tilePoints[tile]}
                </div>
            </div>
        )
    }
}