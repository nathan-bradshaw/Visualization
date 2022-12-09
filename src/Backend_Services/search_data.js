// service to get the search results. It takes the search query and returns list of related works

var word = require("./Encyclo.json");
//var result = JSON.stringify(word,undefined,2)
var data = JSON.parse(word)

// function to provide the lsit of search results
export function search(str){
    const lst = []
    const indices = new Set()
   for(let i =0 ; i<data.length;i++){
        var x = data[i].work_name.toLowerCase()
        if(x.includes(str.toLowerCase())){
            indices.add(i)
        }
        var z;
        for(let j=0 ; j<data[i].places.length;j++){
            z = data[i].places[j].name.toLowerCase()
            if(z.includes(str.toLowerCase())){
                indices.add(i)
            }
        }
        for(let j=0 ; j<data[i].characters.length;j++){
            z = data[i].characters[j].name.toLowerCase()
            if(z.includes(str.toLowerCase())){
                indices.add(i)
            }
        }
   }
   for (const item of indices.values()) {
    lst.push(data[item])
  }
  return lst;
}

