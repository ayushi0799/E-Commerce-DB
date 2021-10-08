const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
         await createAllUser(client,[
            {
                "First name": "Ayushi",
                "Last name": "Singh",
                Email: "ayushisingh0799@gmail.com",
                "Profile image": "http://dummyimage.com/124x100.png/5fa2dd/ffffff",
                Role: "user",
              },
              {
                "First name": "Priya",
                "Last name": "Sharma",
                Email: "priya@gmail.com",
                "Profile image": "http://dummyimage.com/209x100.png/dddddd/000000",
                Role: "user",
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
    const result = await client.db('user_managements').collection('Users').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Users').find().toArray()
    console.log("All the users are:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Users').updateOne({"First name":"Ayushi"} , {$set:{"Last name":"Komal"}})
    console.log("Updated Document:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Users').deleteMany({"First name":"Ayushi"})
    console.log("deleted")
    console.log(result) 
}