import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import CustomText from '../atoms/CustomText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BLACK, INACTIVE_COLOR, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import AppString from '../../utils/AppString';
import { FontName, FontSize } from '../../theme/Fonts';
import { FlatList } from 'react-native-gesture-handler';

const PopUpMenuApproval = ({
  isVisible,
  onPress,
  data,
  setShowModal
}) => {

  console.log("data===>", data)

  const ListRenderItem = ({ item, index }) => {
    //console.log('index', index)
    let itemRadius = index == 0 ? {
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    } : {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    }

    return (
      <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} onPress={() => onPress(item)}>
        <CustomText style={{
          ...itemRadius,
          fontSize: FontSize(12), color: PRIMARY_COLOR,
          paddingHorizontal: 30, paddingVertical: 10, backgroundColor: item.isSelectable ? WHITE : WHITE
        }} children={item.name} />


        {index == 0 ? <View style={{ height: 1, backgroundColor: LIGHTGREY }} /> : null}

      </TouchableOpacity>

    );
  }


  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={onPress}>

        <TouchableOpacity style={styles.modalContainer} onPress={setShowModal}>

          <View style={styles.innercontainer}>
            <FlatList
              style={{
                borderRadius: 10, marginVertical: 5,
                elevation: 5,
                backgroundColor: WHITE,
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
                shadowColor: BLACK
              }}
              showsVerticalScrollIndicator={false}
              renderItem={ListRenderItem}
              data={data}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.60)',


  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 15,
    top: 120,

    // width: 200,
    // height: 200,

  },
});

export default PopUpMenuApproval;
