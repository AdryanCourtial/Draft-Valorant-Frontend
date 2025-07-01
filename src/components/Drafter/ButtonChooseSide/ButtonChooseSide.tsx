import "./ButtonChooseSide.css"

interface Props {
    action: () => void
    title: string
}

const ButtonChooseSide: React.FC <Props>= ({ action, title }) => {
    return (
        <button onClick={action}>
            {title}
        </button>
    );
};

export default ButtonChooseSide;