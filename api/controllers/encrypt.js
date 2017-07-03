var request = require('request');


var options = { 
    method: 'POST',
    url: 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt/',
    json: true,
    headers:
    { 
        'content-type': 'application/json'
    },
    body: { plaintext: '' }
};

function encrypt(req, res) {

    let reqPlainText = req.swagger.params.body.value.plaintext;
    //console.log(reqPlainText)

    if(!reqPlainText.match(/^[A-Fa-f0-9]+$/) || reqPlainText.length%2) {
        return res.json(400, {
            "message": "Bad Request(invalid encode hex)"
        });
    }
    if(reqPlainText.length > 32) {
        return res.json(413, {
            "message": "Entity Too Large(decode hex > 16bytes)"
        }); 
    }

    options.body.plaintext = req.swagger.params.body.value.plaintext;

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(200, {
        
            "ciphertext": response.body.ciphertext
        });


    });


}

module.exports = {
    encrypt
};