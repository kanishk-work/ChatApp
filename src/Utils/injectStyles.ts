export const injectStyles = (
    bgColorDark: string,
    bgColorLight: string,
    fontSize: number,
    isDarkMode: boolean
): void => {
    const styleElement = document.getElementById("dynamic-styles");
    if (styleElement && styleElement.tagName === "STYLE") {
        styleElement.innerHTML = `
        .dynamic-styles {
        color: '#000';
        font-size: ${fontSize}px;
        background-color: ${isDarkMode ? bgColorDark : bgColorLight};
        }
        .dynamic-font-size{font-size: ${fontSize}px}
        .dynamic-background-color{background-color: ${isDarkMode ? bgColorDark : bgColorLight}}
        `;
    } else {
        const newStyleElement = document.createElement("style");
        newStyleElement.id = "dynamic-styles";
        newStyleElement.innerHTML = `
        .dynamic-styles {
        color: '#000';
        font-size: ${fontSize}px;
        background-color: ${isDarkMode ? bgColorDark : bgColorLight};
        }
        .dynamic-font-size{font-size: ${fontSize}px}
        .dynamic-background-color{background-color: ${isDarkMode ? bgColorDark : bgColorLight}}
        `;
        document.head.appendChild(newStyleElement);
    }
    console.log(document.head);
};
