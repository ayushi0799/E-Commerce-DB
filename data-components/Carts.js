const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
         await createAllUser(client,[
            {
                "Sell price": 1500,
                "User": "Ayushi Singh",
                "Product": "Handbag, Top, shirt",
                "Product qty": 3,
                "Base price": 1200,
               "Total price":2000,
              },
              {
                
                "Sell price": 5000,
                "User": "Priya Singh",
                "Product": "Watch, phone",
                "Product qty": 2,
                "Base price": 2200,
               "Total price":7000,
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
    const result = await client.db('user_managements').collection('Carts').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Carts').find().toArray()
    console.log("Cart details:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Carts').updateOne({"Base price": 1200} , {$set:{"Base price": 500}})
    console.log("Updated Cart:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Carts').deleteMany({"Base price": 2200})
    console.log("deleted")
    console.log(result) 
}