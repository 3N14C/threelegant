import { FC } from "react";

interface IProps {
  onClick: () => void;
  table: string;
}

export const SortTable: FC<IProps> = ({ onClick, table }) => {
  return (
    <div
      onClick={onClick}
      className="border-2 border-[--neutral-03] w-[45px] h-[40px] flex items-center justify-center cursor-pointer"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.75 10C6.34674 10 6.91903 10.2371 7.34099 10.659C7.76295 11.081 8 11.6533 8 12.25V15.75C8 16.3467 7.76295 16.919 7.34099 17.341C6.91903 17.7629 6.34674 18 5.75 18H2.25C1.65326 18 1.08097 17.7629 0.65901 17.341C0.237053 16.919 0 16.3467 0 15.75V12.25C0 11.6533 0.237053 11.081 0.65901 10.659C1.08097 10.2371 1.65326 10 2.25 10H5.75ZM15.75 10C16.3467 10 16.919 10.2371 17.341 10.659C17.7629 11.081 18 11.6533 18 12.25V15.75C18 16.3467 17.7629 16.919 17.341 17.341C16.919 17.7629 16.3467 18 15.75 18H12.25C11.6533 18 11.081 17.7629 10.659 17.341C10.2371 16.919 10 16.3467 10 15.75V12.25C10 11.6533 10.2371 11.081 10.659 10.659C11.081 10.2371 11.6533 10 12.25 10H15.75ZM5.75 0C6.34674 0 6.91903 0.237053 7.34099 0.65901C7.76295 1.08097 8 1.65326 8 2.25V5.75C8 6.34674 7.76295 6.91903 7.34099 7.34099C6.91903 7.76295 6.34674 8 5.75 8H2.25C1.65326 8 1.08097 7.76295 0.65901 7.34099C0.237053 6.91903 0 6.34674 0 5.75V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0H5.75ZM15.75 0C16.3467 0 16.919 0.237053 17.341 0.65901C17.7629 1.08097 18 1.65326 18 2.25V5.75C18 6.34674 17.7629 6.91903 17.341 7.34099C16.919 7.76295 16.3467 8 15.75 8H12.25C11.6533 8 11.081 7.76295 10.659 7.34099C10.2371 6.91903 10 6.34674 10 5.75V2.25C10 1.65326 10.2371 1.08097 10.659 0.65901C11.081 0.237053 11.6533 0 12.25 0H15.75Z"
          fill={table === "table" ? "#141718" : "#6C7275"}
        />
        <path
          d="M0 3H7.99805V15H0V3Z"
          fill={table === "table" ? "#141718" : "#6C7275"}
        />
        <path
          d="M10.002 3H18V15H10.002V3Z"
          fill={table === "table" ? "#141718" : "#6C7275"}
        />
      </svg>
    </div>
  );
};