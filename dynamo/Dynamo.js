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
    
    fetchData(index, item, value){
        
        var params = {
            TableName : this.tableName,
            IndexName: index,
            ScanIndexForward: false,
            Limit: 3,
            KeyConditionExpression: item+" = :id",
            ExpressionAttributeValues: {
                ":id":{'S': value}
            }
        };
        
        dynamodb.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    console.log(" -", item);
                });
            }
        });

    }
}

module.exports = Dynamo;
