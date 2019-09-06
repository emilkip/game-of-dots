import React, { useState } from 'react';
import '@styles/custom-select.scss';


export default function CustomSelect({ items, labels, defaultText = 'Select', onSelect }) {
	const [menuOpened, setMenuVisibility] = useState(false);
	const [selectedItem, selectItem] = useState(null);

	const onItemSelect = item => {
		setMenuVisibility(!menuOpened);
		selectItem(item);
		onSelect(item);
	};

	return (
		<div className="custom-select">
			<div className="custom-select__selected" onClick={() => setMenuVisibility(!menuOpened)}>
				{selectedItem ? labels[selectedItem] : defaultText} <span className="custom-select__carret">{menuOpened ? '▲' : '▼'}</span>
			</div>
			<div className={`custom-select__items ${menuOpened ? 'custom-select__items--visible' : ''}`}>
				{items.map(item => (
					<div key={item} className="custom-select__item" onClick={() => onItemSelect(item)}>
						{labels[item]}
					</div>
				))}
			</div>
		</div>
	);
}
