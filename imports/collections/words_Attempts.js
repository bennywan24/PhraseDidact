import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


const words_Attempts = new Mongo.Collection('words_Attempts');
const Schemas = {};


Schemas.Words_Attempts = new SimpleSchema({
   wordId: {
      type: String,
      label: "wordId",
      max: 20,
   },
   courseId: {
      type: String,
      label: "courseId",
      max: 20,
   },
   userId: {
      type: String,
      label: "wordId",
      max: 20,
   },
   learnScore: {
      type: Number,
      label: "learnScore",
      defaultValue: 0,
   },
   attempted: {
      type: Boolean,
      label: "attempted",
      defaultValue: false
   }
});

words_Attempts.attachSchema(Schemas.Words_Attempts);


export default words_Attempts;