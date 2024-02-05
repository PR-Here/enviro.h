import React, { useState,useCallback } from 'react';
import {Text, StyleSheet,View} from 'react-native';
import { BLUE } from '../../theme/Colors';






const CustomExpandableText = ({textValue}) => {

    const [textShown,setTextShown] = useState(false)
    const [lengthMore,setLengthMore] = useState(false)

    const toggleNumberOfLine = () =>{
            setTextShown(!textShown)

    }

    const onTextLayout =  useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=3);

    },[]);

    return(

      <View style={styles.container}>

        <Text
         onTextLayout={onTextLayout}
         numberOfLines={textShown ? undefined : 3}
         style = {{lineHeight:21}}>{textValue}
         {
            lengthMore ? <Text
               onPress={toggleNumberOfLine}
               style={{color:BLUE,lineHeight:21,marginTop:4}}>
                {textShown ? 'Read Less': 'Read More'}
               </Text> : null
         }

         </Text>



      </View>


    )
}



const styles = StyleSheet.create({

    container:{
        padding: 10,
        backgroundColor:'white'
    }

})


export default CustomExpandableText;
