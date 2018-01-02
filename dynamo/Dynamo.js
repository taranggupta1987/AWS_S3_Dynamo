var doc = require('aws-sdk');
var dynamodb = new doc.DynamoDB();

class Dynamo {
    
    constructor() {}
    
    setTableName(tableName){
        this.tableName = tableName;
    }
    
    getTableName() {
        return this.tableName;
    }
    
    insertData(commentId, userName, pageId, message, callback){
        var params = {};
        params.TableName = this.tableName;
        params.Item = {
                   commentId : {"S": commentId},
                   userName : {"S": userName },
                   pageId    : {"S": pageId },
                   message    : {"S": message }};
        
        var putObjectPromise = dynamodb.putItem(params, null).promise();
       
        putObjectPromise.then(function(data) {
          callback(null, "Data Inserted Successfully")
        }).catch(function(err) {
          callback(err, null)
        });
    }
}

module.exports = Dynamo;