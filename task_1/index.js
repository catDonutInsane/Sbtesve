import {encoded, translations} from './data.js'

let decodeFunc =(encoded, translations)=>{
    
    let IDs = []
   let result = encoded.map(i=>{
    let obj ={}
        for(let key in i){
            if(/\b(group)(Id)\b/.test(key)){
                IDs.push(i[key])
            }
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
    return {result,IDs}
}
console.log(decodeFunc(encoded, translations))








