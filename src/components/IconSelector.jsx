import "./iconSelector.css";

import { useEffect, useRef, useState } from "react";

import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { Icons } from "./icons";

const IconSelector = ({ setIcon, unavaibleIcons }) => {
    const [selectedIcon, setSelectedIcon] = useState("");

    const [scrollPos, setScrollPos] = useState(100);
    const wrapper = useRef();

    function handleSelect(id) {
        if (id !== unavaibleIcons) {
            setSelectedIcon(id);
        }
    }

    function scroll(amount) {
        const newScrollPos = scrollPos + amount;
        setScrollPos(newScrollPos);
        wrapper.current.scrollTop = newScrollPos;
    }

    useEffect(() => {
        function onSelectIcon(id) {
            setIcon(id);
        }
        onSelectIcon(selectedIcon);
    }, [selectedIcon]);

    useEffect(() => {
        wrapper.current.scrollTop = 200;
    }, []);

    return (
        <div className="selector-wrapper">
            <ArrowLeft className="arrow" onClick={() => scroll(30)} />
            <div className="item-list-wrapper" ref={wrapper}>
                {Icons.map((i) => {
                    const icon = i.svg;
                    return (
                        <div
                            className={`icon ${
                                i.id === unavaibleIcons ? "unavaibleIcon" : ""
                            } ${i.id === selectedIcon ? "selected" : ""}`}
                            onClick={() => handleSelect(i.id)}
                        >
                            {icon}
                        </div>
                    );
                })}
            </div>
            <ArrowRight className="arrow" onClick={() => scroll(-30)} />
        </div>
    );
};

export default IconSelector;
