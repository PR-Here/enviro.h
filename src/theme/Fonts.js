// ResponsiveFontSizes.js
import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const FontSize = size => size / fontScale;

export const FontName = {
  Gorditas_Bold: 'Gordita Bold',
  Geo_Auto_Regular: 'Gordita Regular',
  Gordita_Medium: 'Gordita Medium',
  Gordita_Regular: 'Gordita Regular'
};
