var word = require("./final.json");
var data = word;

export function search(str) {
    const lst = [];
    const indices = new Set();

    for (const workName in data) {
        const work = data[workName];
        if (workName.toLowerCase().includes(str.toLowerCase())) {
            indices.add(workName);
        }

        for (let j = 0; j < work.places.length; j++) {
            const place = work.places[j];
            if (place.name.toLowerCase().includes(str.toLowerCase())) {
                indices.add(workName);
                break;
            }
        }

        for (let j = 0; j < work.characters.length; j++) {
            const character = work.characters[j];
            if (character.name.toLowerCase().includes(str.toLowerCase())) {
                indices.add(workName);
                break;
            }
        }

        for (let j = 0; j < work.misc.length; j++) {
            const misc = work.misc[j];
            if (misc.name.toLowerCase().includes(str.toLowerCase())) {
                indices.add(workName);
                break;
            }
        }
    }

    for (const workName of indices.values()) {
        lst.push(data[workName]);
    }
    return lst;
}
