
module.exports = function(res, fn){
  res.text = '';
  res.setEncoding('utf8');
  res.on('data', function(chunk){ res.text += chunk; });
  res.on('end', function(){
    if (res.text === '' &&
       (res.statusCode === 204 || res.statusCode === 201)){
      res.text = "{}";
    }
    try {
      fn(null, JSON.parse(res.text));
    } catch (err) {
      fn(err);
    }
  });
};