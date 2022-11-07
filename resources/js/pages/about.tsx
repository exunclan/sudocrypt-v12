import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { FAQAccordion } from "../components/About/FAQAccordion";
import IndexCard from "../components/Home/IndexCard";
import Layout from "../components/Layout";
import Prizes from "../components/Prizes";
import { IPageProps } from "../lib/types";

const About: React.FC = () => {
  const {
    props: {
      authenticated,
      auth: { user },
    },
  } = usePage<IPageProps>();
  return (
    <Layout
      authenticated={authenticated}
      admin={Boolean(user?.admin)}
      footer={true}
    >
      <div className="w-full h-full max-w-[1000px] flex justify-center my-10 mx-auto">
        <ul className="h-full overflow-y-auto p-6 text-[#CBCDCE]">
          <li className="text-xl sm:text-[2rem] lg:text-[4rem] font-bold tracking-wider h-[2rem] mb-4 sm:h-[4rem]">
            ABOUT
          </li>

          <li className="w-full text-sudo-red text-md sm:text-xl lg:text-3xl font-mono mb-8">
            9 November 2022 <span className="text-white">-</span>{" "}
            <span className="text-sudo-yellow">10 November 2022</span>
          </li>
          <li className="font-mono">
            <b>Sudocrypt v12.0</b> is an online 48-hour multiplayer Cryptic Hunt
            x Capture the Flag (CTF) event organised by Exun Clan. The event
            will be held from 00:00:01 on Wednesday, 9th November 2022 to
            23:59:59 on Thursday, 10th November 2022.
          </li>
          <Prizes />
          <li className="mt-2 font-mono">
            Participants are required to join our{" "}
            <a
              href="https://sudocrypt.com/disc"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-sudo"
            >
              official Discord server
            </a>{" "}
            for all event related updates, including hints. Click{" "}
            <Link href="/auth/register" className="font-bold text-sudo">
              here
            </Link>{" "}
            to register!
          </li>
          <li className="mt-3 font-mono">
            To get yourself acquainted with cryptic hunts, visit our{" "}
            <a
              href="https://exun.co/resources/cryptic"
              className="font-bold text-sudo"
              target="_blank"
              rel="noreferrer"
            >
              resources
            </a>
            .
          </li>
          <div className="font-mono">
            <h2 className="mt-4 text-2xl font-bold text-gray-500 font-mono">
              FAQ
            </h2>
            <FAQAccordion
              title={
                <li className="font-bold font-sans">
                  1. What is a cryptic hunt?
                </li>
              }
              content="Cryptic hunts are virtual scavenger hunts where the participants are required to hunt the internet for clues, crack ciphers, and reach the final answer for each level. Sudocrypt, in particular, contains hints and answers in the domain of technology and related fields."
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">
                  2. Who organizes Sudocrypt?
                </li>
              }
              content={
                <li>
                  Sudocrypt is organised by{" "}
                  <a
                    href="https://exunclan.com"
                    className="font-bold text-sudo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Exun Clan
                  </a>
                  , the computer science club of DPS RK Puram, which is amongst
                  the premier high school IT clubs in the country. Sudocrypt is
                  an international competition and is also the flagship event of
                  Exun Clan.
                </li>
              }
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">
                  3. How can I prepare for Sudocrypt?
                </li>
              }
              content={
                <>
                  No previous knowledge is necessary to participate.However,
                  knowing the &quot;basics&quot;, such as different types of
                  ciphers, steganography tools, common CTF (capture the flag)
                  utilities, etc. always helps. To start learning and exploring,
                  you can refer to Exun Clan’s learning resources on cryptic
                  hunts at our{" "}
                  <a
                    href="https://exun.co/resources/cryptic"
                    className="font-bold text-sudo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    learning resources
                  </a>{" "}
                  and view some of the past questions{" "}
                  <a
                    href="https://docs.google.com/document/d/1JoBXkgSwaUxRGLoQ9zC-zR-KGU0XaCU53fBkLq6AoVo/edit?usp=sharing"
                    className="font-bold text-sudo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    here{" "}
                  </a>{" "}
                  .
                </>
              }
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">
                  4. How does someone win Sudocrypt?
                </li>
              }
              content={
                <li>
                  Sudocrypt can be won in 2 ways: either by being the first
                  person to solve all the levels or by being at the top of the
                  leaderboard when the event ends. Rankings on the leaderboard
                  depend on the points earned by solving levels. Time will be
                  the deciding factor used to settle ties.
                </li>
              }
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">
                  5. I'm not in high school, can I participate?
                </li>
              }
              content={
                <li>
                  Yes. Sudocrypt is an open event. Everyone, irrespective of
                  their age or affiliation with an institution, is welcome to
                  participate. You can participate in Sudocrypt even if you are
                  or aren’t participating in other{" "}
                  <a
                    href="https://exunclan.com"
                    className="font-bold text-sudo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Exun 2021-22
                  </a>{" "}
                  events.
                </li>
              }
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">
                  6. Are we allowed to participate in teams?
                </li>
              }
              content={
                <li>
                  Only individual participation is allowed in Sudocrypt. Teaming
                  up is strictly forbidden. If anyone is found sharing
                  answers/hints/leads or collaborating in any other way, it will
                  directly lead to disqualification.{" "}
                </li>
              }
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">7. Will we get hints?</li>
              }
              content={
                <li>
                  Hints will be posted in hints on the{" "}
                  <a
                    href="https://sudocrypt.com/disc"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-sudo"
                  >
                    Sudocrypt Discord server
                  </a>
                  . To know if you’re on the right track, you can DM one of the
                  official Sudocrypt Leads accounts which will be joining this
                  server shortly to confirm your leads. No lead confirmations
                  will be taking place on the personal accounts of the admins.
                  Lead confirmations will be done through Discord only. Admins
                  will not respond on other platforms.
                </li>
              }
            />
            <FAQAccordion
              title={
                <li className="font-bold font-sans">8. How do I sign up?</li>
              }
              content={
                <li>
                  Registrations are open at{" "}
                  <a
                    href="https://sudocrypt.com/register"
                    className="font-bold text-sudo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://sudocrypt.com/register
                  </a>
                </li>
              }
            />
          </div>
        </ul>
      </div>
    </Layout>
  );
};

export default About;
