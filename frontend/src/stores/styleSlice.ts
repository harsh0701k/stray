import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as styles from '../styles';
import { localStorageDarkModeKey, localStorageStyleKey } from '../config';
import { StyleKey } from '../interfaces';

interface StyleState {
  asideStyle: string;
  asideScrollbarsStyle: string;
  asideBrandStyle: string;
  asideMenuItemStyle: string;
  asideMenuItemActiveStyle: string;
  asideMenuDropdownStyle: string;
  navBarItemLabelStyle: string;
  navBarItemLabelHoverStyle: string;
  navBarItemLabelActiveColorStyle: string;
  overlayStyle: string;
  darkMode: boolean;
  bgLayoutColor: string;
  iconsColor: string;
  activeLinkColor: string;
  cardsColor: string;
  focusRingColor: string;
  corners: string;
  cardsStyle: string;
  linkColor: string;
  websiteHeder: string;
  borders: string;
  shadow: string;
  websiteSectionStyle: string;
  textSecondary: string;
}

const initialState: StyleState = {
  asideStyle: styles.pastelBrownTheme.aside,
  asideScrollbarsStyle: styles.white.asideScrollbars,
  asideBrandStyle: styles.white.asideBrand,
  asideMenuItemStyle: styles.pastelBrownTheme.asideMenuItem,
  asideMenuItemActiveStyle: styles.pastelBrownTheme.asideMenuItemActive,
  activeLinkColor: styles.pastelBrownTheme.activeLinkColor,
  asideMenuDropdownStyle: styles.white.asideMenuDropdown,
  navBarItemLabelStyle: styles.pastelBrownTheme.navBarItemLabel,
  navBarItemLabelHoverStyle: styles.pastelBrownTheme.navBarItemLabelHover,
  navBarItemLabelActiveColorStyle:
    styles.pastelBrownTheme.navBarItemLabelActiveColor,
  overlayStyle: styles.pastelBrownTheme.overlay,
  darkMode: false,
  bgLayoutColor: styles.pastelBrownTheme.bgLayoutColor,
  iconsColor: styles.pastelBrownTheme.iconsColor,
  cardsColor: styles.pastelBrownTheme.cardsColor,
  focusRingColor: styles.pastelBrownTheme.focusRingColor,
  corners: styles.pastelBrownTheme.corners,
  cardsStyle: styles.pastelBrownTheme.cardsStyle,
  linkColor: styles.pastelBrownTheme.linkColor,
  websiteHeder: styles.pastelBrownTheme.websiteHeder,
  borders: styles.pastelBrownTheme.borders,
  shadow: styles.pastelBrownTheme.shadow,
  websiteSectionStyle: styles.pastelBrownTheme.websiteSectionStyle,
  textSecondary: styles.pastelBrownTheme.textSecondary,
};

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean | null>) => {
      state.darkMode =
        action.payload !== null ? action.payload : !state.darkMode;

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          localStorageDarkModeKey,
          state.darkMode ? '1' : '0',
        );
      }

      if (typeof document !== 'undefined') {
        document.body.classList[state.darkMode ? 'add' : 'remove'](
          'dark-scrollbars',
        );

        document.documentElement.classList[state.darkMode ? 'add' : 'remove'](
          'dark-scrollbars-compat',
        );
      }
    },

    setStyle: (state, action: PayloadAction<StyleKey>) => {
      if (!styles[action.payload]) {
        return;
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(localStorageStyleKey, action.payload);
      }

      const style = styles[action.payload];

      for (const key in style) {
        state[`${key}Style`] = style[key];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDarkMode, setStyle } = styleSlice.actions;

export default styleSlice.reducer;
