import { NextFunction, Request, Response} from "express";
import fs from "fs";
import path from "path";

/**
 * using sync methods because it is a small proj, otherwise would want to use the async methods
 * also am making use of a JSON file as a database -- this is not very scalable... but did so for ease of usage
 */ 

interface IEntry {
  content: string
}

export class MessageController {

  public postMessage(req: Request, res: Response, next: NextFunction) {
    try {
      // parse req body and get content
      // have a content check of makign it between 30 - 500 characters
      const { content } = req.body;

      if (content.length < 20) return next({error: "Less than 20 count not okay"});
      if (content.length > 300) return next({error: "Less than 300 characters"});

      // parse and get contents of the JSON file
      const fileData = fs.readFileSync(path.join(__dirname, '../notesDB.json'));
      const jsonData = JSON.parse(fileData.toString());

      // create the next object that will be used to store to db
      const date = new Date();
      const newEntry = {
        timestamp: date.toLocaleDateString() +' '+ date.toLocaleTimeString(),
        content: content
      }
      const latestEntry = jsonData.notes.map((el:IEntry) => el.content);
      latestEntry.push(newEntry.content);
      res.locals = latestEntry;

      // add to the json database
      jsonData.notes.push(newEntry);
      fs.writeFileSync(path.join(__dirname, '../notesDB.json'), JSON.stringify(jsonData));

      // go to next middleware
      return next();
    } catch (error: unknown) {
      console.log('Error in postMessage', error);
      return next({error: error});
    }
  }

  public getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      // read from json database and then pass that array into res.locals
      const fileData = fs.readFileSync(path.join(__dirname, '../notesDB.json'));
      const jsonData = JSON.parse(fileData.toString());
      res.locals = jsonData;
      return next();

    } catch (error: unknown) {
      console.log('Error in getMessage', error);
      return next({error: error});
    }
  }

  public deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      // getting the index from the array
      const { content } = req.body;

      // getting file data
      const fileData = fs.readFileSync(path.join(__dirname, '../notesDB.json'));
      const jsonData = JSON.parse(fileData.toString());
      console.log(jsonData);

      // storing note content and deleting the note
      /** NOTE: The deletion method here was chosen because the JSON database was used, and if I 
       * instead used another database, i could reference the deletion via id.
       * 
       * This method also causes the issue of if there are two or more notes with the same content,
       * it will delete the first instance of that note
      */
      const remainingData: IEntry[] = [];

      let deleted = false;
      for (let i = 0; i < jsonData.notes.length; i++) {
        if (!deleted && jsonData.notes[i].content == content) {
          deleted = true;
          continue;
        }
        remainingData.push(jsonData.notes[i]);
      }
      const remainingNotes:string[] = remainingData.map((el: IEntry) => el.content);
      res.locals = remainingNotes;
      jsonData.notes = remainingData;

      // rewriting the database without the note
      fs.writeFileSync(path.join(__dirname, '../notesDB.json'), JSON.stringify(jsonData));
      return next();

    } catch (error: unknown) {
      console.log('Error in deleteMessage', error);
      return next({error: error});
    }
  }

}