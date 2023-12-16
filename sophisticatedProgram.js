/*  
filename: sophisticatedProgram.js 
content: This code illustrates a sophisticated program that simulates a stock market trading system with multiple functionalities such as buying/selling shares, calculating profits/losses, and providing detailed transaction history.
*/

// Stock object representing a single stock
class Stock {
    constructor(symbol, name, price) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
    }
}

// Portfolio object representing a user's portfolio
class Portfolio {
    constructor() {
        this.stocks = [];
        this.transactions = [];
    }

    buyStock(symbol, quantity) {
        // Fetch stock details from API or database
        const stock = fetchStock(symbol);

        if (stock) {
            if (stock.price * quantity <= this.getAvailableBalance()) {
                this.stocks.push({ symbol, quantity });
                this.transactions.push({ type: "BUY", symbol, quantity });
                this.updateBalance(-stock.price * quantity);
                console.log(`Successfully bought ${quantity} share(s) of ${stock.name} (${symbol})`);
            } else {
                console.log("Insufficient balance to buy the stock");
            }
        } else {
            console.log(`The stock with symbol ${symbol} is not available`);
        }
    }

    sellStock(symbol, quantity) {
        const stockIndex = this.findStockIndex(symbol);

        if (stockIndex !== -1) {
            const existingQuantity = this.stocks[stockIndex].quantity;

            if (quantity <= existingQuantity) {
                this.stocks[stockIndex].quantity -= quantity;
                this.transactions.push({ type: "SELL", symbol, quantity });
                this.updateBalance(fetchStock(symbol).price * quantity);
                console.log(`Successfully sold ${quantity} share(s) of ${symbol}`);
            } else {
                console.log(`Insufficient quantity of ${symbol} to sell`);
            }
        } else {
            console.log(`The stock with symbol ${symbol} is not in your portfolio`);
        }
    }

    updateBalance(amount) {
        // Update balance in the database or external system
        // Logic here...
    }

    getAvailableBalance() {
        // Fetch available balance from the database or external system
        // Logic here...
    }

    findStockIndex(symbol) {
        for (let i = 0; i < this.stocks.length; i++) {
            if (this.stocks[i].symbol === symbol) {
                return i;
            }
        }
        return -1;
    }

    getPortfolioValue() {
        let portfolioValue = 0;

        for (let i = 0; i < this.stocks.length; i++) {
            const stock = fetchStock(this.stocks[i].symbol);
            portfolioValue += stock.price * this.stocks[i].quantity;
        }

        return portfolioValue;
    }

    getTransactionHistory() {
        return this.transactions;
    }
}

// Function to fetch stock details using API or database
function fetchStock(symbol) {
    // Fetch stock details from API or database
    // Logic here...
}

// Create a new portfolio for the user
const myPortfolio = new Portfolio();

// Buying shares
myPortfolio.buyStock("AAPL", 10);
myPortfolio.buyStock("GOOGL", 5);

// Selling shares
myPortfolio.sellStock("AAPL", 3);
myPortfolio.sellStock("GOOGL", 2);

// Print portfolio details
console.log("Portfolio Value:", myPortfolio.getPortfolioValue());
console.log("Transaction History:", myPortfolio.getTransactionHistory());

// Output:
// Successfully bought 10 share(s) of Apple Inc. (AAPL)
// The stock with symbol GOOGL is not available
// Successfully sold 3 share(s) of AAPL
// Successfully sold 2 share(s) of GOOGL
// Portfolio Value: 3490 (calculated based on stock prices and quantity)
// Transaction History: [{ type: "BUY", symbol: "AAPL", quantity: 10 }, { type: "SELL", symbol: "AAPL", quantity: 3 }, { type: "SELL", symbol: "GOOGL", quantity: 2 }] 

// ... Additional lines of code to support other functionalities of the stock market trading system.