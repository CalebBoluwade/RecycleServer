import { Request, Response } from 'express';
import Transaction, { ITransaction, TranactionStatus, TranactionType } from './Transactions.model';
import lodash from 'lodash';
import { handleError } from '../../Utils/ErrorHandler.util';
import { userTypeSet } from '../../Utils/Types.utils';
import { Types } from 'mongoose';

const TransactionTestData: ITransaction[] = [
    {
        amount: 3600,
        email: '',
        description: 'PAYMENT FOR FEBUARY WASTE DISPOSAL',
        status: TranactionStatus.SUCCESSFUL,
        type: TranactionType.DEBIT,
        userType: userTypeSet['USER'],
        transDate: Date.now().toLocaleString(),
        CRacctName: 'GROOVE TECH LTD.',
        CRacctNo: '6002215686'
    },
    {
        amount: 950,
        email: '',
        description: 'PAYMENT FOR RECYCLING PLASTC BOTTLES x 25 @ N40',
        status: TranactionStatus.SUCCESSFUL,
        userType: userTypeSet['USER'],
        type: TranactionType.CREDIT,
        transDate: Date.now().toLocaleString(),
        CRacctName: 'JOHN DOE',
        CRacctNo: 'XXXXXXXXX'
    }
];

const GetAllTransactions = async (req: Request, res: Response) => {
    let { email }: { email: string; password: string } = req.body;

    try {
        const AllTransactions = await Transaction.find({ email: email.toLowerCase() });
        if (AllTransactions) {
            return res.status(200).json({ Transactions: TransactionTestData });

            // return res.status(200).json({ AllTransactions });

            // return res.status(401).json({ message: 'Invalid email or password' });
        } else {
            return res.status(404).json({ message: 'No Transaction found' });
        }
    } catch (err) {
        handleError(err, res);
    }
};

const GetSingleTransactions = async (req: Request, res: Response) => {
    let { id }: { id: Types.ObjectId } = req.body;

    try {
        const AllTransactions = await Transaction.findById({ id: id });
        if (AllTransactions) {
            return res.status(200).json({ Transactions: TransactionTestData });

            // return res.status(200).json({ AllTransactions });

            // return res.status(401).json({ message: 'Invalid email or password' });
        } else {
            return res.status(404).json({ message: 'No Transaction found' });
        }
    } catch (err) {
        handleError(err, res);
    }
};

export default { GetAllTransactions, GetSingleTransactions };
