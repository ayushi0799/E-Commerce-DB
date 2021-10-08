const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
         await createAllUser(client,[
            {
                "Shipping address": "1/410, viram khand, gomti nagar",
                "Order status": "Shipped",
                "Products": "Handbag, Top",
                "Total items":2,
                "Users id": 176889,
                "Payment status": true,
                "Transaction status":"Done",
                "Billing address":"1/410, viram khand, gomti nagar",
                "Payment mode":"Cash on Delivery",
              },
              {
                "Shipping address": "2/4, Indranagar",
                "Order status": "Shipping",
                "Products": "Top, jeans, shirt",
                "Total items":3,
                "Users id": 297469,
                "Payment status": true,
                "Transaction status":"Done",
                "Billing address":"2/4, Indranagar",
                "Payment mode":"UPI",
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
    const result = await client.db('user_managements').collection('Orders').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Orders').find().toArray()
    console.log("All the Orders are:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Orders').updateOne({"Users id": 297469} , {$set:{"Users id": 300021}})
    console.log("Updated Orders:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Orders').deleteMany({"Users id": 176889})
    console.log("deleted")
    console.log(result) 
}