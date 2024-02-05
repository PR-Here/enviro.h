import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { BLACK, GREY, LIGHTGREY, WHITE } from '../../theme/Colors';

function CustomRadioButton({ onToggle, radioChecked, label, labelStyle }) {
    return (
        <CircleCheckBox
            checked={radioChecked}
            onToggle={onToggle}
            labelPosition={LABEL_POSITION.RIGHT}
            outerSize={16}
            innerSize={7}
            filterSize={12}
            filterColor={WHITE}
            innerColor={'#E49273'}
            outerColor={radioChecked ? '#E49273' : LIGHTGREY}
            label={label}
            styleLabel={labelStyle}
        />
    )
}

export default CustomRadioButton
