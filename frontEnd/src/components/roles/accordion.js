import React from 'react';

const CustomAccordion = ({ index, title, item, ViewData, handleChange, onToggle, active }) => {
    return (
        <>
            <div className="card" key={index} >
                <div className="card-header bg-dark text-white border-bottom-0" >
                    <h6 className="mb-0">
                        <i onClick={onToggle} className={active ? "ph ph-minus collapsible-indicator me-2" : "ph ph-plus collapsible-indicator me-2"}></i>
                        <a key={index}
                            onClick={onToggle}
                            id={index} data-toggle="collapse"
                            className={active ? "text-white" : "text-white collapsed"}
                        >{title}</a>
                    </h6>
                </div>
                <div id={`accordion-control-group${index}`}
                    className={active ? "collapse show" : "collapse"}
                    data-parent="#accordion-control">
                    <div className="card-body">
                        {item.permissions ? item.permissions.map((subitem, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="dropdown-item mb-2">
                                                <input
                                                    className="form-check-input m-0 me-3"
                                                    type="checkbox"
                                                    defaultChecked={ViewData ? ViewData.find((val) => { return ((subitem.name === val)) }) : null}
                                                    id={subitem.name}
                                                    name={subitem.name}
                                                    value={subitem.name}
                                                    onChange={handleChange}
                                                />
                                                {subitem.title}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomAccordion;
