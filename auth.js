// Define the request payload
const payload = {
    companyName: 'affordmed',
  clientID: 'c2e50235-99ff-4a9b-8adf-21b02d9519c4',
  clientSecret: 'iiJZzJOEeCbQGZRH',
  ownerName: 'Sanju sri',
  ownerEmail: 'sanjusrir22@gmail.com',
  rollNo: '21BD1A059L'
};

// Define the URL
const url = "http://20.244.56.144/test/auth";

// Perform the POST request
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(response => {
    // Check if response is ok
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Parse response JSON
    return response.json();
})
.then(data => {
    // Extract access token from response
    const accessToken = data.access_token;
    console.log("Access Token:", accessToken);
})
.catch(error => {
    console.error('There was a problem with the request:', error);
});