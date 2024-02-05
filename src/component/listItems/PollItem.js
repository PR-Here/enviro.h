/* event with poll component */
import { StyleSheet, View } from "react-native"
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { useEffect, useState } from "react";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../theme/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import CustomText from "../atoms/CustomText";
import { FontName, FontSize } from "../../theme/Fonts";
import CustomTextInput from "../atoms/CustomTextInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function PollItem({
  type,
  label,
  containerStyle,
  index,
  radioChecked,
  onToggle,
  onCheckBox,
  onChangeText,
  shortAns,
  onEndEditing }) {

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  useEffect(() => {
  }, [type, index, radioChecked])

  if (type === 3) {
    return (
      <CustomTextInput style={styles.input}
        placeholder={'Type here'}
        onChangeText={onChangeText}
        value={shortAns}
        onEndEditing={
          onEndEditing
        }
      />
    )
  }

  else {
    return (
      <View style={[styles.conatiner, containerStyle]}>
        {
          type === 1 ?
            (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
                <CircleCheckBox
                  checked={radioChecked}
                  onToggle={onToggle}
                  labelPosition={LABEL_POSITION.RIGHT}
                  outerSize={16}
                  innerSize={7}
                  filterSize={12}
                  filterColor={WHITE}
                  innerColor={'#E49273'}
                  outerColor={radioChecked ? '#E49273' : GREY}
                />
                <View style={styles.optionConatiner}>
                  <CustomText style={styles.text}>{label}</CustomText>
                </View>
              </View>
            )
            : type === 2 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <BouncyCheckbox
                  fillColor='#E49273'
                  iconStyle={{ borderRadius: 3 }}
                  size={16}
                  isChecked={toggleCheckBox}
                  innerIconStyle={{ borderRadius: 3, borderColor: 'grey' }}
                  onPress={() => {
                    onCheckBox()
                    setToggleCheckBox(!toggleCheckBox)
                  }}
                />
                <View style={styles.optionConatiner}>
                  <CustomText style={styles.text}>{label}</CustomText>
                </View>
              </View>
            )
              : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: heightPercentageToDP(1.2),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: LIGHTGREY
  },
  text: {
    fontSize: FontSize(14),
    fontWeight: '400',
    color: BLACK,
    fontFamily: FontName.Gordita_Medium
  },
  input: {
    width: '100%',
    height: heightPercentageToDP(9.1),
    borderRadius: heightPercentageToDP(0.5),
    borderColor: LIGHTGREY,
    marginTop: heightPercentageToDP(1.5),
    textAlignVertical: 'top',
    color: BLACK,
    padding: 10
  },

})

export default PollItem