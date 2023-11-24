const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
try{
  const stockSymbols = await stocks.getStocks()
  res.send({ stockSymbols })
} catch (error) {
  // print the error message to the console
  console.error('Error retrieving stock symbols:', error.message)
  // send a 500 Internal Server Error response to the client and the error message
  res.status(500).send({error: 'Now the request just hangs!'})
}
})

app.get('/stocks/:symbol', async (req, res) => {
  try {
  const { params: { symbol } } = req
  const data = await stocks.getStockPoints(symbol, new Date())
  res.send(data)
  } catch (error) {
  console.error(`Error retrieving stock data for symbol ${symbol}:`, error.message)
  res.status(500).send({ error: 'Now the request just hangs!' })
  }
})

app.listen(3000, () => console.log('Server is running!'))
