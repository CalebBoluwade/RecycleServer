import axios from 'axios';

// {
//   "status": true,
//   "message": "Account number resolved",
//   "data": {
//     "account_number": "0001234567",
//     "account_name": "Doe Jane Loren",
//     "bank_id": 9
//   }
// }

export const makeRequest = async (requestObj: any) => {
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Charset': 'utf-8'
    };

    requestObj.url = `${process.env.PAYSTACK_URL + requestObj.url}`;
    // https://api.paystack.co/bank/resolve?account_number=0001234567&bank_code=058
    const result = await axios(requestObj);
    return result.data;
};

export const getBankList = async () => {
    const bankList = await makeRequest({
        method: 'get',
        url: 'banks'
    });
    return bankList;
};

export const verifyAccount = async (accountData: any) => {
    const account = await makeRequest({
        method: 'get',
        url: `bank/resolve?account_number=${accountData.accountNumber}&bank_code=${accountData.BankCode}`
    });

    return account;
};
