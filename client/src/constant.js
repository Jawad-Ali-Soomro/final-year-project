import Web3 from 'web3'
const baseUserUrl = 'http://localhost:8080/api/v1/user'
const baseArtUrl = 'http://localhost:8080/api/v1/art'
const baseSeriesUrl = 'http://localhost:8080/api/v1/series'
const ethToUsd = 2800

const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to Metamask!');
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log('User account:', accounts[0]);
        window.localStorage.setItem("token" , accounts)
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      console.error('Metamask not detected');
    }
  };


export {baseArtUrl , baseUserUrl , baseSeriesUrl , ethToUsd , connectMetamask}