const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
         await createAllUser(client,[
            { 
             "slug": "flaredpants",
             "Name": "Zara",
            },
            {
                "slug": "pendant",
                "Name": "Forever21",
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
    const result = await client.db('user_managements').collection('Tags').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Tags').find().toArray()
    console.log("Tags details:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Tags').updateOne({"Name": "Zara"} , {$set:{"Name": "Mango"}})
    console.log("Updated Tags:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Tags').deleteMany({"Name": "Forever21"})
    console.log("deleted")
    console.log(result) 
}