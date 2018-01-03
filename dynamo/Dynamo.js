var doc = require('aws-sdk');
var dynamodb = new doc.DynamoDB();
var index = require('../index');

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
    
    getData(value){

        var params = {
            TableName: this.tableName,
            Key:{
                "commentId" : {'S': value}
            }
        };
        
        console.log(params);

        
        dynamodb.getItem(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded."+JSON.stringify(data, null, 2));
                if(data.length > 0 ) {
                    data.Items.forEach(function(item) {
                        console.log(" -", item.id + ": " + item.usertype);
                    });
                }
            }
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
    
    scanData(){
        
        var params = {
            TableName: this.tableName,
            
            //ProjectionExpression will be used to fetch the information specific to the column provided...
            ProjectionExpression: "#comment_id, #page_id",
            
            //FilterExpression: "#comment_year between :start_yr and :end_yr",
            ExpressionAttributeNames: {
                "#comment_id": "commentId",
                "#page_id": "pageId"
            },
            // ExpressionAttributeValues: {
            //      ":start_yr": 1950,
            //      ":end_yr": 1959 
            // }
        };
        
        dynamodb.scan(params, onScan);
        
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Scan succeeded.");
                data.Items.forEach(function(item) {
                    console.log(" -", item);
                });
            }
        }
    }
    
}

module.exports = Dynamo;
