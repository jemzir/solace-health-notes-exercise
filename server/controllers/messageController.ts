import { NextFunction, Request, Response} from "express";
import fs from "fs";
import path from "path";

module.exports.default = {
  postMessage: async (req: Request, res: Response, next: NextFunction) => {
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
        timestamp: date.toLocaleDateString(),
        content: content
      }

      // add to the json database
      jsonData.notes.push(newEntry);
      fs.writeFileSync(path.join(__dirname, '../notesDB.json'), jsonData);

      // go to next middleware
      return next();
    } catch (error: unknown) {
      console.log('Error in postMessage', error);
      return next({error: error});
    }
  }
}