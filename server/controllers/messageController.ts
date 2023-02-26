import { NextFunction, Request, Response} from "express";
import fs from "fs";
import path from "path";

/**
 * using sync methods because it is a small proj, otherwise would want to use the async methods
 * also am making use of a JSON file as a database -- this is not very scalable... but did so for ease of usage
 */ 

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

      res.locals = newEntry;

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
      const { messageid } = req.body;

      // getting file data
      const fileData = fs.readFileSync(path.join(__dirname, '../notesDB.json'));
      const jsonData = JSON.parse(fileData.toString());

      // storing note content and deleting the note
      res.locals = jsonData.notes[+messageid].content;
      jsonData.notes.splice(+messageid, 1);

      // rewriting the database without the note
      fs.writeFileSync(path.join(__dirname, '../notesDB.json'), JSON.stringify(jsonData));
      return next();

    } catch (error: unknown) {
      console.log('Error in deleteMessage', error);
      return next({error: error});
    }
  }

}