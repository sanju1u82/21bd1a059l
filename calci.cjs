const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Define window size
const windowSize = 10;
let storedNumbers = [];

// Helper function to calculate average
const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

// Function to fetch numbers from test server with timeout
const fetchNumbersFromTestServer = async (type) => {
    try {
        console.log(`Fetching ${type} numbers from test server...`);
        const response = await axios.get(`http://20.244.56.144/test/${type}`, { timeout: 500 });
        console.log(`Received response: ${response.data.numbers}`);
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers from test server:, error.message`);
        return [];
    }
};

// Middleware to handle API requests
app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    try {
        console.log(`Received request for numberId: ${numberId}`);
        // Fetch numbers from third-party server based on numberId
        let numbers = [];
        switch (numberId) {
            case 'p':
                numbers = await fetchNumbersFromTestServer('primes');
                break;
            case 'f':
                numbers = await fetchNumbersFromTestServer('fibonacci');
                break;
            case 'e':
                numbers = await fetchNumbersFromTestServer('even');
                break;
            case 'r':
                numbers = await fetchNumbersFromTestServer('random');
                break;
            default:
                res.status(400).json({ error: 'Invalid numberId' });
                return;
        }

        console.log(`Fetched numbers: ${numbers}`);

        // Filter out duplicates and limit to window size
        const prevStoredNumbers = [...storedNumbers];
        storedNumbers = [...new Set([...storedNumbers, ...numbers])].slice(-windowSize);

        console.log(`Stored numbers after update: ${storedNumbers}`);

        // Calculate average if stored numbers match window size
        let average = null;
        if (storedNumbers.length === windowSize) {
            average = calculateAverage(storedNumbers);
        }

        // Prepare response
        const responseObj = {
            windowPrevState: prevStoredNumbers,
            windowCurrState: storedNumbers,
            numbers: numbers,
            avg: average
        };

        res.json(responseObj);
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
const port = 9876;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});