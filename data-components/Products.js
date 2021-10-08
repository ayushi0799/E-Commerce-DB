const { MongoClient } = require('mongodb')

async function main(){

    const uri = 'mongodb://127.0.0.1:27017/user_managements'
    const client = new MongoClient(uri)
    
    try {
        await client.connect() 
        
         await createAllUser(client,[
            {
                "Sell price": 999,
                "Description": "Handbag",
                "Additional Information": "White colour",
                "Category Name": "Accessories",
                "Base Price": 699,
                Thumbnail:"bags",
                Tags:"bag, white, accessory",
                Name:"White H&M Handbag",
                "Product gallery":"https://cdn.shopify.com/s/files/1/0266/6276/4597/products/100001_300853771_001_2_1024x1024.jpg?v=1616143891"
                
              },
              {
                "Sell price": 299,
                "Description": "Scarf",
                "Additional Information": "Pink colour",
                "Category Name": "Accessories",
                "Base Price": 199,
                Thumbnail:"silk scarf",
                Tags:"pink, silk, accessory",
                Name:"Pink H&M Silk scarf",
                "Product gallery":"https://www.armani.com/variants/images/17411127375628870/G/w400.jpg",
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
    const result = await client.db('user_managements').collection('Products').insertMany(obj)
    console.log("Total document created: " , result.insertedCount) 
}
async function readAllUsers(client){
    const result = await client.db('user_managements').collection('Products').find().toArray()
    console.log("All the users are:") 
    console.log(result)
}

async function updateAUser(client){
    const result = await client.db('user_managements').collection('Products').updateOne({"Base Price":699} , {$set:{"Base Price":458}})
    console.log("Updated Document:")
    console.log(result) 
}
async function deleteAUser(client){
    const result = await client.db('user_managements').collection('Products').deleteMany({Name:"Pink H&M Silk scarf"})
    console.log("deleted")
    console.log(result) 
}