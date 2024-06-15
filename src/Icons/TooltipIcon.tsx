export const ToolTipIcon = ({color = "#706A85"}: {color?: string}) => {
  return (
    <div>
      <svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 .125A4.875 4.875 0 1 0 9.875 5 4.884 4.884 0 0 0 5 .125Zm-.094 2.25a.562.562 0 1 1 0 1.125.562.562 0 0 1 0-1.125Zm.469 5.25H5a.375.375 0 0 1-.375-.375V5a.375.375 0 0 1 0-.75H5a.375.375 0 0 1 .375.375v2.25a.375.375 0 0 1 0 .75Z"
          fill="color"
        />
      </svg>
    </div>
  );
};
