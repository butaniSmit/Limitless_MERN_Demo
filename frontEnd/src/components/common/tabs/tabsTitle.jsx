import React from "react";

export const TabsTitle =({ id, title, activeTab, setActiveTab })=>{
    const handleClick = () => {
        setActiveTab(id);
      };
    return(
        <>
         <li className="nav-item"><a onClick={handleClick} className={activeTab === id ? "nav-link active show customnavlink" : "nav-link customnavlink"}>{title}</a></li>
        </>
    )
}

export const TabsTitleUser =({ id, title, activeTab, setActiveTab,iconname,totalclient })=>{
    const handleClick = () => {
        setActiveTab(id);
      };
    return(
        <>
         <li className="nav-item"><a onClick={handleClick} className={activeTab === id ? "navbar-nav-link active" : "navbar-nav-link"}><i className={`${iconname} mr-1`} />{title}{id==="tab2"?<span className="badge position-static bg-success badge-pill ml-auto">{totalclient}</span>: null}</a></li>
        </>
    )
}