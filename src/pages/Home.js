import {useState} from 'react';
import Dictionary from '../assets/dictionary.txt'
import Words from '../components/Words';
import Tile from '../components/Tile';
export default function Home(){
    const [text,setText] = useState(); 
    const [words, setWords] = useState(['']);
    const [dictionary, setDictionary] = useState(null);
    const [startsWith, setStartsWith] = useState(null);
    const [endsWith, setEndsWith] = useState(null);
    const [maxLength, setMaxLength] = useState(null);
    const [minLength, setMinLength] = useState(null);
    const [amount, setAmount] = useState(null);
    const wildcards = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    //fetch the dictionary on page load
    if(dictionary === null){  
        fetch(Dictionary)
        .then(r => r.text())
        .then(text => {
            setDictionary(text.split('\n'));
        }); 
    }

    function getAllVariants(text){
        var combos =  branchesToWords(tree(text.split('')))
        console.log(combos);
        var uniqueCombos = [...new Set(combos)]
        return uniqueCombos;
    }

    // add permutations in a single array of words 
    function branchesToWords(branches){
        var words = branches.map((str) =>{
            return str.join('');
        })
        return words;
    }

    //return all permutations of the given set of tiles
    var tree = function(leafs) {
        var branches = [];
        if (leafs.length == 1) return leafs;
        for (var k in leafs) {
          var leaf = leafs[k];
          if(leaf == '?'){
              for(var w in wildcards){
                var wildcard = wildcards[w];

                var temp = leafs.join('').replace(leaf,wildcard).split('');
                tree(temp.join('').replace(wildcard, '').split('')).concat("").map(function(subtree) {
                    branches.push([wildcard].concat(subtree));
                });
              }
          }else{
        
           tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
                branches.push([leaf].concat(subtree));
            });
          }
        }
        return branches;
      };

    //check if given word is contained in the dictionary
    function checkDictionary(word){
        console.log(word.replace('?',''));
    
        const isValidWord = (dictionary.indexOf(word) > -1);
        const index = dictionary.indexOf(word);
        return (isValidWord ? dictionary[index] : null);
    }
    
    
    function getWords(){
        const variants = getAllVariants(text.toUpperCase());
        var validWords = [];
        for (var v in variants){
            var word = checkDictionary(variants[v]);
            if(word != null){
                validWords.push(word);
            }

        }
        
        validWords = filter(validWords);
        setAmount(validWords.length)
        setWords(groupWords(validWords));
    }

    //filter words according to the variables given by the user
    function filter(words){
        var filteredWords = [...words];
        if(startsWith){
            filteredWords = filteredWords.filter( word => word.startsWith(startsWith));
        }
        if(endsWith){
            filteredWords = filteredWords.filter( word => word.endsWith(endsWith));
        }
        if(maxLength){
            filteredWords = filteredWords.filter( word => word.length <= maxLength);
        }
        if(minLength){
            filteredWords = filteredWords.filter( word => word.length >= minLength);
        }
        return filteredWords;
    }

    //group the words according to theire lengths
    var groupWords = function(xs) {
        var key = 'length';
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    
    //return the grouped words wrapped in a valid react child component
    function groupedView(obj){
        var data = Object.entries(obj);
        var groups =  data.map(group =>{
            if(group[1] != ''){
                return(
                    <div className='w-full'>    
                        <div className='p-2 px-5 rounded-full w-fit font-bold my-5 text-white bg-black'>{group[0]} letter words</div>
                        {
                            <Words
                                words={group[1]}/>  
                        } 
                    </div>
                )
            }else{
                return '';
            }
        });
        
        
            
        return groups;
    }   
    function controlWC(value){
        var count = (value.match(/\?/g) || []).length;
        var result = value;
        if(count > 2){
           result =  result.slice(0, value.lastIndexOf('?')) +
           result.slice(value.lastIndexOf('?') + 1);
        }
        return result;
    }
    return(
        <div >
        <div className='grid overflow-y-hidden   justify-center grid-main relative w-full px-5 md:px-10'>
                <div className='w-full bg-left bg-no-repeat bg-cover bg-image z-10 absolute h-full'>

                </div>
                <div className='w-full z-20 col-span-8 items-center flex flex-col text-center h-fit'>
                    <div className='w-full my-5'>
                        <div className='flex items-baseline'>
                            <Tile
                                tile='W'/>
                                    <div className='font-bold h-fit'>ordly</div>
                        </div>

                    </div>
                    <div className='text-[40px] font-bold text-[#ffeab8] grid gap-2 my-5'>
                        FIND <div className='text-black'>SCRABBLE WORDs</div>
                    </div>
                    <div className='flex w-full justify-center items-center'>
                        
                        <input
                            className='border-2 w-full my-10 h-14 rounded-3xl bg-white uppercase px-5 border-red'
                            maxLength={7}
                            placeholder='Use ? for wildcards'
                            onChange={(event) => setText(controlWC(event.target.value))}
                            value={text}
                            />
            
                        <img 
                            onClick={() => getWords()}
                            src={require('../assets/search_icon.gif')} 
                            className='h-10 border-black cursor-pointer border w-10 bg-white hover:shadow-lg mx-5 p-2 rounded-full'/>
                    </div>
                    <div className='bg-white border-black flex-wrap border  flex rounded-lg p-2 my-5 w-fit'>
                        <img 
                            src={require('../assets/filter.png')} 
                            className='h-4 hidden md:block cursor-pointer w-4 '/>
                        <input
                            maxLength={4}
                            placeholder='Starts with'
                            className='w-24 px-2  h-fit text-xs'
                            onChange={(event) => setStartsWith(event.target.value.toUpperCase())}
                            value={startsWith}/>
                        <input
                            maxLength={4}
                            placeholder='Ends with'
                            className='w-24 px-2 h-fit text-xs'
                            onChange={(event) => setEndsWith(event.target.value.toUpperCase())}
                            value={endsWith}/>
                        <input
                            max={8}
                            min={2}
                            type='number'
                            placeholder='Max. length'
                            className='w-24 px-2 h-fit text-xs'
                            onChange={(event) => setMaxLength(event.target.value.toUpperCase())}
                            value={maxLength}/>
                        <input
                            max={8}
                            min={2}
                            type='number'
                            placeholder='Min. length'
                            className='w-24 px-2 h-fit text-xs'
                            onChange={(event) => setMinLength(event.target.value.toUpperCase())}
                            value={minLength}/>
                    </div>
                    {amount !== null && <div >{amount} word{amount !== 1 && 's'} found</div>}
                    
                </div>

                    
               
                
            
           
        </div>
        <div className='grid overflow-y-hidden  justify-center grid-main relative w-full px-5 md:px-10'>
        
                <div className='col-span-8  my-10'>
                        {   
                            groupedView(words)
                        }
                </div>
            </div>
        </div>
    )
}

