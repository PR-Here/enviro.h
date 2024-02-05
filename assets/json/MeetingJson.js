import AssetsImages from "../../src/utils/AssetsImages";
import { View, Text } from "react-native";
import { styles } from "../../src/screen/meetingModule/meetingHome/Style";
import { PRIMARY_COLOR, STARTMEETING_COLOR, WHITE } from "../../src/theme/Colors";
import MeetingIcon from '../../assets/images/SVG/noun-video-call.svg'
import Calendar from '../../assets/images/SVG/calendar-gray.svg'
import BookRoom from '../../assets/images/SVG/book-room.svg'

// FIRST LIST OF MEETING HOME
export const MEETING_JSON = [
    {
        id: 1,
        title: "New Project Discussion",
        time: 'Today, 12.00PM',
        count: 11,
        images: [
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
        ],
    },
    {
        id: 2,
        title: "Ebux Brainstorming",
        time: 'Today, 01.30PM',
        count: 10,
        images: [
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
        ],
    },
    {
        id: 3,
        title: "JKX - Budget Discussion",
        time: 'Today, 03.30PM',
        count: 18,
        images: [
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
            AssetsImages.DUMMY,
        ],
    },

]

// second List
export const horizontalData = [
    // {
    //     id: 5,
    //     title: 'Start / Join Meeting',
    //     image: <MeetingIcon />,
    //     color: PRIMARY_COLOR,
    //     borderColor: PRIMARY_COLOR,
    //     textColor: WHITE
    // },
    {
        id: 6,
        title: 'Schedule meeting',
        image: <Calendar />,
        color: PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR,
        textColor: WHITE
    },
    {
        id: 7,
        title: 'Book Room',
        image: <BookRoom />,
        color:  PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR,
        textColor:WHITE
    },



]
// Third List
export const THIRD_LIST = [{

    id: 8,
    title: 'New Project Discussionm 1',
    time: 'Yesterday, 12.00PM',
    image: AssetsImages.CHECKBOX,
},
{
    id: 9,
    title: 'New Project Discussion 2',
    time: 'Yesterday, 12.00PM',
    image: AssetsImages.CHECKBOX,

},
{
    id: 10,
    title: 'New Project Discussion 3',
    time: 'Yesterday, 12.00PM',
    image: AssetsImages.CHECKBOX,
},
{
    id: 11,
    title: 'New Project Discussion 4',
    time: 'Yesterday, 12.00PM',
    image: AssetsImages.CHECKBOX,
},
{
    id: 12,
    title: 'New Project Discussion 5',
    time: 'Yesterday, 12.00PM',
    image: AssetsImages.CHECKBOX,
},

];

// MY BOOKING JSON

export const MYBOOKINGJSON = [{
    title: 'Ebux Brainstorming',
    desc: 'Meeting Room 3, First Floor Gurgaon Office',
    date: '29th May 2023',
    time: '10:30 am - 2 Hr',
    capacity: '5 seats'
}, {
    title: 'Ebux Brainstorming',
    desc: 'Meeting Room 3, First Floor Gurgaon Office',
    date: '29th May 2023',
    time: '10:30 am - 2 Hr',
    capacity: '5 seats'
}, {
    title: 'Ebux Brainstorming',
    desc: 'Meeting Room 3, First Floor Gurgaon Office',
    date: '29th May 2023',
    time: '10:30 am - 2 Hr',
    capacity: '5 seats'
}, {
    title: 'Ebux Brainstorming',
    desc: 'Meeting Room 3, First Floor Gurgaon Office',
    date: '29th May 2023',
    time: '10:30 am - 2 Hr',
    capacity: '5 seats'
}]








