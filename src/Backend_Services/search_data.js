var word = require("./final.json");
var data = word;

export function search(str) {
    const resultObj = {};

    for (const workName in data) {
        const work = data[workName];
        const filteredPlaces = work.places.filter(place => place.name.toLowerCase().includes(str.toLowerCase()));
        const filteredCharacters = work.characters.filter(character => character.name.toLowerCase().includes(str.toLowerCase()));
        const filteredMisc = work.misc.filter(misc => misc.name.toLowerCase().includes(str.toLowerCase()));

        if (workName.toLowerCase().includes(str.toLowerCase()) || 
            filteredPlaces.length > 0 || 
            filteredCharacters.length > 0 || 
            filteredMisc.length > 0) {
            resultObj[workName] = {
                ...work,
                places: filteredPlaces,
                characters: filteredCharacters,
                misc: filteredMisc
            };
        }
    }

    console.log(resultObj);
    return resultObj;
}
