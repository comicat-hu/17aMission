var URLSafeBase64 = require('urlsafe-base64');

let now = new Date();

/**
 * getKEY
 * @param {KEY|URL-safe Base64} req 
 * @param {VALUE|Base64, TS|Date} res 
 * 
 * 
 * URLSafeBase64.decode(URLSafeBase64|String);
 * 
 * var validURLSafeBase64 = '';
 * URLSafeBase64.validate(validURLSafeBase64|String); // returns true 
 * var invalidURLSafeBase64 = '/+=='
 * URLSafeBase64.validate(invalidURLSafeBase64|String); // returns false 
 * 
 * 
 * 
 * 
 */


function getKEY(req, res) {

  let reqKeyBase64 = req.swagger.params.KvKey.value;

  if(!URLSafeBase64.validate(reqKeyBase64)) {
    res.json(400, {
      "message": "Bad Request, usually malformed parameters(KEY -> invalidURLSafeBase64)"
    });
    return;
  }

  let reqKey = URLSafeBase64.decode(reqKeyBase64);


  if(db.hasOwnProperty(reqKey)) {

    res.json(200, {
      "VALUE": db[reqKey],
      "TS": new Date()
    });

  }else {

    res.json(404, {
      "message": "Not found KEY"
    });

  }
  // console.log(db)
  // console.log(db[reqKey])

}

function deleteKEY(req, res) {

  let reqKeyBase64 = req.swagger.params.KvKey.value;

  if(!URLSafeBase64.validate(reqKeyBase64)) {
    res.json(400, {
      "message": "Bad Request, usually malformed parameters(KEY -> invalidURLSafeBase64)"
    });
    return;
  }

  let reqKey = URLSafeBase64.decode(reqKeyBase64);


  if(db.hasOwnProperty(reqKey)) {

    res.json(200, {
      "OLD_VALUE": db[reqKey],
      "TS": new Date()
    });
    delete db[reqKey];

  }else {

    res.json(200, {
      "TS": new Date()
    });

  }
  // console.log(db)
  // console.log(db[reqKey])
}

function postKEY(req, res) {

  let reqKeyBase64 = req.swagger.params.KvKey.value;

  if(!URLSafeBase64.validate(reqKeyBase64)) {
    res.json(400, {
      "message": "Bad Request, usually malformed parameters(invalidURLSafeBase64)"
    });
    return;
  }

  let reqKey = URLSafeBase64.decode(reqKeyBase64);



    res.json(200, {
      "TS": new Date()
    });
    db[reqKey] = req.body.VALUE;

  // console.log(db)
  // console.log(db[reqKey])
}

var db = {};

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
