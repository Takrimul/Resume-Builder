import React from 'react';

type SidebarItem = {
    name: string;
    value: string;
};

type SidebarProps = {
    items: SidebarItem[];
    selected: string;
    onSelect: (value: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ items, selected, onSelect }) => {
    return (
        <div className="sidebar">
            {items.map((item) => (
                <div
                    key={item.value}
                    className={`sidebar-item ${item.value === selected ? 'selected' : ''}`}
                    onClick={() => onSelect(item.value)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;