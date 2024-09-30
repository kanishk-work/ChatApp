export const injectStyles = (
  bgColorDark: string,
  accentColorDark: string,
  textColorPrimaryDark: string,
  textColorSecondaryDark: string,

  bgColorLight: string,
  accentColorLight: string,
  textColorPrimaryLight: string,
  textColorSecondaryLight: string,

  focusColorPrimary: string,
  focusColorSecondary: string,

  fontSize: number,
  isDarkMode: boolean
): void => {
  const styleElement = document.getElementById("dynamic-styles");
  if (styleElement && styleElement.tagName === "STYLE") {
    styleElement.innerHTML = `
        :root {
        	--fluid-typography: calc(${fontSize}px + 0.390625vw);
    	}

        @media screen and (max-width: 320px) {
        	:root {
            	--fluid-typography: ${fontSize}px;
        	}
    	}

    	@media screen and (min-width: 1280px) {
        	:root {
            	--fluid-typography: ${fontSize + 4}px;
        	}
    	}

        .dynamic-styles {
        color: '#000';
        font-size: ${fontSize}px;
        background-color: ${isDarkMode ? bgColorDark : bgColorLight};
        }

        .dynamic-font-size{font-size: ${fontSize}px}
        .dynamic-background-color{background-color: ${
          isDarkMode ? bgColorDark : bgColorLight
        }}
        .dynamic-accent-color{background-color: ${
          isDarkMode ? accentColorDark : accentColorLight
        }}
        .dynamic-text-color-primary{color: ${
          isDarkMode ? textColorPrimaryDark : textColorPrimaryLight
        }}
        .dynamic-text-color-secondary{color: ${
          isDarkMode ? textColorSecondaryDark : textColorSecondaryLight
        }}
        .dynamic-notif{background-color: ${focusColorSecondary}; color: ${focusColorPrimary};}
        `;
  } else {
    const newStyleElement = document.createElement("style");
    newStyleElement.id = "dynamic-styles";
    newStyleElement.innerHTML = `
        :root {
        	--fluid-typography: calc(${fontSize}px + 0.390625vw);
    	}
        @media screen and (max-width: 320px) {
        	:root {
            	--fluid-typography: ${fontSize}px;
        	}
    	}

    	@media screen and (min-width: 1920px) {
        	:root {
            	--fluid-typography: 23px;
        	}
    	}
        
        .dynamic-styles {
        color: '#000';
        font-size: ${fontSize}px;
        background-color: ${isDarkMode ? bgColorDark : bgColorLight};
        }
        .dynamic-font-size{font-size: ${fontSize}px}
        .dynamic-background-color{background-color: ${
          isDarkMode ? bgColorDark : bgColorLight
        }}
        .dynamic-accent-color{background-color: ${
          isDarkMode ? accentColorDark : accentColorLight
        }}
        .dynamic-text-color-primary{color: ${
          isDarkMode ? textColorPrimaryDark : textColorPrimaryLight
        }}
        .dynamic-text-color-secondary{color: ${
          isDarkMode ? textColorSecondaryDark : textColorSecondaryLight
        }}
        .dynamic-notif{background-color: ${focusColorSecondary}; color: ${focusColorPrimary};}
        `;
    document.head.appendChild(newStyleElement);
  }
};
