const useResponsive = (...res) => {
    return `@media only screen and (max-width: ${res[1]}px) {
        ${res[0]}
      }`;
};

export default useResponsive;
