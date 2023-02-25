import { NextFunction, Request, Response} from "express";
import fs from "fs";
import path from "path";

module.exports = {
  postMessage: async (req: Request, res: Response, next: NextFunction) => {
    // given a request body, parse it and store to db

    try {
      // parse req body and get content
      const { content } = req.body;

      // parse and get contents of the JSON file
      const fileData = fs.readFileSync(path.join(__dirname, '../notesDB.json'));
      const jsonData = JSON.parse(fileData.toString());

      // create the next object that will be used to store to db
      const date = new Date();
      const newEntry = {
        timestamp: date.toLocaleDateString(),
        content: content
      }

      // go to next middleware
      return next();
    } catch (error: unknown) {
      console.log('Error in postMessage', error);
      return next({error: error});
    };
  }
}