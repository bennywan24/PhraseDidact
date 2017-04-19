import faker from 'faker';
import chai, {expect} from 'chai';

import ServerCommon from './serverCommon.test';

import Instructor_Meth from '../../M_methods/instructor_Meth';

import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';






describe("instructor_Meth.js - instructor.addCourse() Meteor method", function() {

   it("An instructor adding simple courses to DB [success]", function () {
      // setting up test data
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Generic Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      // calling the method to test...
      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      // retrieving the result...
      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);

      // testing the result
      expect(result).to.exist;


      test_courseName = "Generic Course 2";
      test_access = "private";
      test_description = faker.lorem.sentences();
      test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );
      result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("A learner adding a simple course to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(false);
      let test_courseName = "Generic Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("A unlogged user adding a simple course to DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();
      let test_courseName = "Generic Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with too big (exceptional - 151, 152) Course Names to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = 'a'.repeat(151);
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      // operations should fail
      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      test_courseName = 'a'.repeat(152);

      funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      // check that DB has not been modified
      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with an on-limit (extreme - 150) Course Name to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = 'a'.repeat(150);
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor adding a course with an invalid (exceptional) Access to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Error Course 1";
      let test_access = "vip";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with too big (exceptional - 5001, 5002) Description to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Error Course 1";
      let test_access = "public";
      let test_description = 'a'.repeat(5001);
      let test_tags = faker.lorem.words();

      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      test_description = 'a'.repeat(5002);

      funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with an on-limit (extreme - 5000) Description to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Limit Course 1";
      let test_access = "public";
      let test_description = 'a'.repeat(5000);
      let test_tags = faker.lorem.words();;

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor adding a course with too big (exceptional - 1001, 1002) Tag sections to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Error Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = 'a'.repeat(1001);

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      test_tags = 'a'.repeat(1002);

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with an on-limit (extreme - 1000) Tag section to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Limit Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = 'a'.repeat(1000);

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor adding a course with a Course Name that already exists [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_courseName = "Dup Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );
      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;

      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Meteor.Error );
   });

});


describe("instructor_Meth.js - instructor.fetchCourseByUser() Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();
   });

   it("Checking if returned details from an existing course owned by an instructor matches what is expected", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Meteor.call('instructor.fetchCourseByUser', "Generic Course 1");


      expect( result.userId ).to.equal( DEFAULT_userId );
      expect( result.courseName ).to.equal( test_courseName );
      expect( result.access ).to.equal( test_access );
      expect( result.description ).to.equal( test_description );

      let tagArray = test_tags.replace( /\n/g, " " ).split( " " );
      expect( result.tags ).to.eql( tagArray );
   });

   it("Checking if returned details from a non-existing course, called by an instructor matches what is expected", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Meteor.call('instructor.fetchCourseByUser', "coursedoesnotexist");

      expect( result ).to.be.null;
   });

   it("Checking if returned details from an existing course, called by an instructor that does NOT own it returns null", function () {
      ServerCommon.sim_LogInDifferentUser(true);

      let result = Meteor.call('instructor.fetchCourseByUser', "Generic Course 1");

      expect( result ).to.be.null;
   });

   it("Checking if LEARN account returns null", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      let result = Meteor.call('instructor.fetchCourseByUser', "Generic Course 1");

      expect( result ).to.be.null;
   });

   it("Checking if unlogged user returns null", function () {
      ServerCommon.sim_UserIsUnlogged();

      let result = Meteor.call('instructor.fetchCourseByUser', "Generic Course 1");

      expect( result ).to.be.null;
   });

});


describe("instructor_Meth.js - instructor.removeCourse() Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();
      ServerCommon.genericWordPair_Setup();
   });

   it("An instructor removing a simple course that he/she owns from DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
      let result2 = Courses_Words.findOne( {} );
      expect(result2).to.not.exist;
   });

   it("Another instructor removing a simple course that he/she does NOT own from DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(true);

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
      let result2 = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result2).to.exist;
   });

   it("A learner removing a course from DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
      let result2 = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result2).to.exist;
   });

   it("An unlogged user removing a course from DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
      let result2 = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result2).to.exist;
   });

   it("An instructor removing a course that does NOT exist [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('instructor.removeCourse', "coursedoesnotexist" );

      // checking DB is not modified
      let allDBDocs = Courses_Configs.find().fetch();
      expect( allDBDocs ).to.have.lengthOf(1);
      let result = ServerCommon.course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
      let result2 = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result2).to.exist;
   });

});
