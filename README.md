# AWS (S3 & Dynamo using Node JS)

This Demo is for fetching the Dynamo DB table name from S3 Bucket and insert the data into Dynamo DB.


S3 Bucket file:

```

file name: env-config.json
content:
    {
      "table_name": "DynamoRocks"
    }    
```

Lambda function Environment Variable for S3 Bucket:

![Environment Variable Image](https://github.com/taranggupta1987/AWS_S3_Dynamo/blob/taranggupta1987-images/Screen%20Shot%202018-01-02%20at%206.29.16%20PM.png)

Create a Table with below Items..
--------------

```
commentId(String)
message(String)
pageId(String)
userName(String)

Primary partition key:	commentId (String)
```

Dummy Data for testing using AWS Test...
--------------

```
{
  "commentId": "1",
  "pageId": "TSLEDNA1_1",
  "userName": "user name",
  "message": "I really enjoyed this blog!!"
}
```


*NOTE: Make sure you have appropriate rights for Lambda and Dynamo in IAM.*

Error while filering the data using querry command.
---------------------------

Response Message Error : **One or more parameter values were invalid: Condition parameter type does not match schema type**

Solution
 - change ExpressionAttributeValues declaration from
                **":id":{'S': "60771e19-f9b7-11e7-994b-615c3da32b86"} to ":id":"60771e19-f9b7-11e7-994b-615c3da32b86"**
