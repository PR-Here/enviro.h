/*eslint-disable*/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  BackHandler
} from 'react-native';
import NavString from '../../../utils/NavString';
import AllCourses from '../AllCourses';
import AllQuestion from '../AllQuestion';
import AllSolution from '../AllSolution';
import Categories from '../Categories';
import CategoriesDetails from '../CategoriesDetails';
import Certificate from '../Certificate';
import Courses from "../Courses";
import MarketingLeadership from '../MarketingLeadership';
import Result from '../Result';
import { useRoute } from '@react-navigation/native';
import PdfView from '../PdfView';
import ContinueLearning from '../ContinueLearning';
import SavedCourses from '../SavedCourses';


const GuruKul = createNativeStackNavigator();

const GurukulStack = ({ navigation }) => {
  const route = useRoute();
  //console.log('GurukulStack route.name=> ', route.name)

  return (
    <GuruKul.Navigator
      initialRouteName={NavString.COURSES}
      screenOptions={{
        headerShown: false,
      }}>
      <GuruKul.Screen name={NavString.COURSES} component={Courses} />
      <GuruKul.Screen name={NavString.CATEGORIES} component={Categories} />
      <GuruKul.Screen name={NavString.ALL_COURSES} component={AllCourses} />
      <GuruKul.Screen name={NavString.CATEGORIES_DETAILS} component={CategoriesDetails} />
      <GuruKul.Screen name={NavString.MARKETING_LEADERSHIP} component={MarketingLeadership} />
      <GuruKul.Screen name={NavString.MARKETING_QUESTION} component={AllQuestion} />
      <GuruKul.Screen name={NavString.GURUKUL_RESULT} component={Result} />
      <GuruKul.Screen name={NavString.ALL_SOLUTION} component={AllSolution} />
      <GuruKul.Screen name={NavString.CERTIFICATE} component={Certificate} />
      <GuruKul.Screen name={NavString.PDF_VIEW} component={PdfView} />
      <GuruKul.Screen name={NavString.CONTINUE_LEARNING} component={ContinueLearning} />
      <GuruKul.Screen name={NavString.SAVED_COURSES} component={SavedCourses} />

    </GuruKul.Navigator>
  );
};

export default GurukulStack;
