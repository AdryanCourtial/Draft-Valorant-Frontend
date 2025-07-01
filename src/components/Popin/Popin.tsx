import React from 'react';
import './Popin.css'

interface Props {
    children: React.ReactNode
    toggle: boolean
}

const Popin: React.FC<Props> = ({ children, toggle }) => {
    return (
        <>
            { toggle ? (
                <div className='container-popin'>
                    <div className='container-popin-content'>
                        {children}
                    </div>
                    <div className='container-background-popin'>

                    </div>
                </div>
            ) : null
            }
        </>
    );
};

export default Popin;