import * as functions from 'firebase-functions';
import * as express from 'express';
import { addPerson, getAllPersons, updatePerson, deletePerson } from './entryController' 

const app = express()

app.get('/', (req, res) => res.status(200).send('Hey there!'))

app.post('/person', addPerson )
app.get('/person', getAllPersons )
app.patch('/person/:personId', updatePerson)
app.delete('/person/:personId', deletePerson)



exports.app = functions.https.onRequest(app);
