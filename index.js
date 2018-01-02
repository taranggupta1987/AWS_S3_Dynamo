console.log('Loading event');

var bucket = require('bucket_reader');
var Dynamo = require("./dynamo/Dynamo");

exports.handler = function(event, context) {
   
   var bucketName = process.env.bucketName;
   var keyName = process.env.keyName;
   var bucketJson = bucket.BucketData(bucketName, keyName, function(err, data) { 
            if (err) {
                console.log(err, err.stack);
            } else {
                var dataJson = JSON.parse(data);
                dynamo(dataJson.table_name, event);
            }
          });
   
};

var dynamo = function (tableName, event){
   var d = new Dynamo();
   d.setTableName(tableName);
   d.insertData(event.commentId, event.userName, event.pageId, event.message, function(err, data){ 
       if (err) {
           console.log(err, err.stack);
        } else {
           console.log(data);
        }
    });
}