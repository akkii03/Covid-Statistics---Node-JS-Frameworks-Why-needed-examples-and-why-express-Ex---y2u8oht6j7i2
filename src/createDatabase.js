const collection_Model  = require('./schema')
const { data } = require('./data')

const refreshAll = async () => {
    await collection_Model.deleteMany({})
    // console.log(connection)
    await collection_Model.insertMany(data)
    
    
    console.log("connect is ",collection_Model);
    console.log("database is created");
}
refreshAll()
exports.createDatabase = refreshAll;