import fetch from 'node-fetch';

const url = 'http://20.244.56.144/test/register';
const data = {
  companyName: "affordmed",
  ownerName: "Sanju sri",
  rollNo: "21BD1A059L",
  ownerEmail: "sanjusrir22@gmail.com",
  accessCode: "osDvxf"
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
