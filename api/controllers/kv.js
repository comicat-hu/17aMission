var URLSafeBase64 = require('urlsafe-base64');

let now = new Date();

/**
 * 
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
 */
function getKEY(req, res) {

  let reqKeyBase64 = req.swagger.params.KvKey.value;

  if(!URLSafeBase64.validate(reqKeyBase64)) {
    return res.json(400, {
      "message": "Bad Request, usually malformed parameters(KEY -> invalidURLSafeBase64)"
    });
  }

  let reqKey = URLSafeBase64.decode(reqKeyBase64);

  if(db.hasOwnProperty(reqKey)) {

    return res.json(200, {
      "VALUE": db[reqKey],
      "TS": new Date()
    });

  }
  res.json(404, {
    "message": "Not found KEY"
  });

}

function deleteKEY(req, res) {

  let reqKeyBase64 = req.swagger.params.KvKey.value;

  if(!URLSafeBase64.validate(reqKeyBase64)) {
    return res.json(400, {
      "message": "Bad Request, usually malformed parameters(KEY -> invalidURLSafeBase64)"
    });
  }

  let reqKey = URLSafeBase64.decode(reqKeyBase64);

  res.json(200, {
    "OLD_VALUE": db[reqKey],
    "TS": new Date()
  });
  delete db[reqKey];

}

function postKEY(req, res) {

  let reqKeyBase64 = req.swagger.params.KvKey.value;

  if(!URLSafeBase64.validate(reqKeyBase64)) {
    return res.json(400, {
      "message": "Bad Request, usually malformed parameters(invalidURLSafeBase64)"
    });
  }

  let reqKey = URLSafeBase64.decode(reqKeyBase64);

  res.json(200, {
    "TS": new Date()
  });
  db[reqKey] = req.body.VALUE;

}

var db = {};

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
