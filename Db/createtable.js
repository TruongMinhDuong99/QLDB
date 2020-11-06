var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-2",
    accessKeyId:"", secretAccessKey:""
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "DienThoai",
    KeySchema: [       
        { AttributeName: "MaDienThoai", KeyType: "HASH"},  //Partition key
        { AttributeName: "MaSo", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "MaDienThoai", AttributeType: "S" },
        { AttributeName: "MaSo", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});