import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import CustomText from '../../component/atoms/CustomText';
import MeetingHomeHeader from '../../component/header/MeetingHeader';
import { BUTTON_BACKGROUND, INACTIVE_COLOR, LIGHTGREY, LIGHT_BLUE, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import { styles } from './Style';


import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import CIRCLEPLUS from '../../../assets/images/SVG/circle_plus.svg';
import DROPDOWNARROW from '../../../assets/images/SVG/downarrow.svg';
import KANBANICON from '../../../assets/images/SVG/kanban_icon.svg';
import FILTER from '../../../assets/images/SVG/project_filter.svg';
import PROJECTHOME from '../../../assets/images/SVG/project_home.svg';
import SEARCH from '../../../assets/images/SVG/search_icon.svg';
import USERIMAGE from '../../../assets/images/SVG/user_dummy_image.svg';
import CustomButton from '../../component/atoms/CustomButton';
import { FontName, FontSize } from '../../theme/Fonts';
import ItemListModal from './ItemListModal';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import MeetingCalender from '../meetingModule/meetingCalender/MeetingCalender';
import { GetMonths } from '../../utils/Constant';
import moment from 'moment';
import { moderateScale } from 'react-native-size-matters';


const ProjectManagementDetails = ({ navigation }) => {


    const [isModalVisible, setModalVisible] = useState(false);

    const [selectedFilterData, setSelectedFilterData] = useState(false);
    const data = [{ id: 1, name: 'Main Table' }, { id: 2, name: 'TimeLine' }, { id: 3, name: 'Kanban' }];


    const [planningData, setPlannningData] = useState([
        {
            array: [
                {
                    id: 1,
                    name: 'Planning'
                },
                {
                    id: 2,
                    name: 'Task1'

                },
                {
                    id: 2,
                    name: 'Task2'

                },
                {
                    id: 3,
                    name: 'Task3'

                },
                {
                    id: 4,
                    name: 'MileStone Planning'

                },
                {
                    id: 5,
                    name: '+ Add Task'
                }

            ]

        },
        {

            array: [
                {
                    id: 1,
                    name: 'Status'
                },
                {
                    id: 2,
                    name: 'Done'

                },
                {
                    id: 2,
                    name: 'Done'

                },
                {
                    id: 3,
                    name: 'Done'

                },
                {
                    id: 4,
                    name: 'Done'

                },
                {
                    id: 5,
                    name: ''
                }

            ]

        },
        {
            array: [
                {
                    id: 1,
                    name: 'TimeLine'
                },
                {
                    id: 2,
                    name: 'Dec 1-9'

                },
                {
                    id: 2,
                    name: 'Jan 7-22'

                },
                {
                    id: 3,
                    name: 'Dec 1-9'

                },
                {
                    id: 4,
                    name: 'Dec 1-9'

                },
                {
                    id: 5,
                    name: 'Dec 1-9'

                },

            ]

        },
        {

            array: [
                {
                    id: 1,
                    name: 'Duration'
                },
                {
                    id: 2,
                    name: '9 Days'

                },
                {
                    id: 2,
                    name: '7 Days'

                },
                {
                    id: 3,
                    name: '19 Days'

                },
                {
                    id: 4,
                    name: '9 Days'

                },
                {
                    id: 5,
                    name: '9 Days'
                }

            ]

        },
    ])



    const [executiveData, setExecutiveData] = useState([
        {
            array: [
                {
                    id: 1,
                    name: 'Executive'
                },
                {
                    id: 2,
                    name: 'Task1'

                },
                {
                    id: 2,
                    name: 'Task2'

                },
                {
                    id: 3,
                    name: 'Task3'

                },
                {
                    id: 4,
                    name: 'MileStone Planning'

                },
                {
                    id: 5,
                    name: '+ Add Task'
                }

            ]

        },
        {

            array: [
                {
                    id: 1,
                    name: 'Status'
                },
                {
                    id: 2,
                    name: 'Next Step'

                },
                {
                    id: 2,
                    name: 'Next Step'

                },
                {
                    id: 3,
                    name: 'Next Step'

                },
                {
                    id: 4,
                    name: 'Next Step'

                },
                {
                    id: 5,
                    name: ''
                }

            ]

        },
        {
            array: [
                {
                    id: 1,
                    name: 'TimeLine'
                },
                {
                    id: 2,
                    name: 'Dec 1-9'

                },
                {
                    id: 2,
                    name: 'Jan 7-22'

                },
                {
                    id: 3,
                    name: 'Dec 1-9'

                },
                {
                    id: 4,
                    name: 'Dec 1-9'

                },
                {
                    id: 5,
                    name: 'Dec 1-9'

                },

            ]

        },
        {

            array: [
                {
                    id: 1,
                    name: 'Duration'
                },
                {
                    id: 2,
                    name: '9 Days'

                },
                {
                    id: 2,
                    name: '7 Days'

                },
                {
                    id: 3,
                    name: '19 Days'

                },
                {
                    id: 4,
                    name: '9 Days'

                },
                {
                    id: 5,
                    name: '9 Days'
                }

            ]

        },
    ])



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [selectType, setSelectedType] = useState('Main Table')

    const [projectList, setProjectList] = useState([
        {
            id: 1,
            projectName: 'All Project',
            firstLetter: 'All',
            backgroundColor: '#F17C1D',
            isSelected: false

        },
        {
            id: 2,
            projectName: 'Website Project',
            firstLetter: 'B',
            backgroundColor: '#0BA476',
            isSelected: false

        },
        {
            id: 3,
            projectName: 'Social Plan',
            firstLetter: 'T',
            backgroundColor: '#2398CE',
            isSelected: false

        },
        {
            id: 4,
            projectName: 'One App UI,UX',
            firstLetter: 'R',
            backgroundColor: '#FF5A00',
            isSelected: false

        }
    ])


    const [projectStatusList, setProjectStatusList] = useState([
        {
            id: 1,
            projectStatusName: 'In Progress',
            statusNumber: "4"

        },
        {
            id: 2,
            projectStatusName: 'Stuck',
            statusNumber: "2"


        },
        {
            id: 3,
            projectStatusName: 'Pending Approval',
            statusNumber: "5"


        },
        {
            id: 4,
            projectStatusName: 'Done',
            statusNumber: "5"

        }
    ])


    const [projectPlanList, setProjectPlanList] = useState([

        {
            id: 1,
            status: 'Done(2)',
            color: '#33D491',
            planArray: [
                {
                    id: 1,
                    name: 'Print flyers',
                    designSatus: 'Done',
                    color: '#33D491',
                    user: 1



                },
                {
                    id: 2,
                    name: 'Make Decision on cost value',
                    designSatus: 'Done',
                    color: '#33D491',
                    user: 2



                }

            ]

        },
        {
            id: 2,
            status: 'Done(2)',
            color: '#FDBB63',
            planArray: [
                {

                    id: 1,
                    name: 'Print flyers',
                    designSatus: 'Working',
                    color: '#FDBB63',
                    user: 2

                }
            ]


        },
        {
            id: 2,
            status: 'Stuck(0)',
            color: 'red',
            planArray: [

            ]

        },
        {
            id: 2,
            status: 'Stuck(0)',
            color: 'grey',
            planArray: [
                {
                    id: 1,
                    name: 'Print flyers',
                    designSatus: 'Done',
                    color: 'grey',
                    user: 1



                },
                {
                    id: 2,
                    name: 'Make Decision on cost value',
                    designSatus: 'Done',
                    color: 'grey',
                    user: 2



                }
            ]


        }
    ])

    const dataCalender = [
        {
            title: 'Print Flyer',
            start: moment(),
            end: moment().add(2, 'hours'),
            meetingLink: 'https://meet.google.com/zou-apux-yfs'
        },
        {
            title: 'Weekly team meeting',
            start: moment().add(1, 'days'),
            end: moment().add(1, 'days').add(2, 'hours'),
            meetingLink: 'https://meet.google.com/zou-apux-yfs'
        },
        {
            title: 'Interview Candidate for new position',
            start: moment().subtract(1, 'days'),
            end: moment().subtract(1, 'days').add(2, 'hours'),
            meetingLink: 'https://meet.google.com/zou-apux-yfs'
        },
        {
            title: 'Print Flyer',
            start: moment().add(1, 'days'),
            end: moment().add(3, 'days'),
            meetingLink: 'https://meet.google.com/zou-apux-yfs'
        },
        {
            title: 'Weekly team meeting',
            start: moment().subtract(3, 'days').add(1, 'hours'),
            end: moment().subtract(3, 'days').add(2, 'hours'),
            meetingLink: 'https://meet.google.com/zou-apux-yfs'
        },
        {
            title: 'Interview Candidate for new position',
            start: moment().subtract(1, 'days').add(1, 'hours'),
            end: moment().subtract(1, 'days').add(3, 'hours'),
            meetingLink: 'https://meet.google.com/zou-apux-yfs'
        },
    ]


    const ProjectItem = ({ item, index }) => {

        return (

            <TouchableOpacity onPress={() => {
                let items = [...projectList]
                items.map((selected) => {
                    selected.isSelected = false
                })
                items[index].isSelected = true
                setProjectList(items)
            }}>
                <View style={[styles.projectItemConatiner, { backgroundColor: item.isSelected ? '#D4E8E2' : null }]}>
                    <View style={[styles.projectItemInner, { backgroundColor: item.backgroundColor }]}>
                        <CustomText children={item.firstLetter} style={styles.firstLetterStyle} />
                    </View>
                    <CustomText children={item.projectName} style={styles.projectNameStyle} />
                </View>
            </TouchableOpacity>

        )
    }

    const ProjectStatusItem = ({ item, index }) => {

        return (
            <View style={[styles.projectStatusContainer]}>
                <CustomText children={item.projectStatusName} style={styles.projectStatusNameStyle} />
                <CustomText children={item.statusNumber} style={styles.projectStatusNumberStyle} />
            </View>
        )
    }

    const ProjectStatusInnerItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: WHITE, marginTop: 10, padding: 10, borderRadius: widthPercentageToDP(4) }}>

                <CustomText children={item.name} style={styles.planNameStyle} />
                <CustomText children={'Project High Level Plan > This Week'} style={[styles.planName2Style, { backgroundColor: '#F5F6F8', paddingHorizintal: 20 }]} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>

                    <CustomText children={'Design'} style={styles.planOptionStyle} />
                    <View style={{ backgroundColor: item.color, borderRadius: 5, paddingHorizontal: widthPercentageToDP(8.1), paddingVertical: widthPercentageToDP(2) }}>
                        <CustomText children={item.designSatus} style={styles.designStatusStyle} />
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <CustomText children={'Updates'} style={styles.planOptionStyle} />
                    <View style={{ backgroundColor: '#F5F6F8', borderRadius: 5, paddingHorizontal: widthPercentageToDP(10), paddingVertical: widthPercentageToDP(2) }}>
                        {/* <CustomText children={item.designSatus} style={styles.designStatusStyle} /> */}

                        <CIRCLEPLUS />
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>

                    <CustomText children={'Owner'} style={styles.planOptionStyle} />
                    <View style={{ backgroundColor: '#F5F6F8', borderRadius: 5, paddingHorizontal: widthPercentageToDP(10), paddingVertical: widthPercentageToDP(2) }}>
                        {/* <CustomText children={item.designSatus} style={styles.designStatusStyle} /> */}
                        <USERIMAGE />
                    </View>

                </View>

            </View >
        )
    }

    const KanbanItem = ({ item, index }) => {

       // console.log(item)
        return (

            <View style={styles.kanbanContainer}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ height: widthPercentageToDP(3), width: widthPercentageToDP(3), borderRadius: 100, backgroundColor: item.color }} />
                    <CustomText children={item.status} style={styles.kanbanStatusTextStyle} />

                </View>

                <FlatList
                    style={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={false}
                    renderItem={({ item, index }) => (

                        <ProjectStatusInnerItem item={item} index={index} />
                    )}
                    data={item.planArray}
                />



            </View>

        )

    }

    const TableItem = ({ item, index, parentIndex, type }) => {

       // console.log('indexes', index, parentIndex)
        let textColor = PRIMARY_COLOR
        let backgroundColor = WHITE
        let textbackgroundColor = null
        let paddingHorizintal = widthPercentageToDP(4)
        let paddingVertical = 0
        let borderRadius = 0
        let paddingVerticalParent = widthPercentageToDP(4)

        if (index == 0 && parentIndex == 0) {
            textColor = type == 1 ? LIGHT_BLUE : '#F17C1D'
        }
        if (index != 0 && parentIndex == 1 && item.name != '') {
            textColor = WHITE
            backgroundColor = type == 1 ? '#33D491' : '#4871AB'
        }
        if (index != 0 && parentIndex == 2) {
            textColor = WHITE
            textbackgroundColor = type == 1 ? '#0088BC' : '#F17C1D'
            paddingHorizintal = widthPercentageToDP(2)
            borderRadius = widthPercentageToDP(10)
            paddingVertical = widthPercentageToDP(1.9)
            paddingVerticalParent = widthPercentageToDP(2)
        }

        return (
            <View style={{
                backgroundColor: backgroundColor,
                borderWidth: index == 0 ? 0 : 1,
                borderTopLeftRadius: index == 1 && parentIndex == 0 ? widthPercentageToDP(3) : 0,
                borderColor: '#E1E1E1', paddingHorizontal: 10,
                paddingVertical: index == 0 ? 0 : paddingVerticalParent,
                borderTopRightRadius: index == 1 && parentIndex == 3 ? 10 : 0,
                borderBottomStartRadius: index == 5 && parentIndex == 0 ? 10 : 0
            }}>

                <CustomText children={item.name} style={[styles.textheader, {
                    color: textColor,
                    backgroundColor: textbackgroundColor,
                    paddingStart: paddingHorizintal, paddingEnd: paddingHorizintal,
                    paddingTop: paddingVertical,
                    paddingBottom: paddingVertical,
                    borderRadius: borderRadius
                }]} />

            </View>
        )

    }


    const TableColumn = ({ item, index1, type }) => {

        return (

            <View>

                {/* <CustomText children={'hello'} /> */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={false}
                    renderItem={({ item, index }) => (

                        <TableItem item={item} index={index} parentIndex={index1} type={type} />
                    )}
                    data={item.array}
                />
            </View>
        )

    }



    const MainTable = () => {

        return (
            <View style={{ padding: 10, margin: 3 }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item, index }) => (

                        <TableColumn item={item} index1={index} type={1} />
                    )}
                    data={planningData}
                />

                <FlatList
                    style={{ marginTop: 20 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item, index }) => (

                        <TableColumn item={item} index1={index} type={2} />
                    )}
                    data={executiveData}
                />
            </View>
        )
    }


    return (

        <View style={styles.container}>
            {/* Header */}
            <MeetingHomeHeader
                headerText={'Project Management'}
                filter={true}
                icon={'notification'}
                onNotificatinClick={() => {
                }}
            />
            <View style={{
                height: moderateScale(1),
                backgroundColor: '#DEDEDE',
            }}></View>

            <ScrollView>
                <View>
                    <CustomText children={'Projects'} style={styles.headingText} />

                    <View style={{ marginRight: 12, marginTop: 10 }}>
                        <FlatList

                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({ item, index }) => (

                                <ProjectItem item={item} index={index} />
                            )}
                            data={projectList}
                        />
                    </View>

                    <View style={{ backgroundColor: '#D4E8E2', padding: 10, borderRadius: 10, margin: 3, marginTop: 10 }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({ item, index }) => (

                                <ProjectStatusItem item={item} index={index} />
                            )}
                            data={projectStatusList}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 5, alignItems: 'center', justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(!isModalVisible)
                            }} style={{ flexDirection: 'row', marginEnd: 4, backgroundColor: '#EFEFEF', padding: widthPercentageToDP(1.8), alignItems: 'center' }}>

                                {selectType == 'Main Table' ?
                                    <PROJECTHOME /> : selectType == 'TimeLine' ? <KANBANICON /> : <KANBANICON />}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 4 }}>
                                    <CustomText children={selectType} style={styles.optionStyle} />
                                    <DROPDOWNARROW height={15} width={15} />
                                </View>

                            </TouchableOpacity>

                            <FILTER height={widthPercentageToDP(10)} />
                            {selectType != 'Main Table' ?
                                <CustomButton title={'Save View'} style={{ width: widthPercentageToDP(24), height: heightPercentageToDP(5), backgroundColor: '#F49D7C' }} textStyle={{ color: WHITE, fontSize: FontSize(12) }} />
                                : <></>}
                        </View>

                        <View style={{ alignSelf: 'flex-end', backgroundColor: '#EFEFEF', padding: widthPercentageToDP(1), borderRadius: 5 }}>
                            <SEARCH />
                        </View>

                    </View>


                    {selectType == 'Kanban' ?

                        <View style={{ padding: 10, borderRadius: 10, margin: 3 }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                renderItem={({ item, index }) => (

                                    <KanbanItem item={item} index={index} />
                                )}
                                data={projectPlanList}
                            />
                        </View> : selectType == 'Main Table' ? <MainTable /> : <MeetingCalender data={dataCalender}
                            monthsString={GetMonths(moment(), moment().add(7, 'days'))}
                        />
                    }

                    <ItemListModal
                        visible={isModalVisible}
                        list={data}
                        onBackButtonPress={toggleModal}
                        onBackdropPress={toggleModal}
                        onApplyClick={(data) => {
                            setSelectedFilterData(data)
                            setSelectedType(data?.typeName === undefined ? 'Main Table' : data?.typeName)
                            toggleModal()


                        }}
                        selectedFilterData={selectedFilterData}

                    />
                </View>
            </ScrollView>
        </View >
    )
}


export default ProjectManagementDetails;