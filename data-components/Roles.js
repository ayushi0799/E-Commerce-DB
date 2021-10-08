const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
         await createAllUser(client,[
            { 
             "Slug": "watchbrand",
             "Name": "Titan",
            },
            {
                "Slug": "makeup",
                "Name": "Lakme",
            },
         ])

        await readAllUsers(client)
        
        await updateAUser(client)
        
        await deleteAUser(client)

    } catch (e) {   
        console.error(e)
    } finally{
        client.close()
    }

}

main().catch(console.error)


async function createAllUser(client,obj){
    const result = await client.db('user_managements').collection('Roles').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Roles').find().toArray()
    console.log("Roles details:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Roles').updateOne({"Name": "Titan"} , {$set:{"Name": "Rolex"}})
    console.log("Updated Roles:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Roles').deleteMany({"Name": "Lakme"})
    console.log("deleted")
    console.log(result) 
}