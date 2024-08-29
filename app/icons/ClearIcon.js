// import * as React from "react"
// const SvgComponent = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={24}
//     height={24}
//     fill="none"
//     {...props}
//   >
//     <path
//       fill="#fff"
//       d="M10.5 4.5h3a1.5 1.5 0 1 0-3 0ZM9 4.5a3 3 0 1 1 6 0h6A.75.75 0 1 1 21 6h-.846l-1.808 13.257a3.75 3.75 0 0 1-3.715 3.243H9.369a3.75 3.75 0 0 1-3.715-3.243L3.846 6H3a.75.75 0 0 1 0-1.5h6Zm1.5 5.25a.75.75 0 1 0-1.5 0v7.5a.75.75 0 1 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 1 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75ZM7.14 19.055A2.25 2.25 0 0 0 9.369 21h5.262a2.25 2.25 0 0 0 2.23-1.945L18.642 6H5.36l1.78 13.055Z"
//     />
//   </svg>
// )
// export default SvgComponent


// RefreshIcon.js (after using SVGR or similar tool)
import React from 'react';

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    style={{ marginRight: '6px' }}
  >
    <path
      fill="#fff"
      d="M10.5 4.5h3a1.5 1.5 0 1 0-3 0ZM9 4.5a3 3 0 1 1 6 0h6A.75.75 0 1 1 21 6h-.846l-1.808 13.257a3.75 3.75 0 0 1-3.715 3.243H9.369a3.75 3.75 0 0 1-3.715-3.243L3.846 6H3a.75.75 0 0 1 0-1.5h6Zm1.5 5.25a.75.75 0 1 0-1.5 0v7.5a.75.75 0 1 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 1 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75ZM7.14 19.055A2.25 2.25 0 0 0 9.369 21h5.262a2.25 2.25 0 0 0 2.23-1.945L18.642 6H5.36l1.78 13.055Z"
    />
  </svg>
);

export default ClearIcon;
