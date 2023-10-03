import React from "react";
 
const TabContent = ({id, activeTab, children}) => {
 return (
   activeTab === id ? 
     <>{ children }</>
   : null
 );
};
 
export default TabContent;