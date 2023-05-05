import React, { createRef, FunctionComponent, MutableRefObject, RefObject, useEffect, useRef, useContext } from 'react';
import iro from '@jaames/iro';
import '../../styles/popups/colorPicker.css'
import { updateUser } from '../../services/userAPI';
import { UserContext } from '../../contexts/UserContext';
import ErrorContext from '../../contexts/ErrorContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface IroColorPicker {
    on: (action: string, callback: Function) => void;
    color: {
        hexString: string;
        set: (value: any) => void;
        setState: (state: any) => void;
    }
}

export interface ColorInputProps {
    className?: string;
    value?: string;
    onChange?: (color: string) => void;
}

const ColorInput: FunctionComponent<ColorInputProps> = ({
    className,
    value = '#850000',
    onChange = () => {
    }
}) => {

    const { user } = useContext(UserContext)
    const { setError } = useContext(ErrorContext);

    let colorPicker: MutableRefObject<IroColorPicker | null> = useRef<IroColorPicker | null>(null);
    let el: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

    useEffect(() => {
        if (!el.current) {
            return;
        }
        if (!colorPicker.current) {
            // create a new iro color picker and pass component props to it
            colorPicker.current = new (iro as any).ColorPicker(el.current, {
                color: value,
                width: 100,
                layoutDirection: 'horizontal',
                layout: [

                    {
                        component: iro.ui.Box,
                    },
                    {
                        component: iro.ui.Slider,
                        options: {
                            id: 'hue-slider',
                            sliderType: 'hue'
                        }
                    },

                ]
            });
            // call onColorChange prop whenever the color changes
            if (!colorPicker.current) {
                return;
            }
            colorPicker.current.on('color:change', (color: { hexString: string }) => {
                onChange(color.hexString);
            });
        } else if (value !== colorPicker.current.color.hexString) {
            colorPicker.current.color.set(value);
        }
    }, [value, onChange]);

    const hexToRgba = (hex: string, alpha: number) => {
        const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const handleButtonClick = async () => {
        // front end route protection
        if (!user) {
            setError('Please login to use this feature');
            return;
        }
        if (colorPicker.current) {
            const selectedColor = hexToRgba(colorPicker.current.color.hexString, 1);
            const secondAccentColor = hexToRgba(selectedColor, 0.05);
            // Update the global CSS variable
            document.documentElement.style.setProperty('--accent-color-1', selectedColor);
            document.documentElement.style.setProperty('--accent-color-2', secondAccentColor);

            try {
                if (user) {
                    await updateUser(user._id, { themeColor: selectedColor });

                } else {
                    console.error('User is null');
                }
            } catch (error) {
                console.error('Failed to update theme color', error);
            }
        }
    };

    return (
        <>
            <h3>Choose your accent color</h3>
            <section className='color-picker-container'>
                <div ref={el} />
                <button onClick={handleButtonClick}>
                    <FontAwesomeIcon
                        className='faPlus-icon'
                        icon={faPaperPlane}
                    />
                </button>
            </section>
        </>
    );
};

export default ColorInput;
