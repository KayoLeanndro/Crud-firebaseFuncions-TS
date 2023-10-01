import { Response } from "express"
import { db } from './config/firebase'

type Person = {
    name: string,
    email: string
}

type Request = {
    body: Person,
    params: { personId: string }
}

const addPerson = async (req: Request, res: Response) => {
    const { name, email } = req.body
    try {
        const person = db.collection('entries').doc()
        const personObject = {
            id: person.id,
            name,
            email
        }

        person.set(personObject)

        res.status(200).send({
            status: 'success',
            message: 'person added successfully',
            data: personObject
        })


    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getAllPersons = async (req: Request, res: Response) => {
    try {
        const allEntries: Person[] = []
        const querySnapshot = await db.collection('entries').get()
        querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
        return res.status(200).json(allEntries)
    } catch (error) {
       return res.status(500).json(error.message)
    }
    
    /*const getAllPersons = async (req: Request, res: Response) => {
        try {
            const querySnapshot = await db.collection('entries').get();
            const allEntries = querySnapshot.docs.map((doc) => doc.data());
            
            return res.status(200).json(allEntries);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }; */
    //Alternative code 
}

const updatePerson = async (req: Request, res: Response) => {
    const {body: { name, email}, params : {personId} } = req

    try{
        const person = db.collection('entries').doc(personId)
        const currentData = ((await person.get()).data() || {})

        const personObject = {
                name: name || currentData.name,
                email:  email || currentData.email  
        }
         await person.set(personObject)

         return res.status(200).json({
            status: 'success',
            message: 'person update successfully',
            data: personObject
         })
    }catch(error){
        return res.status(500).json(error.message)
    }
}

const deletePerson = async (req: Request, res: Response) => {
    const { personId } = req.params
  
    try {
      const person = db.collection('entries').doc(personId)
  
      await person.delete().catch(error => {
        return res.status(400).json({
          status: 'error',
          message: error.message
        })
      })
  
      return res.status(200).json({
        status: 'success',
        message: 'person deleted successfully',
      })
    }
    catch(error) { return res.status(500).json(error.message) }
  }
  
  export { addPerson, getAllPersons, updatePerson, deletePerson }