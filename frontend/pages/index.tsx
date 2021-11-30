import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import Bridge from "../components/Bridge";
import Intro from "../components/Intro";

type Savings = {
  kwhPerM2PerDay: number;
  CO2eqSavedPerYearPerM2: number;
  costsSavedPerYearPerM2: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  console.log(step);

  return (
    <>
      <div className="fixed inset-0 bg-solar" />
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div
        className="grid gap-4 min-h-screen text-white py-20 relative max-w-2xl mx-auto"
        style={{
          gridTemplateRows: "max-content 1fr max-content max-content",
        }}
      >
        <Head>
          <title>wind&sun</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={classNames("text-6xl font-bold text-center")}>
          wind&sun
        </h1>
        <main className="flex items-center align-middle justify-center">
          {step === 0 && <Intro />}
          {step === 1 && <Bridge />}
        </main>

        <div className="flex justify-between px-10">
          <div>
            {step > 0 && (
              <button
                className="border-2 border-white px-7 py-1 rounded-xl hover:bg-white hover:bg-opacity-20"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
          </div>
          <div>
            {step < 1 && (
              <button
                className="border-2 border-white px-7 py-1 rounded-xl hover:bg-white hover:bg-opacity-20"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>

        <footer className="flex items-center justify-center w-full text-sm">
          Powered by us
        </footer>
      </div>
    </>
  );
};

export default Home;
