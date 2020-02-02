function lookUpprofile(name, prop) {
    for (var i = 0; i < contacts.length; i ++) {
        if(contacts[i].firstname === name) {
            return contacts[i][prop] || 'No such prop'
        }
    }

    return "no such contact";
}

var data = lookUpprofile("Akira", "likes");

console.log(data);