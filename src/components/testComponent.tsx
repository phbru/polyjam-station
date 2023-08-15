interface ComponentProps {
  message: string;
  message2: string;
  handleClickMessage2: () => void;
}

const ComponentTest: React.FC<ComponentProps> = ({
  message,
  message2,
  handleClickMessage2,
}) => {
  return (
    <div>
      <p>
        {message} <p onClick={handleClickMessage2}>{message2}</p>
      </p>
    </div>
  );
};

export default ComponentTest;
