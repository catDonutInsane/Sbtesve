import {encoded, translations} from './data.js'

let decodeFunc =(encoded, translations)=>{
    
   let result = encoded.map(i=>{
    let obj ={}
        for(let key in i){
            
             if(/\b(?!group)\w+(Id)\b/.test(key)){
                if(i[key]===null){
                    obj[key]=i[key]
                }
                else{
                    obj[key]=translations[i[key]]
                }
                
                
            }else{
                obj[key]=i[key]
            }
        }
        return obj
    })
    return result
}
console.log(decodeFunc(encoded, translations))




