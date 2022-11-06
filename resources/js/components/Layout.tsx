import React from "react";
import styled from "styled-components";
import { INotification } from "../lib/types";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children?: JSX.Element;
  footer?: boolean;
  logo?: boolean;
  circles?: boolean;
  authenticated?: boolean;
  notifications?: INotification[];
  admin?: boolean;
}

const Layout: React.FC<IProps> = ({
  children,
  footer,
  notifications,
}: IProps) => {
  return (
    <div className="min-h-screen bg-dark border-l border-r border-white mx-[10px] sm:mx-[30px] py-[10px] sm:py-[30px] font-sans">
      <div className="bg-dark w-full text-white border-t border-b border-white">
        <div className="w-full bg-gradient-to-bl from-dark via-dark-opacity flex flex-col">
          <Navbar notifications={notifications ?? []} />

          <div className="flex-1">{children}</div>

          {footer && <Footer />}
        </div>
      </div>
    </div>
  );
};

// backgroundImage: "url(/img/bg.png)",
// backgroundRepeat: "no-repeat",
// backgroundPositionX: "150%",

export default Layout;
