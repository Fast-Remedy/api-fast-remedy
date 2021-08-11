import fs from 'fs';

function base64_encoded(file){
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64url');
}

export default  base64_encoded;
