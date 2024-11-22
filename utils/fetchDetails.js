import Web3 from 'web3';
import axios from 'axios';

const web3 = new Web3();

const API_KEY = 'PEVVPI4EUDCUQBTSNR1B8HM36JBG8QSYGY';
// const ADDRESS = 0x87d884aaa6ff9e9b6014631b0abae80b53953fb8; 


const fetchAddressDetails = async (address)=>{
  const res = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`);

  const userData = {};
  
  userData.avgTimeSent = calculateAvgTimeBetweenSentTxs(address, res.data.result);
  userData.avgTimeRec = calculateAvgTimeBetweenReceivedTxs(address, res.data.result);
  userData.timeDiff = calculateTimeDifferenceBetweenFirstAndLast(res.data.result);
  userData.uniqueRec = uniqueReceivedFromAddresses(address, res.data.result);
  userData.minRec = minValRec(address, res.data.result);
  userData.maxRec = maxValRec(address, res.data.result);
  userData.avgRec = avgValRec(address, res.data.result);
  userData.minSent = minValSent(address, res.data.result);
  userData.avgSent = avgValSent(address, res.data.result);
  userData.total = totalTransactions(res.data.result);
  userData.totalRec = totalEtherRecieved(address, res.data.result);
  userData.balance = await getTotalBalance(address);

//   console.log(typeof(userData.balance));

//   console.log(userData);
  return userData;
}

const calculateAvgTimeBetweenSentTxs = (address, transactions) => {

    transactions = transactions.filter(tx => tx.from.toLowerCase() === address.toLowerCase());

    if (transactions.length < 2) {
      return 0;
    }

    const timestamps = transactions
      .map(tx => new Date(tx.timeStamp * 1000))
      .sort((a, b) => a - b);

    const timeDifferences = [];
    for (let i = 1; i < timestamps.length; i++) {
      const timeDiff = (timestamps[i] - timestamps[i - 1]) / (1000 * 60);
      timeDifferences.push(timeDiff);
    }

    const avgTimeBetweenSentTxs = timeDifferences.reduce((acc, diff) => acc + diff, 0) / timeDifferences.length;
    // console.log('Average time between sent transactions (in minutes):', avgTimeBetweenSentTxs.toFixed(2));
    return avgTimeBetweenSentTxs;

};

const calculateAvgTimeBetweenReceivedTxs = (address, transactions) => {
   transactions = transactions.filter(tx => tx.to.toLowerCase() === address.toLowerCase());

    if (transactions.length < 2) {
      return 0;
    }

    const timestamps = transactions
      .map(tx => new Date(tx.timeStamp * 1000))
      .sort((a, b) => a - b);

    const timeDifferences = [];
    for (let i = 1; i < timestamps.length; i++) {
      const timeDiff = (timestamps[i] - timestamps[i - 1]) / (1000 * 60);
      timeDifferences.push(timeDiff);
    }

    const avgTimeBetweenReceivedTxs = timeDifferences.reduce((acc, diff) => acc + diff, 0) / timeDifferences.length;
    // console.log('Average time between received transactions (in minutes):', avgTimeBetweenReceivedTxs.toFixed(2));
    return avgTimeBetweenReceivedTxs;
  
};

const calculateTimeDifferenceBetweenFirstAndLast = (transactions)=>{
  if(transactions.length < 2){
    return 0;
  }

  const timestamps = transactions
  .map(tx => new Date(tx.timeStamp * 1000))
  .sort((a,b) => a-b);

  const timeDiff = (timestamps[timestamps.length - 1] - timestamps[0]) / (1000 * 60)
  // console.log('Time difference between first and last transaction (in minutes):', timeDiff.toFixed(2));

  return timeDiff;
}

function uniqueReceivedFromAddresses(address, transactions) {
    let arr = [];
    transactions.forEach(tx => tx.from.toLowerCase() === address.toLowerCase() ? null : arr.push(tx.from.toLowerCase()))
    const uniqueElements = new Set(arr);
    // console.log('Number of unique addresses that sent tokens to this address:', uniqueElements.size);
    return uniqueElements.size;
}

const minValRec = (address, transactions)=>{
  transactions = transactions.filter(tx => tx.to.toLowerCase() === address.toLowerCase());
  if(transactions.length === 0){
    return 0;
  }
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const minVal = Math.min(...values);
  // console.log('Minimum value received (in Ether):', minVal.toFixed(2));
  return minVal;
}

const maxValRec = (address, transactions)=>{
  transactions = transactions.filter(tx => tx.to.toLowerCase() === address.toLowerCase());
  if(transactions.length === 0){
    return 0;
  }
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const maxVal = Math.max(...values);
  // console.log('Maximum value received (in Ether):', maxVal.toFixed(2));
  return maxVal;
}

const avgValRec = (address, transactions)=>{
  transactions = transactions.filter(tx => tx.to.toLowerCase() === address.toLowerCase());
  if(transactions.length === 0){
    return 0;
  }
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const avgVal = values.reduce((acc, val) => acc + val, 0) / values.length;
  // console.log('Average value received (in Ether):', avgVal.toFixed(2));
  return avgVal;
}

const minValSent = (address, transactions)=>{
  transactions = transactions.filter(tx => tx.from.toLowerCase() === address.toLowerCase());
  if(transactions.length === 0){
    return 0;
  }
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const minVal = Math.min(...values);
  // console.log('Minimum value sent (in Ether):', minVal.toFixed(2));
  return minVal;
}

const avgValSent = (address, transactions)=>{
  transactions = transactions.filter(tx => tx.from.toLowerCase() === address.toLowerCase());
  if(transactions.length === 0){
    return 0;
  }
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const avgVal = values.reduce((acc, val) => acc + val, 0) / values.length;
  // console.log('Average value sent (in Ether):', avgVal.toFixed(2));
  return avgVal;
}

const totalTransactions = (transactions)=>{
  const total = transactions.length;
  // console.log('Total number of transactions (including transactions to create contracts):', total);
  return total;
}

const totalEtherRecieved = (address, transactions)=>{
  transactions = transactions.filter(tx => tx.to.toLowerCase() === address.toLowerCase());
  if(transactions.length === 0){
    return 0;
  }
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const totalEther = values.reduce((acc, val) => acc + val, 0);
  // console.log('Total ether received (in Ether):', totalEther.toFixed(2));
  return totalEther;
}

const getTotalBalance = async (address) => {
  try {
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${API_KEY}`);

    // Convert balance from Wei to Ether
    const balanceInEther = web3.utils.fromWei(response.data.result, 'ether');

    // Parse the string to a float
    const balanceFloat = parseFloat(balanceInEther);

    // Format the float with fixed decimal places
    const formattedBalance = balanceFloat.toFixed(6);

    // console.log('Balance:', formattedBalance);

    return parseFloat(formattedBalance); // Returning as a float
  } catch (error) {
    console.error('Error fetching balance:', error);
    return null; 
  }
};


export default fetchAddressDetails;


// fetchAddressDetails(ADDRESS);