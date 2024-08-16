import { CgSpinner } from "react-icons/cg";
import { Styles, applyStyles } from "../../Utils/styleUtils";

const Loader = ({loaderStyles}:{loaderStyles?: Styles}) => {
  const { className, style } = applyStyles(loaderStyles);

  return (
    <>
      <CgSpinner className={`animate-spin w-10 h-10 rounded-full ${className}`} style={style} />
    </>
  );
};

export default Loader;
