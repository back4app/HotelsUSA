// Instantiate the Parse SDK for Javascript NodeJS
const Parse = require('parse/node')

// Configures the ParseURL to Back4app's API
Parse.serverURL = 'https://parseapi.back4app.com/'

// Inicializa o Parse com a AppID e a Javascript Key
Parse.initialize("rZKqAuuBd6vJzCj37QH2getTGVWP7mHBhXSA3N3n", "HpmqmOHnIzX6C47w8fAZnuxprFn6rxro9IRcBcu6");


// Async function so we can use Async/Await
async function retrieveTenHotelsInSanFranciscoCA(){
    // Extends the class Hotelsusa_Hotel, where we will be making queries
    const Hotel = Parse.Object.extend("Hotelsusa_Hotel");
    // Creates a query object, to query on the Country object created above
    const query = new Parse.Query(Hotel);

    // Let's find the country which the property city is what we are looking for
    query.equalTo("city", "San Francisco");
    // Let's find the country which the property state is what we are looking for
    query.equalTo("state", "California");

    // Let's limit the number of results we want
    query.limit(10)

    // We are going to print only the hotel name and address, so let's tell Parse we only want this data to avoid overquerying
    query.select('name', 'address')

    // Executes the find method and holds the results in a variable
    const results = await query.find();

    console.log('Found ' + results.length + ' hotels with the parameters searched')

    // Loop through results and print
    for (let i = 0; i < results.length; i ++){
        let hotelName = results[i].get('name')
        let hotelAddress = results[i].get('address')
        
        console.log('\tHotel: ' + hotelName)
        console.log('\t\tAddress: ' + hotelAddress)
    }
}

// Run the method above
retrieveTenHotelsInSanFranciscoCA()