import React from "react";

interface IIndexCardProps {
  icon?: JSX.Element;
  children?: JSX.Element;
  title: string;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  authenticated?: boolean;
}

const IndexCard: React.FC<IIndexCardProps> = ({
  icon,
  children,
  title,
  className,
  sidebarClassName,
  contentClassName,
  authenticated,
}: IIndexCardProps) => {
  return (
    <div
      className={`bg-dark-lighter p-5 flex flex-col gap-x-4 rounded-lg ${className}`}
    >
      <div className="w-full flex gap-y-1 items-center">
        {icon && (
          <div className="h-10 w-10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <h2 className="text-md uppercase font-bold text-white">{title}</h2>
      </div>
      <div className={`flex-1 h-full ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default IndexCard;
