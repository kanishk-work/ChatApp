export const injectStyles = (
    bgColorDark: string,
    bgColorLight: string,
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
        .dynamic-background-color{background-color: ${isDarkMode ? bgColorDark : bgColorLight
            }}
        `;
        console.log({fontSize})
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
        .dynamic-background-color{background-color: ${isDarkMode ? bgColorDark : bgColorLight
            }}
        `;
        document.head.appendChild(newStyleElement);
    }
    console.log(document.head);
};
