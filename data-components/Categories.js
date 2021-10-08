const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
        await createAllUser(client,[
            {
                "Description": "Solid white table cloth",
                "Slug": "tablecloth",
                "Image": "xyz",
                "Name": "Dior",
              },
              {
                "Description": "Twill flared pants",
                "Slug": "flaredpants",
                "Image": "xyz",
                "Name": "H&M",
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
    const result = await client.db('user_managements').collection('Categories').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Categories').find().toArray()
    console.log("Categories details:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Categories').updateOne({"Name": "Dior"} , {$set:{"Name": "LV"}})
    console.log("Updated Category:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Categories').deleteMany({"Name": "H&M"})
    console.log("deleted")
    console.log(result) 
}