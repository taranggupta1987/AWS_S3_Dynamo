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
   
   //fetch the data
   d.fetchData("pageId-index", "pageId", "tarang");
   //scan the data and display
   d.scanData();
   //get the data based on condition
   d.getData("123"); //based on commentId
   
   /*
   //Insert Data
   {
      "commentId": "123",
      "pageId": "1",
      "userName": "tarang",
      "message": "I really enjoyed this Blog!!",
      "otherKeys": "otherValues"
    }
   */
  d.insertData(event.commentId, event.userName, event.pageId, event.message, function(err, data){ 
      if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
    });
}
