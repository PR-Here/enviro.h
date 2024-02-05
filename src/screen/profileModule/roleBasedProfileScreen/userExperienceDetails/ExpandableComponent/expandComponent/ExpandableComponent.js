import React, { useEffect, useState } from 'react';
// Import required components
import {
  View,
  TouchableOpacity
} from 'react-native';
import CustomText from '../../../../../../component/atoms/CustomText';
import { styles } from './Styles';
import ExpandableList from '../expandableList/ExpandableList';
import { capitalizeFirstLetter } from '../../../../../../utils/Constant';
import UpArrow from '../../../../../../../assets/images/SVG/arrow-up.svg';
import DownArrow from '../../../../../../../assets/images/SVG/downarrow.svg';

const ExpandableComponent = ({ item, onClickFunction, getBackProjectDetails }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [img, setImg] = useState(false)
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  // THIS FUNCTION IS USED TO GET DATA FROM ExpandableList COMPONENT
  // WE ARE PASSING THIS FUNCTION AS A PROPS AND GET RETURN VALUE FROM ExpandableList
  // it called when user click on ADD NEW PROJECT text
  // clickType means user wants to edit project details or wants to add new project
  // ProjectData means if user on already added project then we can get data inProjectData array otherwise it empty
  const GET_BACK_DATA_FROM_EXPANDABLELIST = (clickType, ProjectData) => {
    getBackProjectDetails(clickType, ProjectData);
  }


  return (
    <View style={styles.container}>
      {/* THIS IS THE VIEW OF WHERE YOU CAN CLICK AND SHOW THE DETAILS REGARDING EXPERIENCE */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => { onClickFunction(), setImg(!img) }}
        style={styles.header}>
        <View style={styles.viewRowStyle} >
          <CustomText children={capitalizeFirstLetter(item.company_name)} style={styles.headerText} />
          {item.isExpanded ? <UpArrow width={15} height={15} /> : <DownArrow width={15} height={15} />}
        </View>
      </TouchableOpacity>

      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>

        {/**  OUR MAIN VIEW LIKE- START AND END DATE AND OTHER DETAILS HERE*/}
        {/* {item.isExpanded && img &&
          <ExpandableList companyDetails={item} GET_BACK_DATA_FROM_EXPANDABLELIST={GET_BACK_DATA_FROM_EXPANDABLELIST} />
        } */}
        {item.isExpanded ? (
          <View>
            <ExpandableList companyDetails={item} GET_BACK_DATA_FROM_EXPANDABLELIST={GET_BACK_DATA_FROM_EXPANDABLELIST} />
          </View>
        ) : null}

      </View>
    </View>
  );
};

export default ExpandableComponent;
