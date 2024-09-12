const PageEmpty = () => {
  return (
    <>
      <div className=" my-auto  d-flex flex-column align-content-center  justify-content-center ">
        <div className=" d-flex justify-content-center">
          <svg
            aria-label="Camera"
            className=" "
            fill="currentColor"
            height="62"
            role="img"
            viewBox="0 0 96 96"
            width="62"
          >
            <title>Camera</title>
            <circle
              cx="48"
              cy="48"
              fill="none"
              r="47"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></circle>
            <ellipse
              cx="48.002"
              cy="49.524"
              fill="none"
              rx="10.444"
              ry="10.476"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2.095"
            ></ellipse>
            <path
              d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </div>
        <div className="d-flex justify-content-center">
          <span className=" fw-bold fs-2">No Posts Yet</span>
        </div>
      </div>
    </>
  );
};

export default PageEmpty;
