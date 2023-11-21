let colors = [ "blue",
"red",
"purple",
"green",
"gray"];


let animals = ["giraffe", "cow", "chicken", "dog", "duck", "mouse", "cat"]

let countries = ["denmark", "belgium", "germany", "hungary", "spain"]

function randomWord(type=colors){
    switch(type){
        case 'animals':
            return animals[Math.floor(Math.random()* animals.length)]
        case 'countries':
            return countries[Math.floor(Math.random()* countries.length)]
        case 'colors':
            return colors[Math.floor(Math.random()* colors.length)]
        default:
            return colors[Math.floor(Math.random()* colors.length)]
    }
    
}
    
export default randomWord;