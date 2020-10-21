import React, {useState, useEffect} from 'react';
import './Select.scss';

const defaultOptions = [];
const noop = () => {};

const arrowDown = '▼';

const Option = ({onSelect = noop, option, className = ''}) => {
    const onOptionSelect = () => {
        onSelect(option);
    }
    return <div onClick={onOptionSelect} className={'option ' + className}>{option.label}</div>
}

const OpenButton = ({onClick, className = ''}) => {
    return <button onClick={onClick} className={'arrowDown ' + className}>{arrowDown}</button>
}


// option - {label, value}

const Select = ({options = defaultOptions, onSelect = noop, placeholder = 'Select...', className = '', defaultValue}) => {
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [availableOption, setAvailableOption] = useState([])

    const placeholderOption = {label: placeholder, value: null}
    const toggleOpen = () => setIsOpen(!isOpen);

    const onOptionSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        onSelect(option.value);
    }

    useEffect(() => {
        if (!defaultValue) {
            setSelected(null);
            return;
        }
        const defaultOption = options.find(option => option.value === defaultValue);
        setSelected(defaultOption)
    }, [defaultValue])

    return <div className={'select-component ' + className}>
        <div className='select-input' onClick={toggleOpen}>
            {selected ? <Option option={selected} className='selected'/> : <Option className='placeholder' option={placeholderOption}/>}
            <OpenButton onClick={toggleOpen} className={isOpen ? 'open' : ''} />
        </div>
        <div className={'select-options' + (isOpen ? ' open' : '')}>
            {options.map((option, idx) => <Option className={selected && selected.value === option.value ? 'selected': ''}
                                            onSelect={onOptionSelect}
                                            key={idx.toString()}
                                            option={option}
                                           />)}
        </div>

    </div>
}

export default Select;