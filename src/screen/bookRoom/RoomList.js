import { View, FlatList } from 'react-native'
import RoomItem from '../../component/listItems/RoomItem'

const RoomList = () => {

    const data = ['1', '2', '3']


    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
            horizontal
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                    <RoomItem />
                )
            }}
        />
    )
}

export default RoomList