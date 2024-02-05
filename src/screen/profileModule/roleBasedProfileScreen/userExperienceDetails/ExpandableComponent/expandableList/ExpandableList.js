import React, { useEffect, useState } from 'react';
// Import required components
import { View, TouchableOpacity, FlatList } from 'react-native';
import CustomText from '../../../../../../component/atoms/CustomText';
import { styles } from './ExpandableListStyle';
import AppString from '../../../../../../utils/AppString';
import { capitalizeFirstLetter } from '../../../../../../utils/Constant';
import CalenderIcon from '../../../../../../../assets/images/SVG/calendar_days.svg';

let isProjectDataEditArray = [];

const ExpandableList = ({ companyDetails, GET_BACK_DATA_FROM_EXPANDABLELIST }) => {
  const [companyProject, setCompanyProject] = useState(companyDetails?.projects)

  useEffect(() => { }, [companyProject, companyDetails])

  // Project List View
  const RenderItemProject = (item, index) => {

    return (
      <TouchableOpacity onPress={() => {
        isProjectDataEditArray = []
        isProjectDataEditArray.push({
          company_name: companyDetails?.company_name,
          designation: companyDetails?.designation,
          from_date: companyDetails?.from_date,
          id: companyDetails?.id,
          isExpanded: companyDetails?.isExpanded,
          to_date: companyDetails?.to_date,
          projects: [item]
        })
        GET_BACK_DATA_FROM_EXPANDABLELIST('clickOnEdit', isProjectDataEditArray)
      }}>
        <View>
          <View style={styles.viewStyle}>
            <CustomText children={'Project:'} style={styles.title} />
            <CustomText children={capitalizeFirstLetter(item?.role)} style={styles.subTitle} />
            <View style={styles.separator} />
          </View>
          {/* start date */}
          <View style={styles.viewDateBottomStyle}>
            <View style={styles.viewColumStyle}>
              <CustomText children={'Start Date'} style={styles.title} />

              <View style={styles.viewStartDateStyle}>
                <CustomText children={item?.start_date} style={styles.subDateTitle} />
                <CalenderIcon />
              </View>
              <View style={styles.separatorStartDate} />
            </View>
            {/* End date */}
            <View style={styles.viewColumStyle}>
              <CustomText children={'End Date:'} style={styles.title} />

              <View style={styles.viewStartDateStyle}>
                <CustomText children={item?.end_date} style={styles.subDateTitle} />
                <CalenderIcon />
              </View>
              <View style={styles.separatorStartDate} />
            </View>
          </View>
          <View style={styles.viewStyle}>
            <CustomText children={'Project Description :'} style={styles.title} />
            <CustomText children={item?.description} style={styles.projectDesc} />
            <View style={[styles.separator, {}]} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // header View
  const RenderItemHeader = ({ headItem }) => {
    return (
      <TouchableOpacity
      // style={{backgroundColor:'red'}}
       onPress={() => {
        isProjectDataEditArray = []
        isProjectDataEditArray.push({
          company_name: companyDetails?.company_name,
          designation: companyDetails?.designation,
          from_date: companyDetails?.from_date,
          id: companyDetails?.id,
          isExpanded: companyDetails?.isExpanded,
          to_date: companyDetails?.to_date,
          projects: [
            companyDetails?.projects[0]
          ]
        })
        
        GET_BACK_DATA_FROM_EXPANDABLELIST('clickOnCompanyName', isProjectDataEditArray)
      }}>
        <View style={styles.viewStyle}>
          <CustomText children={'Company Name:'} style={styles.title} />
          <CustomText children={companyDetails?.company_name} style={styles.subTitle} />
          <View style={styles.separator} />
        </View>

        <View style={styles.viewStyle}>
          <CustomText children={'Title:'} style={styles.title} />
          <CustomText children={companyDetails?.designation} style={styles.subTitle} />
          <View style={styles.separator} />
        </View>

        <View style={styles.viewDateBottomStyle}>
          <View style={styles.viewColumStyle}>
            <CustomText children={'Start Date:'} style={styles.title} />
            <View style={styles.viewStartDateStyle}>
              <CustomText children={companyDetails?.from_date} style={styles.subDateTitle} />
              <CalenderIcon />
            </View>
            <View style={styles.separatorStartDate} />
          </View>

          <View style={styles.viewColumStyle}>
            <CustomText children={'End Date:'} style={styles.title} />
            <View style={styles.viewStartDateStyle}>
              <CustomText children={companyDetails?.to_date} style={styles.subDateTitle} />
              <CalenderIcon />
            </View>
            <View style={styles.separatorStartDate} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {/**Project List Data */}
      <FlatList
        style={{ marginTop: 5 }}
        data={companyDetails?.projects}
        renderItem={({ item }) => RenderItemProject(item)}
        keyExtractor={item => item?.id}
        scrollEnabled={false}
        ListHeaderComponent={RenderItemHeader}
      />
      {/* ADD NEW PROJECT BUTTON */}
      <TouchableOpacity onPress={() => {
        isProjectDataEditArray = []
        isProjectDataEditArray.push({
          company_name: companyDetails?.company_name,
          designation: companyDetails?.designation,
          from_date: companyDetails?.from_date,
          id: companyDetails?.id,
          isExpanded: companyDetails?.isExpanded,
          to_date: companyDetails?.to_date,
          projects: []
        })
        GET_BACK_DATA_FROM_EXPANDABLELIST('clickOnAddNewProject', isProjectDataEditArray)
      }}>
        <CustomText
          children={AppString.ADD_NEW_PROJECT}
          style={styles.addExperienceStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ExpandableList;
