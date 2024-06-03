import express, { Request, Response } from 'express';
import { sequelize } from './database';
import { Contact } from './models/contact';
import { Op } from 'sequelize';
import dotenv from 'dotenv';
import helmet from 'helmet';
import validator from 'validator';

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

app.get('/', async (req: Request, res: Response) => {
    return res.json({
        message:"Server is running"
    });

})
app.post('/identify', async (req: Request, res: Response) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: 'Email or phone number required' });
    }

    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (phoneNumber && !validator.isMobilePhone(phoneNumber, 'any')) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    let contacts: Contact[] = [];
    if (email && phoneNumber) {
        contacts = await Contact.findAll({
            where: {
                [Op.or]: [{ email }, { phoneNumber }],
            },
        });
    } else if (email) {
        contacts = await Contact.findAll({ where: { email } });
    } else if (phoneNumber) {
        contacts = await Contact.findAll({ where: { phoneNumber } });
    }

    if (contacts.length === 0) {
        const newContact = await Contact.create({
            email,
            phoneNumber,
            linkedId: null,
            linkPrecedence: 'primary',
        });
        return res.json({
            contact: {
                primaryContatctId: newContact.id,
                emails: email ? [email] : [],
                phoneNumbers: phoneNumber ? [phoneNumber] : [],
                secondaryContactIds: [],
            },
        });
    }

    let primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary');
    if (!primaryContact) {
        primaryContact = contacts[0];
        primaryContact.linkPrecedence = 'primary';
        await primaryContact.save();
    }

    const secondaryContacts = contacts.filter(contact => contact.linkPrecedence === 'secondary' || contact.id !== primaryContact.id);
    const emails = new Set([primaryContact.email, ...secondaryContacts.map(contact => contact.email)].filter(Boolean));
    const phoneNumbers = new Set([primaryContact.phoneNumber, ...secondaryContacts.map(contact => contact.phoneNumber)].filter(Boolean));
    const secondaryContactIds = secondaryContacts.map(contact => contact.id);

    if (!contacts.some(contact => contact.email === email) || !contacts.some(contact => contact.phoneNumber === phoneNumber)) {
        const newSecondaryContact = await Contact.create({
            email,
            phoneNumber,
            linkedId: primaryContact.id,
            linkPrecedence: 'secondary',
        });
        secondaryContactIds.push(newSecondaryContact.id);
        if (email) emails.add(email);
        if (phoneNumber) phoneNumbers.add(phoneNumber);
    }

    res.json({
        contact: {
            primaryContatctId: primaryContact.id,
            emails: Array.from(emails),
            phoneNumbers: Array.from(phoneNumbers),
            secondaryContactIds,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
