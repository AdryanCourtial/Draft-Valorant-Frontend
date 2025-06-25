import './InteractiveBackground.css'
import ReactDOM from 'react-dom';

const InteractiveBackground: React.FC = () => {
    return ReactDOM.createPortal (
        <div className='interactive-background'>
            {/* Contenu du composant InteractiveBackground */}
        </div>
    , document.body);
};

export default InteractiveBackground;