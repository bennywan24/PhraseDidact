import React, {Component} from 'react';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class CountrySelect extends Component {

   render(){
      let result = Ui_Util.create_SingleSelect_fromObj( DB_Const.COUNTRY_LEARNPROF, "Select a Country" );

      this.selectRef = result.selectRef;
      return result.jsx;
   }

}

export default CountrySelect;
