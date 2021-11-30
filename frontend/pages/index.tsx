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
          gridTemplateRows: "max-content 1fr",
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
          {step === 0 && <Intro next={() => setStep(step + 1)} />}
          {step === 1 && <Bridge next={() => setStep(step)} />}
        </main>
      </div>
    </>
  );
};

export default Home;
