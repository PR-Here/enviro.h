import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../settings/GlobalStyles";
import AssetsImages from '../../utils/AssetsImages';

const CardContainer = () => {
    return (
        <View style={[styles.card01, styles.card01Layout]}>
            <View style={[styles.card01Child, styles.linkIcon1Position]} />
            <Image
                style={styles.card01Item}
                resizeMode="cover"
                source={AssetsImages.LINE_ONE}
            />
            <View style={[styles.card01Inner, styles.lineViewLayout]} />
            <View style={[styles.lineView, styles.lineViewLayout]} />
            <View style={[styles.language, styles.phonePosition]}>
                <Pressable style={styles.vectorParent} onPress={() => { }}>
                    <Image
                        style={[styles.vectorIcon, styles.vectorIconPosition1]}
                        resizeMode="cover"
                        // source={require("../assets/vector1.png")}
                        source={AssetsImages.CLOCK}

                    />
                    <Text style={[styles.value, styles.valueTypo]}>
                        All Notifications
                    </Text>
                </Pressable>
                <Text style={[styles.title, styles.titleTypo]}>Task Manager</Text>
                <Image
                    style={[styles.checkSquareIcon, styles.iconLayout1]}
                    resizeMode="cover"
                    // source={require("../assets/checksquare.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.icon, styles.iconLayout1]}
                    resizeMode="cover"
                    // source={require("../assets/icon.png")}
                    source={AssetsImages.LINE_ONE}

                />
            </View>
            <View style={[styles.wiFi, styles.wiFiLayout]}>
                <Image
                    style={[styles.icon1, styles.iconLayout]}
                    resizeMode="cover"
                    // source={require("../assets/icon1.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.linkIcon, styles.iconLayout]}
                    resizeMode="cover"
                    // source={require("../assets/link.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.linkIcon1, styles.iconLayout]}
                    resizeMode="cover"
                    // source={require("../assets/link1.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.vectorIcon1, styles.vectorIconPosition]}
                    resizeMode="cover"
                    // source={require("../assets/vector2.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Text style={[styles.title, styles.titleTypo]}>Connect</Text>
                <Text style={[styles.value1, styles.valueTypo]}>All Notifications</Text>
            </View>
            <View style={[styles.bluetooth, styles.wiFiLayout]}>
                <Image
                    style={[styles.icon2, styles.iconLayout]}
                    resizeMode="cover"
                    // source={require("../assets/icon2.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.isolationModeIcon, styles.iconPosition1]}
                    resizeMode="cover"
                    // source={require("../assets/isolation-mode.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.vectorIcon2, styles.vectorIconPosition1]}
                    resizeMode="cover"
                    // source={require("../assets/vector3.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Text style={[styles.title2, styles.titleTypo]}>Community</Text>
                <Text style={[styles.value2, styles.valueTypo]}>All Notifications</Text>
            </View>
            <View style={[styles.phone, styles.phonePosition]}>
                <Image
                    style={[styles.vectorIcon3, styles.vectorIconPosition]}
                    resizeMode="cover"
                    // source={require("../assets/vector4.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Text style={[styles.title3, styles.titleTypo]}>Priority Settings</Text>
                <Text style={[styles.value3, styles.valueTypo]}>Default</Text>
                <Image
                    style={[styles.icon3, styles.iconLayout]}
                    resizeMode="cover"
                    // source={require("../assets/icon3.png")}
                    source={AssetsImages.LINE_ONE}

                />
                <Image
                    style={[styles.settings2Icon, styles.iconPosition1]}
                    resizeMode="cover"
                    // source={require("../assets/settings2.png")}
                    source={AssetsImages.LINE_ONE}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card01Layout: {
        height: 180,
        width: 370,
        position: "absolute",
    },
    linkIcon1Position: {
        left: 0,
        top: 0,
    },
    lineViewLayout: {
        width: 369,
        borderTopWidth: 1,
        borderColor: Color.colorWhitesmoke_100,
        borderStyle: "solid",
        left: 1,
        height: 1,
        position: "absolute",
    },
    phonePosition: {
        right: "2.43%",
        position: "absolute",
    },
    vectorIconPosition1: {
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        bottom: "15.79%",
        top: "15.79%",
        height: "68.42%",
        right: "0%",
        position: "absolute",
    },
    valueTypo: {
        textAlign: "left",
        color: Color.subtext,
        fontFamily: FontFamily.gordita,
        fontSize: FontSize.size_smi,
        top: "0%",
        position: "absolute",
    },
    titleTypo: {
        color: Color.maintext,
        textAlign: "left",
        fontFamily: FontFamily.gordita,
        fontSize: FontSize.size_smi,
        position: "absolute",
    },
    iconLayout1: {
        width: "4.61%",
        height: "84.21%",
        maxHeight: "100%",
        overflow: "hidden",
        maxWidth: "100%",
        position: "absolute",
    },
    wiFiLayout: {
        height: 19,
        position: "absolute",
    },
    iconLayout: {
        height: 16,
        width: 16,
        overflow: "hidden",
        position: "absolute",
    },
    vectorIconPosition: {
        left: "97.69%",
        width: "2.31%",
        maxHeight: "100%",
        overflow: "hidden",
        maxWidth: "100%",
        right: "0%",
        position: "absolute",
    },
    iconPosition1: {
        overflow: "hidden",
        opacity: 0.7,
        left: 0,
        position: "absolute",
    },
    card01Child: {
        borderRadius: Border.br_2xs,
        backgroundColor: Color.colorWhite,
        height: 180,
        width: 370,
        position: "absolute",
    },
    card01Item: {
        top: 45,
        height: 1,
        left: 0,
        width: 370,
        position: "absolute",
    },
    card01Inner: {
        top: 90,
    },
    lineView: {
        top: 135,
    },
    vectorIcon: {
        width: "6.61%",
        left: "93.39%",
    },
    value: {
        left: "0%",
    },
    vectorParent: {
        height: "100%",
        width: "34.87%",
        bottom: "0%",
        left: "65.13%",
        right: "0%",
        top: "0%",
        position: "absolute",
    },
    title: {
        left: "7.78%",
        top: "0%",
        color: Color.maintext,
    },
    checkSquareIcon: {
        top: "5.26%",
        right: "95.39%",
        bottom: "10.53%",
        opacity: 0.7,
        left: "0%",
    },
    icon: {
        top: "936.84%",
        right: "87.61%",
        bottom: "-921.05%",
        display: "none",
        left: "7.78%",
    },
    language: {
        height: "10.56%",
        width: "93.78%",
        top: "7.78%",
        bottom: "81.67%",
        left: "3.78%",
    },
    icon1: {
        left: 27,
        width: 16,
        display: "none",
        top: 224,
    },
    linkIcon: {
        left: 26,
        top: 224,
        display: "none",
        opacity: 0.7,
    },
    linkIcon1: {
        opacity: 0.7,
        left: 0,
        top: 0,
    },
    vectorIcon1: {
        bottom: "15.79%",
        top: "15.79%",
        height: "68.42%",
        left: "97.69%",
        width: "2.31%",
    },
    value1: {
        left: "65.13%",
    },
    wiFi: {
        top: 59,
        left: 14,
        width: 347,
    },
    icon2: {
        top: 269,
        left: 27,
        width: 16,
        display: "none",
    },
    isolationModeIcon: {
        top: 2,
        width: 19,
        height: 15,
        opacity: 0.7,
    },
    vectorIcon2: {
        width: "2.29%",
        left: "97.71%",
    },
    title2: {
        left: "8.31%",
        top: "0%",
        color: Color.maintext,
    },
    value2: {
        left: "65.33%",
    },
    bluetooth: {
        top: 104,
        width: 349,
        left: 12,
    },
    vectorIcon3: {
        height: "65%",
        top: "15%",
        bottom: "20%",
    },
    title3: {
        top: "5%",
        left: "7.51%",
    },
    value3: {
        left: "81.21%",
    },
    icon3: {
        top: 314,
        left: 27,
        width: 16,
        display: "none",
    },
    settings2Icon: {
        width: 17,
        height: 17,
        opacity: 0.7,
        top: 0,
        overflow: "hidden",
    },
    phone: {
        height: "11.11%",
        width: "93.51%",
        top: "82.22%",
        bottom: "6.67%",
        left: "4.05%",
    },
    card01: {
        top: 165,
        left: 12,
    },
});

export default CardContainer;
